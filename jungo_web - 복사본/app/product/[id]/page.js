'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./page_01.module.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bids, setBids] = useState([]);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:8080/api/products/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchBids = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:8080/api/bids/product/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setBids(data);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchProduct();
        fetchBids();
    }, [id]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/bids/product/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(amount) })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newBid = await response.json();
            setBids((prev) => [...prev, newBid]);
            setAmount("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAcceptBid = async (bidId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bids/accept/${bidId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedBid = await response.json();
            setBids((prev) => prev.map(bid =>
                bid.id === updatedBid.id ? updatedBid : bid
            ));

            // 가격 업데이트
            setProduct((prev) => ({
                ...prev,
                price: `${updatedBid.amount}원` // 새로운 가격으로 업데이트
            }));
        } catch (error) {
            console.error("수락 실패:", error);
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    return (
        <div className={styles.product_detail}>
            <Image
                src={`http://localhost:8080/images/${product.imagePath}`}
                alt={product.name}
                className={styles.item_image}
                width={400}
                height={400}
            />
            <div className={styles.item_list}>
                <h2 className={styles.item_name}>{product.name}</h2>
                <p className={styles.item_price}>{product.price}</p>
                <p className={styles.item_description}>{product.description}</p>
                <button className={styles.item_button}>구입하기</button>
            </div>

            <div className={styles.bid_section}>
                <h3>경매 제안하기</h3>
                <form onSubmit={handleBidSubmit}>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="제안 금액"
                        required
                    />
                    <button type="submit">제안하기</button>
                </form>

                <h3>제안 목록</h3>
                <ul>
                    {bids.map(bid => (
                        <li key={bid.id}>
                            금액: {bid.amount}원 - 날짜: {new Date(bid.createdAt).toLocaleString()}
                            {!bid.accepted && (
                                <button onClick={() => handleAcceptBid(bid.id)}>수락</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetail;
