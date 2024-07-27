// Header.js
import React from 'react';
import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>모의면접</div>
        <nav className={styles.navLinks}>
          <a href="#" className={styles.navLink}>소개</a>
          <a href="#" className={styles.navLink}>회사 검색</a>
          <a href="#" className={styles.navLink}>모의 면접</a>
          <a href="#" className={styles.navLink}>게시판</a>
          <a href="#" className={styles.navLink}>고객센터</a>
        </nav>
        <div className={styles.userMenu}>
          <div className={styles.userName}>홍길동</div>
          <button className={styles.notificationButton}>🔔</button>
          <button className={styles.loginButton}>로그인</button>
          <button className={styles.signupButton}>회원가입</button>
        </div>
      </header>
    </>
  );
}

export default Header;