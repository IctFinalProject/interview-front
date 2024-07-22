import React from 'react';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h4>모의면접</h4>
          <div className={styles.socialIcons}>
            <span className={styles.icon}><i class="fa-brands fa-x-twitter"></i></span>
            <span className={styles.icon}><i class="fa-brands fa-instagram"></i></span>
            <span className={styles.icon}><i class="fa-brands fa-youtube"></i></span>
          </div>
        </div>
        <div className={styles.section}>
          <h4>소개</h4>
          <ul>
            <li><a href="#">사용 기술</a></li>
            <li><a href="#">요금제 소개</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>회사 검색</h4>
          <ul>
            <li><a href="#">회사 상세</a></li>
            <li><a href="#">회사 위치</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>모의면접</h4>
          <ul>
            <li><a href="#">이력서 첨삭</a></li>
            <li><a href="#">모의면접 보기</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>게시판</h4>
          <ul>
            <li><a href="#">면접자 게시판</a></li>
            <li><a href="#">공지사항</a></li>
            <li><a href="#">QnA</a></li>
          </ul>
        </div>
      </div>
      <p className={styles.copyright}>@ ICT 2기</p>
    </div>
  );
};

export default Footer;