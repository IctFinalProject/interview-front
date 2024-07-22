import React from 'react';
import styles from '../../styles/Login.module.css';

const FindId = () => {
  return (
    <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
      <div className={styles.loginBox}>
        <h2 className="mb-4">아이디 찾기</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">이름</label>
            <input type="text" className="form-control" id="name" placeholder="이름" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">전화번호</label>
            <div className="d-flex">
              <input type="text" className="form-control" id="phone" placeholder="전화번호" />
              <button type="button" className="btn btn-outline-secondary ms-2">인증번호 발송</button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">인증코드 입력</label>
            <input type="text" className="form-control" id="code" placeholder="인증코드 입력" />
          </div>
          <div className={styles.errorMessage}>
            <p className="text-danger">이름: 필수항목입니다!</p>
            <p className="text-danger">전화번호: 필수항목입니다!</p>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary">이전</button>
            <button type="submit" className="btn btn-dark">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindId;