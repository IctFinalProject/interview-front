import React, { useState } from 'react';
import styles from '../../styles/signUpProfile.module.css';

const SignUpProfile = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return <>
    <div className={`${styles.container} d-flex justify-content-center align-items-center`}>
        <div className={styles.signUpProfileBox}>
        <h2 className={styles.title}>프로필 등록</h2>
        <div className={styles.profileImageContainer}>
            <div className={styles.placeholder}></div>
            <input
            type="file"
            id="profileUpload"
            className={styles.fileInput}
            onChange={handleFileChange}
            />
            <label htmlFor="profileUpload" className={styles.fileLabel}>
            프로필 첨부
            </label>
            <p className={styles.fileName}>{fileName || '미첨부시 기본 이미지'}</p>
        </div>
            <div className="btn-group d-flex justify-content-between">
                <button type="button" className="btn btn-primary me-2 rounded">이전</button>
                <button type="button" className="btn btn-secondary rounded">다음</button>
            </div>
        </div>
    </div>
  </>
};

export default SignUpProfile;