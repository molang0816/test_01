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
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product != null
                ? ResponseEntity.ok(product)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @Validated @ModelAttribute Product product,
            @RequestParam("image") MultipartFile file,
            @RequestParam("userId") Long userId) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // 이미지 파일이 비어있을 때
        }

        try {
            Product savedProduct = productService.saveProduct(product, file, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (IOException e) {
            // 로깅을 추가할 수 있습니다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (Exception e) {
            // 예외를 처리하여 적절한 HTTP 상태 코드를 반환합니다.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
