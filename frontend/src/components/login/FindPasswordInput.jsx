import React, { useState } from 'react';
import styles from '../../styles/FindPasswordInput.module.css';

const FindPasswordInput = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  return <>
  <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
    <div className={styles.findPasswordInputBox}>
      <h2 className="mb-4">새 비밀번호 설정</h2>
      <form>
      <div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"><i className="fa-solid fa-lock">&nbsp;</i>비밀번호</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="비밀번호 입력"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="passwordAgain" className="form-label"><i className="fa-solid fa-lock">&nbsp;</i>비밀번호 재 입력</label>
          <div className="input-group">
            <input
              type={showPasswordAgain ? "text" : "password"}
              className="form-control"
              id="passwordAgain"
              placeholder="비밀번호 재 입력"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordAgainVisibility}
            >
              <i className={`fa-regular ${showPasswordAgain ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
          </div>
        </div>
      </div>
      <p className={styles['alert-text']}>* 비밀번호: 필수정보입니다</p>
      <p className={styles['alert-text']}>* 비밀번호 재입력: 필수정보입니다</p>
      <div className="btn-group d-flex justify-content-between">
        <button type="button" className="btn btn-primary me-2 rounded">이전</button>
        <button type="button" className="btn btn-secondary rounded">다음</button>
      </div>
      </form>
    </div>
  </div>
  </>
};

export default FindPasswordInput;