import React from 'react';
import styles from '@/styles/footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>

        <div>
          <div className={styles.footerLogo}>
            <div className={styles.footermainLogo}></div>
          </div>
          <div className={styles.logoSection}>
            <div className={styles.socialIconsSection}>
              <a href="https://github.com/orgs/IctFinalProject/teams/interviewai" className={styles.icon}>
                <div className={styles.gitIcon}></div>
              </a>
              <a href="https://shard-midnight-83b.notion.site/2-AI-f04a13fec94e4587961da144b4be42fe" className={styles.icon}>
                <div className={styles.notionIcon}></div>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.footerInfoFrame}>
            <div className={styles.menuSection}>
              <a className={styles.menuLink}>회사 소개</a>
              <a href="#" className={styles.menuLink}>이용약관</a>
              <a href="#" className={styles.menuLink}>개인정보 처리방침</a>
              <a href="#" className={styles.menuLink}>공지사항</a>
              <a href="#" className={styles.menuLink}>고객센터</a>
            </div>

            <div className={styles.addressSection}>
              <p>강남센터 | 서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</p>
              <p>한국 ICT 인재개발원 2기</p>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.footerEmpty}>
            <h4></h4>
          </div>
        </div>

      </div>
      <p className={styles.copyright}>@ 한국 ICT 인재개발원 2기</p>
    </div>
  );
};

export default Footer;