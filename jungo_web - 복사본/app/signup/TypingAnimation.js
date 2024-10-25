// app/components/TypingAnimation.js
"use client"; // 클라이언트 컴포넌트로 설정

import React, { useEffect, useState } from 'react';
import './TypingAnimation.css'; // CSS 파일 import

const TypingAnimation = () => {
    const [showSecondText, setShowSecondText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondText(true);
        }, 4000); // 첫 번째 텍스트 애니메이션 시간 (4초)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="typing-animation">
            <span className="typing-text">자린고비에 오신걸</span><br />
            {showSecondText && <span className="typing-text_01">환영합니다.</span>}
        </div>
    );
};

export default TypingAnimation;
