'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles/page.module.css";
import 배너_02 from "../public/image/배너_02.png";
import 배너_01 from "../public/image/배너_01.png"; // 다른 배너 이미지
import Link from "next/link";

export default function Home() {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [products, setProducts] = useState([]); // 상품 목록 상태 추가

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products'); // API 호출
                if (!response.ok) throw new Error('네트워크 응답이 정상이 아닙니다.');
                const data = await response.json();
                setProducts(data); // 상품 목록 상태 업데이트
            } catch (error) {
                console.error('상품 로드 실패:', error);
            }
        };

        fetchProducts(); // 컴포넌트가 마운트될 때 상품 데이터 가져오기

        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 4000); // 4초마다 이미지 전환

        return () => clearInterval(interval); // 클린업
    }, []);

    const banners = [
        { id: 1, src: 배너_02, alt: "첫 번째 배너 이미지" },
        { id: 2, src: 배너_01, alt: "두 번째 배너 이미지" },
    ];

    return (
        <div>
            <div className={styles.div_banner}>
                <Link href={'/'}>
                    <Image
                        src={banners[currentBannerIndex].src}
                        className={styles.img_style}
                        alt={banners[currentBannerIndex].alt}
                    />
                </Link>
            </div>
            <div className={styles.dot_container}>
                {banners.map((banner, index) => (
                    <span
                        key={banner.id}
                        className={`${styles.dot} ${currentBannerIndex === index ? styles.active_dot : ''}`}
                        onClick={() => setCurrentBannerIndex(index)}
                    ></span>
                ))}
            </div>

            <div>
                <h3 className={styles.h3_style_01}>
                    최근 등록된 상품
                </h3>
            </div>
            <div className={styles.div_banner_01}>
                <div className={styles.product_list}>
                    {products.map(product => (
                        <Link key={product.id} href={`/product/${product.id}`}>
                            <div className={styles.product_item}>
                                <Image
                                    src={`http://localhost:8080/images/${product.imagePath}`} // 이미지 경로 설정
                                    alt={product.name}
                                    className={styles.item_image}
                                    width={200}
                                    height={200}
                                />
                                <div className={styles.name_price_style}>
                                    <h3 className={styles.item_name}>{product.name}</h3>
                                    <p className={styles.item_price}>{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
