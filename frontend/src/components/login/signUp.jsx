import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/SignUp.module.css';

function SignupForm() {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const buttonStyle = (isSelected) => ({
    display: 'block',
    padding: '10px 0',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#ccc' : '#f8f9fa', // 선택된 경우와 아닌 경우의 배경색
    border: '1px solid',
    borderColor: isSelected ? '#bbb' : '#dee2e6', // 선택된 경우와 아닌 경우의 테두리 색상
    color: '#333',
    fontSize: '16px',
    textAlign: 'center',
    width: '100%'
  });

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
    <div className={styles.signUpBox}>
      <div className={`card ${styles.card}`}>
        <h2 className={styles.title}>회원가입</h2>
        <form>
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

          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="name" className="form-label"><i class="fa-regular fa-user">&nbsp;</i>이름</label>
            <input type="text" className="form-control" id="name" placeholder="이름 입력" />
          </div>

          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="dob" className="form-label"><i class="fa-regular fa-calendar">&nbsp;</i>생년월일 8자리</label>
            <input type="text" className="form-control" id="dob" placeholder="생년월일 입력" />
          </div>

          <div className={`form-group ${styles['form-group']}`}>
          <label htmlFor="genderSelection" className="form-label"><i class="fa-solid fa-person">&nbsp;</i>성별 선택</label>
          <div className="input-group">
            <div className="form-check ps-0 flex-grow-1">
              <input
                type="radio"
                className="form-check-input"
                id="men"
                name="gender"
                value="men"
                checked={selectedGender === 'men'}
                onChange={handleGenderChange}
                style={{ position: 'absolute', opacity: 0 }}
              />
              <label
                className="form-check-label"
                htmlFor="men"
                style={buttonStyle(selectedGender === 'men')}
              >
                남자
              </label>
            </div>
            <div className="form-check flex-grow-1">
              <input
                type="radio"
                className="form-check-input"
                id="women"
                name="gender"
                value="women"
                checked={selectedGender === 'women'}
                onChange={handleGenderChange}
                style={{ position: 'absolute', opacity: 0 }}
              />
              <label
                className="form-check-label"
                htmlFor="women"
                style={buttonStyle(selectedGender === 'women')}
              >
                여자
              </label>
            </div>
          </div>
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

          <div className={`form-group ${styles['form-group']}`}>
            <label htmlFor="zipcode" className="form-label"><i class="fa-solid fa-location-dot">&nbsp;</i>우편번호</label>
            <div className="input-group mb-2">
              <input type="text" className="form-control" id="zipcode" placeholder="우편번호" />
              <button className="btn btn-outline-secondary" type="button">우편번호 검색</button>
            </div>
            <div className="input-group mb-2">
              <input type="text" className="form-control" id="address" placeholder="주소" />
            </div>
            <div className="input-group mb-2">
              <input type="text" className="form-control me-2 rounded" id="specificAddress" placeholder="상세주소" />
              <input type="text" className="form-control rounded" id="extraAddress" placeholder="참고항목" />
            </div>
          </div>
          <p className={styles['alert-text']}>* 아이디: 필수정보입니다</p>
          <p className={styles['alert-text']}>* 비밀번호: 필수정보입니다</p>
          <div className="btn-group d-flex justify-content-between">
            <button type="button" className="btn btn-primary me-2 rounded">이전</button>
            <button type="button" className="btn btn-secondary rounded">다음</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </>
}

export default SignupForm;