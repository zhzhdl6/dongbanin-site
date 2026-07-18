// src/components/AuthGuard.jsx
import React from 'react';
import styles from './AuthGuard.module.css'; // 위시리스트에서 쓰던 스타일 활용

function AuthGuard({ children, isLoggedIn, onGoLogin }) {

  if (!isLoggedIn) {
      return (
        <div className={styles.notLoggedContainer}>
          <div className={styles.lockIcon}>🔒</div>
          <h3 className={styles.noticeTitle}>로그인이 필요한 서비스입니다</h3>
          <p className={styles.noticeDesc}>로그인하고 더욱 많은 서비스를 편하게 받아보세요!</p>
          <button className={styles.loginBtn} onClick={onGoLogin}>로그인 / 회원가입</button>
        </div>
      );
    }
  return <>{children}</>;
}

export default AuthGuard;

 