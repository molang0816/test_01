package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts(); // Service에서 모든 상품 가져오기
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id); // 서비스에서 상품 ID로 조회
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build(); // 상품이 없을 경우 404 반환
        }
    }

    // 사용자 이름으로 상품 조회
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Product>> getProductsByUsername(@PathVariable String username) {
        List<Product> products = productService.getProductsByUsername(username); // 사용자 이름으로 상품 조회
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build(); // 상품이 없을 경우 404 반환
        }
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Validated @ModelAttribute Product product,
                                                 @RequestParam("image") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(null); // 이미지 파일이 비어있을 때
            }
            Product savedProduct = productService.saveProduct(product, file);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
