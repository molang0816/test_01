package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll(); // 리포지토리에서 모든 상품 가져오기
    }

    public Product saveProduct(Product product, MultipartFile file) throws IOException {
        // 파일 저장 로직
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("C:/Users/MNL/Pictures/photo_db/" + fileName);
        Files.createDirectories(filePath.getParent());
        file.transferTo(filePath);

        product.setImagePath(fileName);
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null); // ID로 상품 조회
    }

    // 사용자 이름으로 상품 조회
    public List<Product> getProductsByUsername(String username) {
        return productRepository.findByUsername(username); // 사용자 이름에 해당하는 상품 목록 조회
    }
}
