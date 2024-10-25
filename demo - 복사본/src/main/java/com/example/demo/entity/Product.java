package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 상품 이름
    private String description; // 상품 설명
    private String price; // 상품 가격
    private String imagePath; // 상품 이미지 경로

    @ManyToOne // 여러 상품이 하나의 사용자에 속할 수 있도록 설정
    @JoinColumn(name = "user_id") // 외래 키로 사용할 사용자 ID
    private User user; // 사용자와의 관계 추가

    // 기본 생성자 추가
    public Product() {
    }
}
