package com.example.demo.service;

import com.example.demo.entity.Bid;
import com.example.demo.entity.Product;
import com.example.demo.repository.BidRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    public Bid placeBid(Long productId, Double amount) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: ID " + productId));

        Bid bid = new Bid();
        bid.setProduct(product);
        bid.setAmount(amount);
        bid.setCreatedAt(LocalDateTime.now());
        bid.setAccepted(false);

        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByProductId(Long productId) {
        return bidRepository.findByProductId(productId);
    }

    public Bid acceptBid(Long bidId) {
        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found: ID " + bidId));

        bid.setAccepted(true);

        // 제품 가격 업데이트
        Product product = bid.getProduct();
        if (product != null) {

            productRepository.save(product);
        }

        return bidRepository.save(bid);
    }
}
