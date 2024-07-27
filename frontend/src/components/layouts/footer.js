// Footer.js
import React from 'react';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <h4>모의면접</h4>
          <div className={styles.socialIconsSection}>
            <span className={styles.icon}><i className="fa-brands fa-x-twitter"></i></span>
            <span className={styles.icon}><i className="fa-brands fa-instagram"></i></span>
            <span className={styles.icon}><i className="fa-brands fa-youtube"></i></span>
          </div>
        </div>
        <div className={styles.menuSection}>
          <a href="#" className={styles.menuLink}>회사 소개</a>
          <a href="#" className={styles.menuLink}>이용약관</a>
          <a href="#" className={styles.menuLink}>개인정보 처리방침</a>
          <a href="#" className={styles.menuLink}>공지사항</a>
          <a href="#" className={styles.menuLink}>고객센터</a>
        </div>
      </div>
      <p className={styles.copyright}>@ 한국 ICT 인재개발원 2기</p>
    </div>
  );
};

export default Footer;