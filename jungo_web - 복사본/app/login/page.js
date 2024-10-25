'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import 초가 from '@/public/image/login_png/초가.png';
import { useState } from 'react';

export default function LoginHome() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true); // 로딩 상태 설정

        const formData = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        setLoading(false); // 로딩 완료

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', data.username);
            router.push('/login/ok');
        } else {
            const error = await response.json();
            setErrorMessage(error.message || '로그인 실패');
        }
    };

    return (
        <div>
            <div className={styles.img_container}>
                <Image src={초가} alt='로고' className={styles.img_style} />
            </div>
            <div className={styles.box_top}>
                <div className={styles.box_container}>
                    <form onSubmit={handleLogin} className={styles.button_top}>
                        <input type='text' name='username' placeholder='아이디를 입력하세요' className={styles.id_container} />
                        <input type='password' name='password' placeholder='비밀번호를 입력하세요' className={styles.id_container} />
                        <button className={styles.button_container} type='submit' disabled={loading}>로그인</button>
                    </form>
                    {errorMessage && <div className={styles.error_message}>{errorMessage}</div>}
                    <div className={styles.button_gap}>
                        <button className={styles.button_container_01}></button>
                        <button className={styles.button_container_02}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
