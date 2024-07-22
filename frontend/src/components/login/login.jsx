import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Login.module.css';

const Login = () => {
  return (
    <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
      <div className={styles.loginBox}>
        <h2 className="mb-4">로그인</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">이메일</label>
            <input type="email" className="form-control" id="email" placeholder="이메일 입력" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">비밀번호</label>
            <input type="password" className="form-control" id="password" placeholder="비밀번호 입력" />
          </div>
          <div className={styles.errorMessage}>
            <p className="text-danger">이메일: 필수항목입니다!</p>
            <p className="text-danger">비밀번호: 필수항목입니다!</p>
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">로그인 정보 저장</label>
          </div>
          <div className="d-flex justify-content-around mb-4">
            <button type="button" className={`${styles.socialButton} btn btn-warning`}>K</button>
            <button type="button" className={`${styles.socialButton} btn btn-success`}>N</button>
            <button type="button" className={`${styles.socialButton} btn btn-primary`}>G</button>
          </div>
          <button type="submit" className="btn btn-dark w-100">로그인</button>
        </form>
        <div className="d-flex justify-content-between mt-3">
          <Link to="/signup" className={`${styles.link} text-decoration-none`}>회원가입</Link>
          <div>
            <Link to="/find-id" className={`${styles.link} text-decoration-none me-3`}>아이디 찾기</Link>
            <Link to="/find-password" className={`${styles.link} text-decoration-none`}>비밀번호 찾기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;