package com.example.demo.controller;

import com.example.demo.entity.Bid;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/product/{productId}")
    public ResponseEntity<Bid> createBid(@PathVariable Long productId, @RequestBody Bid bid) {
        Bid newBid = bidService.placeBid(productId, bid.getAmount());
        return new ResponseEntity<>(newBid, HttpStatus.CREATED);
    }

    @PostMapping("/accept/{bidId}")
    public ResponseEntity<Bid> acceptBid(@PathVariable Long bidId) {
        Bid acceptedBid = bidService.acceptBid(bidId);
        return new ResponseEntity<>(acceptedBid, HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Bid>> getBidsByProductId(@PathVariable Long productId) {
        List<Bid> bids = bidService.getBidsByProductId(productId);
        return ResponseEntity.ok(bids);
    }
}
