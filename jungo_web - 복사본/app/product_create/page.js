'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProductCreate.module.css'; // 스타일 파일

export default function ProductCreate() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setIsLoggedIn(true);
            setUsername(user);
        } else {
            alert('로그인 후 이용해 주세요.');
            router.push('/login');
        }
    }, [router]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', price);
        formData.append('username', username);

        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('상품 등록 성공');
                router.push('/');
            } else {
                const errorData = await response.json();
                console.error('상품 등록 실패:', errorData);
            }
        } catch (error) {
            console.error('네트워크 오류:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <h2 className={styles.container}>상품 등록</h2>
                <form onSubmit={handleSubmit} className={styles.form_01}>
                    <input
                        className={styles.input_01}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {imagePreview && (
                        <div className={styles.img_preview}>
                            <img src={imagePreview} alt="미리 보기" className={styles.img_style} />
                        </div>
                    )}
                    <input
                        className={styles.input_01}
                        type="text"
                        placeholder="상품 이름"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input_02}
                        type="text"
                        placeholder="상품 설명"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input_01}
                        type="text"
                        placeholder="가격"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <p className={styles.input_01}>등록 사용자: {username}</p>
                    <button className={styles.button_01} type="submit">등록하기</button>
                </form>
            </div>
        </div>
    );
}
