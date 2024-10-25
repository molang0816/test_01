'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';
import './TypingAnimation.css';
import styles_01 from './1.module.css';

const Signup = () => {
    const [showSecondText, setShowSecondText] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const firstTextTimer = setTimeout(() => {
            setShowSecondText(true);
        }, 3000);

        const secondTextTimer = setTimeout(() => {
            setShowSecondText(false);
        }, 8000);

        return () => {
            clearTimeout(firstTextTimer);
            clearTimeout(secondTextTimer);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 입력 유효성 검사
        if (username.length < 3) {
            setError('아이디는 최소 3자리여야 합니다.');
            return;
        }
        if (password.length < 6) {
            setError('비밀번호는 최소 6자리여야 합니다.');
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const formData = { username, password };

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/signup/ok');
            } else {
                const errorData = await response.json();
                setError(errorData.message || '회원가입 실패');
            }
        } catch (error) {
            setError('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div>
            <div className={styles.box_top}>
                <div className={styles.box_container}>
                    <div className={styles.div_style}>
                        <div className={styles.div_style_01}>
                            <div className="typing-animation">
                                <span>자린고비에 오신걸</span>
                            </div>
                            {showSecondText && (
                                <div className="typing-animation_01">
                                    <span>환영합니다.</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.div_top}>
                        <form onSubmit={handleSubmit} className={styles_01.div_top_01}>
                            <input
                                className={styles_01.id_container}
                                type='text'
                                placeholder='원하는 아이디를 입력하세요'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                className={styles_01.id_container}
                                type='password'
                                placeholder='비밀번호를 입력하세요'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                className={styles_01.id_container}
                                type='password'
                                placeholder='비밀번호를 한번 더 입력하세요'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {error && <div className={styles.error_message}>{error}</div>}
                            <button
                                className={styles_01.button_container}
                                type='submit'
                            >
                                생성하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
