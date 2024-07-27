import React from 'react';
import styles from '../../styles/FindPassword.module.css';

const FindPassword = () => {
  return <>
  <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
    <div className={styles.findPasswordBox}>
      <h2 className="mb-4">비밀번호 찾기</h2>
      <form>
          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="name" className="form-label"><i class="fa-regular fa-user">&nbsp;</i>이름</label>
            <input type="text" className="form-control" id="name" placeholder="이름 입력" />
          </div>
          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="email" className="form-label"><i class="fa-regular fa-envelope">&nbsp;</i>이메일</label>
            <div className="input-group">
              <input type="email" className="form-control" id="email" placeholder="이메일 입력" />
              <button className="btn btn-outline-secondary" type="button">인증번호 발송</button>
            </div>
          </div>

          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="emailCode" className="form-label"><i class="fa-regular fa-envelope">&nbsp;</i>인증코드 입력</label>
            <div className="input-group">
              <input type="text" className="form-control" id="emailCode" placeholder="인증코드 입력" disabled />
              <span className="input-group-text text-success">이메일 인증</span>
              <span className="input-group-text text-danger">03:00</span>
            </div>
          </div>
          <p className={styles['alert-text']}>* 이름: 필수정보입니다</p>
          <p className={styles['alert-text']}>* 이메일: 필수정보입니다</p>
          <div className="btn-group d-flex justify-content-between">
            <button type="button" className="btn btn-primary me-2 rounded">이전</button>
            <button type="button" className="btn btn-secondary rounded">다음</button>
          </div>
      </form>
    </div>
  </div>
  </>
};

export default FindPassword;