import React, { useState } from 'react'; // 🌟 useState 추가
import styles from './Login.module.css';

function Login({ onLoginSuccess, onBack, onGoFindAccount, onGoRegister }) {
  // 🌟 입력값을 저장할 상태 생성
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  // 🌟 로그인 검증 핸들러 함수
  const handleLoginSubmit = () => {
    // 대표님이 테스트하고 싶으신 임의의 계정 정보 조건을 넣습니다.
    if (email === 'test@test.com' && pw === '1234') {
      alert('로그인에 성공했습니다!');
      onLoginSuccess(); // App.jsx의 로그인 성공 로직 실행
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>◀</button>
        <h2 className={styles.title}>로그인</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.formGroup}>
          {/* 🌟 이메일 입력창에 value와 onChange 연결 */}
          <input 
            type="email" 
            placeholder="이메일 주소" 
            className={styles.inputField} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* 🌟 비밀번호 입력창에 value와 onChange 연결 */}
          <input 
            type="password" 
            placeholder="비밀번호" 
            className={styles.inputField} 
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {/* 🌟 클릭 시 임의 로그인 검증 함수 실행 */}
          <button className={styles.emailLoginBtn} onClick={handleLoginSubmit}>
            이메일로 로그인
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>또는 1초 만에 시작하기</span>
        </div>

        <div className={styles.socialGroup}>
          {/* 소셜 로그인은 테스트 편의상 누르면 바로 로그인되도록 기존대로 유지합니다 */}
          <button className={`${styles.socialBtn} ${styles.kakao}`} onClick={onLoginSuccess}>
            <span className={styles.icon}>💬</span> 카카오로 계속하기
          </button>
          <button className={`${styles.socialBtn} ${styles.naver}`} onClick={onLoginSuccess}>
            <span className={styles.icon}>N</span> 네이버로 계속하기
          </button>
          <button className={`${styles.socialBtn} ${styles.google}`} onClick={onLoginSuccess}>
            <span className={styles.icon}>G</span> 구글로 계속하기
          </button>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkItem} onClick={onGoFindAccount}>아이디/비밀번호 찾기</span>
          <span className={styles.linkDivider}>|</span>
          <span className={styles.linkItem} onClick={onGoRegister}>이메일 회원가입</span>
        </div>
      </div>
    </div>
  );
}

export default Login;