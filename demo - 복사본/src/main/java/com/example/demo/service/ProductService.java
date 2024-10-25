package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository; // UserRepository 추가
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

    @Autowired
    private UserRepository userRepository; // UserRepository 추가

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product, MultipartFile file, Long userId) throws IOException {
        // 파일 저장 로직
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("C:/Users/MNL/Pictures/photo_db/" + fileName);
        Files.createDirectories(filePath.getParent());
        file.transferTo(filePath);

        product.setImagePath(fileName);

        // 사용자 ID로 User 객체 가져오기
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        product.setUser(user); // User 객체 설정

        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
