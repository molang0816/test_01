import styles from './1.module.css';

export default function ok() {
    return (
        <div>
            <div className={styles.svg_style}>
                <svg width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg_style_01}>
                    <path d="M40 12L18 34L8 24" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className={styles.h1_style}>
                <h1 className={styles}>로그인 완료</h1>
            </div>
            <a className={styles.a_style_01} href='/product_create'>
                상품 등록하러 가기
            </a>
        </div>
    )
}