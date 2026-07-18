import React, { useState } from 'react';
import styles from './Register.module.css';

function Register({ onBack, onComplete }) {
  // 🌟 기존 필드에 nickname과 profileImg 속성 추가
  const [formData, setFormData] = useState({ 
    email: '', 
    pw: '', 
    pwConfirm: '', 
    name: '', 
    phone: '',
    nickname: '',
    profileImg: '🐱' // 기본 프로필 이모티콘 베이스 지정
  });
  
  const [pwError, setPwError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // 🌟 닉네임 검증 및 팝업 토글용 상태값 추가
  const [nicknameError, setNicknameError] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // 이메일 인증 상태
  const [authCode, setAuthCode] = useState(''); 
  const [showAuthInput, setShowAuthInput] = useState(false); 
  const [isEmailVerified, setIsEmailVerified] = useState(false); 
  const [codeError, setCodeError] = useState('');
  
  const [isCertified, setIsCertified] = useState(false); // 휴대폰 인증

  // 🌟 DB 닉네임 중복 체크 모사용 가짜 데이터 배열
  const mockExistingNicknames = ['관리자', '홍길동', '스피커', '헤어디자이너'];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : '올바른 이메일 형식을 입력해주세요.';
  
  const validatePassword = (pw) => {
    if (pw.length === 0) return '';
    const hasLetter = /[a-zA-Z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSpecial = /[!@#$%^&*]/.test(pw);
    return (pw.length >= 8 && hasLetter && hasNumber && hasSpecial) ? '' : '영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    setEmailError(validateEmail(value));
  };

  // 🌟 닉네임 중복 체크 처리 핸들러
  const handleCheckNickname = () => {
    if (!formData.nickname.trim()) {
      setNicknameError('사용하실 닉네임을 입력한 후 검사해주세요.');
      setIsNicknameChecked(false);
      return;
    }
    
    if (mockExistingNicknames.includes(formData.nickname.trim())) {
      setNicknameError('이미 존재하는 중복 닉네임입니다. 다른 이름을 사용해주세요.');
      setIsNicknameChecked(false);
    } else {
      setNicknameError('');
      setIsNicknameChecked(true);
      alert('사용 가능한 닉네임입니다!');
    }
  };

  // 🌟 이미지 파일 업로드 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, profileImg: imageUrl }));
      setIsProfileModalOpen(false); // 팝업 닫기
    }
  };

  // 🌟 기본 제공 이모티콘 픽업 선택기
  const handleSelectEmoji = (emoji) => {
    setFormData(prev => ({ ...prev, profileImg: emoji }));
    setIsProfileModalOpen(false);
  };

  // 🌟 가입 최종 완료 서브밋 제어기
  const handleFinalSubmit = () => {
    let finalNickname = formData.nickname.trim();
    
    // 닉네임을 따로 안 적었다면 이름을 닉네임으로 강제 자동 기입 세팅
    if (!finalNickname) {
      finalNickname = formData.name.trim() || '미지정회원';
    }

    alert(`회원가입 완료!\n닉네임: ${finalNickname}\n프로필: ${formData.profileImg.startsWith('http') ? '사용자 업로드 이미지' : formData.profileImg}`);
    
    if (onComplete) {
      onComplete();
    }
  };

  const handleVerify = () => {
    if (authCode === '1234') { 
      setIsEmailVerified(true);
      setShowAuthInput(false);
      setCodeError('');
      alert("이메일 인증이 완료되었습니다.");
    } else {
      setCodeError('인증코드를 정확히 작성해주세요.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>◀</button>
        <h2 className={styles.title}>회원가입</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.formGroup}>
          
          {/* 🌟 ① 최상단 프로필 사진 등록 슬롯 */}
          <div className={styles.profileUploadSection}>
            <div className={styles.profilePreviewCircle}>
              {formData.profileImg.startsWith('http') ? (
                <img src={formData.profileImg} alt="프로필" className={styles.uploadedImg} />
              ) : (
                <span className={styles.emojiDisplay}>{formData.profileImg}</span>
              )}
            </div>
            <button className={styles.profileSelectTriggerBtn} onClick={() => setIsProfileModalOpen(true)}>
              프로필 사진 등록 (선택)
            </button>
          </div>

          {/* 🌟 ② 최상단 닉네임(선택) 슬롯 영역 */}
          <div className={styles.rowFieldContainer}>
            <input 
              type="text" 
              placeholder="닉네임 (미입력 시 이름으로 자동기입)" 
              className={styles.inputField} 
              value={formData.nickname}
              onChange={(e) => {
                setFormData(p => ({ ...p, nickname: e.target.value }));
                setIsNicknameChecked(false); // 글자 수정되면 중복 확인 해제
              }}
            />
            <button className={styles.rowCheckBtn} onClick={handleCheckNickname}>중복확인</button>
          </div>
          {nicknameError && <p className={styles.errorText}>{nicknameError}</p>}
          {isNicknameChecked && <p className={styles.successText}>✓ 닉네임 중복 확인 완료</p>}

          <hr className={styles.fieldDivider} />

          {/* 기존 회원가입 폼 요소 보존 */}
          <input type="text" placeholder="이름" className={styles.inputField} value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />
          
          <input type="email" placeholder="이메일 주소" className={styles.inputField} onChange={handleEmailChange} />
          {emailError && <p className={styles.errorText}>{emailError}</p>}
          
          {showAuthInput && (
            <>
              <input type="text" placeholder="인증코드 4자리" className={styles.inputField} onChange={(e) => setAuthCode(e.target.value)} />
              {codeError && <p className={styles.errorText}>{codeError}</p>}
            </>
          )}

          {!isEmailVerified && (
            <button 
              className={styles.authBtn} 
              onClick={() => showAuthInput ? handleVerify() : setShowAuthInput(true)}
              disabled={emailError !== '' || formData.email === ''}
            >
              {showAuthInput ? "확인" : "이메일 인증 받기"}
            </button>
          )}
          {isEmailVerified && <p style={{ color: '#38A169', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>✅ 이메일 인증 완료</p>}
          
          <input type="password" placeholder="비밀번호" className={styles.inputField} value={formData.pw} onChange={(e) => { const v = e.target.value; setFormData(p => ({...p, pw: v})); setPwError(validatePassword(v)); }} />
          {pwError && <p className={styles.errorText}>{pwError}</p>}
          
          <input type="password" placeholder="비밀번호 확인" className={styles.inputField} value={formData.pwConfirm} onChange={(e) => { const v = e.target.value; setFormData(p => ({...p, pwConfirm: v})); setMatchError(formData.pw !== v ? '비밀번호가 일치하지 않습니다.' : ''); }} />
          {matchError && <p className={styles.errorText}>{matchError}</p>}
          
          <button className={styles.authBtn} onClick={() => { setIsCertified(true); alert("본인인증 완료"); }}>
            {isCertified ? "✅ 휴대폰 본인인증 완료" : "휴대폰 본인인증하기"}
          </button>

          {/* 🌟 닉네임을 적었을 땐 중복체크 확인(isNicknameChecked)까지 완료해야 버튼 활성화되도록 인터록 추가 */}
          <button 
            className={styles.emailLoginBtn} 
            onClick={handleFinalSubmit} 
            disabled={
              !isCertified || 
              !isEmailVerified || 
              pwError !== '' || 
              matchError !== '' || 
              formData.pw === '' || 
              formData.name === '' ||
              (formData.nickname.trim() !== '' && !isNicknameChecked)
            }
          >
            가입 완료하기
          </button>
        </div>
      </div>

      {/* 🌟 ③ 이미지등록 또는 기본 이모티콘 팝업 모달 레이어 */}
      {isProfileModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsProfileModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>프로필 설정</h3>
            <p className={styles.modalSub}>원하는 방식으로 이미지를 지정하세요.</p>
            
            <div className={styles.modalBody}>
              {/* 기기 이미지 등록 섹션 */}
              <label htmlFor="fileUploadInput" className={styles.fileUploadLabelBtn}>
                📸 내 앨범에서 이미지 선택
              </label>
              <input 
                type="file" 
                id="fileUploadInput" 
                accept="image/*" 
                className={styles.hiddenFileInput} 
                onChange={handleFileChange} 
              />
              
              <div className={styles.emojiSelectionDivider}>
                <span>또는 기본 캐릭터 고르기</span>
              </div>
              
              {/* 기본 이모티콘 풀 매칭 */}
              <div className={styles.emojiGrid}>
                {['🐱', '🐈', '😺', '😻'].map((emoji, idx) => (
                  <button 
                    key={idx} 
                    className={styles.emojiPickBtn} 
                    onClick={() => handleSelectEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button className={styles.modalCloseBtn} onClick={() => setIsProfileModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;