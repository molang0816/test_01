package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // UserRepository는 데이터베이스와의 상호작용을 담당

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }

    public User register(User user) {

        // 사용자 존재 여부 확인
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        // 비밀번호 해싱 처리 (권장)
        // 예: user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 사용자 저장
        return userRepository.save(user); // 사용자 저장 후 반환
    }
}
