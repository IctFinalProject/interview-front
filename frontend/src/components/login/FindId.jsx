import React from 'react';
import styles from '../../styles/FindId.module.css';

const FindId = () => {
  return <>
  <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
    <div className={styles.findIdBox}>
      <h2 className="mb-4">아이디 찾기</h2>
      <form>
          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="name" className="form-label"><i class="fa-regular fa-user">&nbsp;</i>이름</label>
            <input type="text" className="form-control" id="name" placeholder="이름 입력" />
          </div>
          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="phone" className="form-label"><i class="fa-solid fa-phone">&nbsp;</i>전화번호</label>
            <div className="input-group">
              <input type="text" className="form-control" id="phone" placeholder="전화번호 입력" />
              <button className="btn btn-outline-secondary" type="button">인증번호 발송</button>
            </div>
          </div>

          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="phoneCode" className="form-label"><i class="fa-solid fa-phone">&nbsp;</i>인증코드 입력</label>
            <div className="input-group">
              <input type="text" className="form-control" id="phoneCode" placeholder="인증코드 입력" disabled />
              <span className="input-group-text text-success">전화번호 인증</span>
              <span className="input-group-text text-danger">03:00</span>
            </div>
          </div>
          <p className={styles['alert-text']}>* 이름: 필수정보입니다</p>
          <p className={styles['alert-text']}>* 전화번호: 필수정보입니다</p>
          <div className="btn-group d-flex justify-content-between">
            <button type="button" className="btn btn-primary me-2 rounded">이전</button>
            <button type="button" className="btn btn-secondary rounded">다음</button>
          </div>
      </form>
    </div>
  </div>
  </>
};

export default FindId;