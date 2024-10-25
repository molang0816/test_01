"use client";

import './styles/globals.css';
import 자린고비 from '../public/image/login_png/자린고비.png';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <html lang="en">
      <body>
        <div className='menu_style'>
          <div className='div-style'>
            <Link href={'/'}>
              <Image src={자린고비} className='img-style' />
            </Link>
            <div className='div-style-1'>
              <form action='/search' method='GET' className='search-style-0'>
                <svg width="16" height="16" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.5 23.5L18.425 18.425M21.1667 11.8333C21.1667 16.988 16.988 21.1667 11.8333 21.1667C6.67868 21.1667 2.5 16.988 2.5 11.8333C2.5 6.67868 6.67868 2.5 11.8333 2.5C16.988 2.5 21.1667 6.67868 21.1667 11.8333Z"
                    stroke="#B3B3B3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
                <input
                  className='search-style-1'
                  type='search'
                  id='search'
                  name='query'
                  placeholder='원하시는 상품을 입력하세요'
                  required
                  autoComplete='off' />
              </form>
            </div>
            <div className='auth-menu'>
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="greeting">안녕하세요, {username}님</span>
                  <div className="divider"></div>
                  <button className="auth-button" onClick={handleLogout}>로그아웃</button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link href="/login">
                    <svg width="16" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26 2H34C35.0609 2 36.0783 2.42143 36.8284 3.17157C37.5786 3.92172 38 4.93913 38 6V34C38 35.0609 37.5786 36.0783 36.8284 36.8284C36.0783 37.5786 35.0609 38 34 38H26M16 30L26 20M26 20L16 10M26 20H2"
                        stroke="#757575"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                    <button className="auth-button">로그인</button>
                  </Link>
                  <div className="divider"></div>
                  <Link href="/signup">
                    <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 26.25V23.75C25 22.4239 24.4732 21.1521 23.5355 20.2145C22.5979 19.2768 21.3261 18.75 20 18.75H10C8.67392 18.75 7.40215 19.2768 6.46447 20.2145C5.52678 21.1521 5 22.4239 5 23.75V26.25M20 8.75C20 11.5114 17.7614 13.75 15 13.75C12.2386 13.75 10 11.5114 10 8.75C10 5.98858 12.2386 3.75 15 3.75C17.7614 3.75 20 5.98858 20 8.75Z"
                        stroke="#757575"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                    <button className="auth-button">회원가입</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <nav className='category-menu'>
            <div
              className='menu-item-1'
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}>
              <svg width="19" height="19" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 24H42M6 12H42M6 36H42"
                  stroke="#F5F5F5"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
              <span className='menu-text'>카테고리</span>
              {dropdownVisible && (
                <div className='dropdown-menu'>
                  <Link href="/products" className='dropdown-item'>상품 1</Link>
                  <Link href="/products" className='dropdown-item'>상품 2</Link>
                  <Link href="/products" className='dropdown-item'>상품 3</Link>
                </div>
              )}
            </div>
            <Link href="/events" className='menu-item'>이벤트</Link>
            <Link href="/product_create" className='menu-item'>상품등록</Link>
            <Link href="/favorites" className='menu-item'>찜한 상품</Link>
          </nav>
        </div>
        <div className="main-content">
          {children}
        </div>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>회사 정보</h4>
              <p>주소: 서울특별시 어쩌구 123</p>
              <p>전화: 010-1234-5678</p>
              <p>이메일: info@example.com</p>
            </div>
            <div className="footer-section">
              <h4>링크</h4>
              <ul>
                <li><a href="/about">회사 소개</a></li>
                <li><a href="/contact">고객센터</a></li>
                <li><a href="/privacy">개인정보처리방침</a></li>
                <li><a href="/terms">이용약관</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>소셜 미디어</h4>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 회사 이름. 모든 권리 보유.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
