import React, { useState } from 'react';
import styles from './Login.module.css';
import { IconChevronLeft, IconUser, IconBriefcase } from '../../components/Icon';

const ROLE_GENERAL = 'general';
const ROLE_BUSINESS = 'business';

function Login({ onLoginSuccess, onBack, onGoFindAccount, onGoRegister }) {
  const [role, setRole] = useState(ROLE_GENERAL);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleLoginSubmit = () => {
    if (!email.trim() || !pw.trim()) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (email === 'test@test.com' && pw === '1234') {
      const userType = role === ROLE_BUSINESS ? '사업자 회원' : '일반 회원';
      alert(`${userType}으로 로그인에 성공했습니다!`);
      onLoginSuccess(role);
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}><IconChevronLeft width={18} height={18} /></button>
        <h2 className={styles.title}>로그인</h2>
      </div>

      <div className={styles.content}>
        {/* 회원 유형 선택 탭 */}
        <div className={styles.roleGroup}>
          <button
            type="button"
            className={`${styles.roleTab} ${role === ROLE_GENERAL ? styles.roleTabActive : ''}`}
            onClick={() => setRole(ROLE_GENERAL)}
          >
            <span className={styles.roleIcon}><IconUser width={26} height={26} /></span>
            <span className={styles.roleText}>일반 회원</span>
          </button>
          <button
            type="button"
            className={`${styles.roleTab} ${role === ROLE_BUSINESS ? styles.roleTabActive : ''}`}
            onClick={() => setRole(ROLE_BUSINESS)}
          >
            <span className={styles.roleIcon}><IconBriefcase width={26} height={26} /></span>
            <span className={styles.roleText}>사업자 회원</span>
          </button>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="이메일 주소"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.inputField}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLoginSubmit(); }}
          />
          <button className={styles.emailLoginBtn} onClick={handleLoginSubmit}>
            {role === ROLE_BUSINESS ? '사업자 회원으로 로그인' : '이메일로 로그인'}
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>또는 1초 만에 시작하기</span>
        </div>

        <div className={styles.socialGroup}>
          <button className={`${styles.socialBtn} ${styles.kakao}`} onClick={() => onLoginSuccess(role)}>
            <span className={styles.socialIcon}>K</span> 카카오로 계속하기
          </button>
          <button className={`${styles.socialBtn} ${styles.naver}`} onClick={() => onLoginSuccess(role)}>
            <span className={styles.socialIcon}>N</span> 네이버로 계속하기
          </button>
          <button className={`${styles.socialBtn} ${styles.google}`} onClick={() => onLoginSuccess(role)}>
            <span className={styles.socialIcon}>G</span> 구글로 계속하기
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
