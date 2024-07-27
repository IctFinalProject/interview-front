import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Login.module.css';

const Login = () => {

  const iconStyle = {
    width: '40px',
    height: '40px',
    objectFit: 'cover'
  };
  return <>
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
          <div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">로그인 상태 유지</label>
            </div>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">로그인</button>
        </form>
        <div className="d-flex justify-content-around mb-4">
          <img style={iconStyle} src="/images/naverButton.png" alt="Naver" />
          <img style={iconStyle} src="/images/kakaoButton.png" alt="Kakao" />
          <img style={iconStyle} src="/images/googleButton.png" alt="Google" />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Link to="/register" className={`${styles.link} text-decoration-none`}>회원가입</Link>
          <div>
            <Link to="/findId" className={`${styles.link} text-decoration-none me-3`}>아이디 찾기</Link>
            <Link to="/findPassword" className={`${styles.link} text-decoration-none`}>비밀번호 찾기</Link>
          </div>
        </div>
      </div>
    </div>
    </>
};

export default Login;