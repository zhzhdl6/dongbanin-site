import React, { useState } from 'react';
import styles from './FindAccount.module.css';

function FindAccount({ onBack, onGoHome }) {
  const [mode, setMode] = useState('findId');
  const [showResult, setShowResult] = useState(false);
  const [isCertified, setIsCertified] = useState(false); // 🌟 본인인증 상태 추가

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>◀</button>
        <h2 className={styles.title}>아이디/비밀번호 찾기</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.tabGroup}>
          <button className={`${styles.tabBtn} ${mode === 'findId' ? styles.active : ''}`} onClick={() => setMode('findId')}>아이디 찾기</button>
          <button className={`${styles.tabBtn} ${mode === 'findPw' ? styles.active : ''}`} onClick={() => setMode('findPw')}>비밀번호 찾기</button>
        </div>

        <div className={styles.formGroup}>
          {/* 입력란은 최소화하되, 본인인증 버튼으로 신뢰성 확보 */}
          {mode === 'findId' ? (
            <input type="text" placeholder="이름을 입력해주세요." className={styles.inputField} />
          ) : (
            <input type="email" placeholder="가입하신 이메일을 입력해주세요." className={styles.inputField} />
          )}
          
          {/* 🌟 휴대폰 번호 입력 대신 본인인증 버튼 배치 */}
          <button 
            className={styles.authBtn} 
            onClick={() => { setIsCertified(true); alert("본인인증이 완료되었습니다."); }}
          >
            {isCertified ? "✅ 본인인증 완료" : "휴대폰 본인인증하기"}
          </button>
          
          <button 
            className={styles.emailLoginBtn} 
            onClick={() => setShowResult(true)}
            disabled={!isCertified} // 🌟 인증해야 찾기 가능
          >
            찾기
          </button>
        </div>
      </div>

      {showResult && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>{mode === 'findId' ? '아이디 찾기 결과' : '비밀번호 발송 완료'}</h3>
            <p className={styles.modalBody}>
              {mode === 'findId' 
                ? <>회원님의 아이디는<br/><strong>dong****@email.com</strong> 입니다.</>
                : <>회원님의 이메일로 <strong>임시 비밀번호</strong> 를 발송했습니다.<br/>메일을 확인해 주세요.</>
              }
            </p>
            <button 
              className={styles.emailLoginBtn} 
              onClick={() => { setShowResult(false); onGoHome(); }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindAccount;