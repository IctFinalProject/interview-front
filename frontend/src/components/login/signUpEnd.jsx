import React from 'react';
import styles from '../../styles/signUpEnd.module.css';

const signUpEnd = () => {
  return <>
  <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
    <div className={styles.signUpEndBox}>
      <h2 className="mb-4">회원가입 완료</h2>
          <div className={`form-group ${styles['form-group']}`}>
            <p className={`text-center ${styles['upper-text']}`}>홍길동 님의 회원가입이 완료되었습니다.</p>
          </div>
          <div className={`form-group ${styles['form-group']}`}>
            <p className={`${styles['lower-text']}`}> 
              회원가입 시 기본가입자로 등록됩니다.
              <br/>
              더 많은 기능을 이용하시려면 로그인 후 요금제를 선택해주세요.
            </p>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">로그인</button>
    </div>
  </div>
  </>
};

export default signUpEnd;