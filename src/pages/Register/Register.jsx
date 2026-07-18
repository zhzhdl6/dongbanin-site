import React, { useState } from 'react';
import styles from './Register.module.css';
import {
  IconChevronLeft, IconUser, IconBriefcase, IconCamera,
  IconDogFace, IconCatFace, IconCheck
} from '../../components/Icon';

const ROLE_GENERAL = 'general';
const ROLE_BUSINESS = 'business';

// 사업자 등록번호 자동 하이픈 포매터 (XXX-XX-XXXXX)
const formatBizNumber = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

function Register({ onBack, onComplete }) {
  const [role, setRole] = useState(ROLE_GENERAL);
  const [formData, setFormData] = useState({
    email: '', pw: '', pwConfirm: '', name: '', phone: '',
    nickname: '', profileImg: 'cat',
    companyName: '', bizNumber: ''
  });

  const [pwError, setPwError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [isCertified, setIsCertified] = useState(false);
  const [bizError, setBizError] = useState('');

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

  const handleBizNumberChange = (e) => {
    const formatted = formatBizNumber(e.target.value);
    setFormData(prev => ({ ...prev, bizNumber: formatted }));
    const digits = formatted.replace(/\D/g, '');
    if (digits.length === 0) { setBizError(''); return; }
    setBizError(digits.length === 10 ? '' : '사업자등록번호 10자리를 모두 입력해주세요.');
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, profileImg: imageUrl }));
      setIsProfileModalOpen(false);
    }
  };

  const handleSelectEmoji = (key) => {
    setFormData(prev => ({ ...prev, profileImg: key }));
    setIsProfileModalOpen(false);
  };

  const renderProfilePreview = () => {
    const p = formData.profileImg;
    if (typeof p === 'string' && p.startsWith('http')) {
      return <img src={p} alt="프로필" className={styles.uploadedImg} />;
    }
    if (p === 'dog') return <IconDogFace width={44} height={44} />;
    if (p === 'cat') return <IconCatFace width={44} height={44} />;
    return <span>{p}</span>;
  };

  const handleFinalSubmit = () => {
    if (role === ROLE_BUSINESS) {
      if (!formData.companyName.trim()) { alert('회사명을 입력해주세요.'); return; }
      if (formData.bizNumber.replace(/\D/g, '').length !== 10) { alert('사업자등록번호 10자리를 정확히 입력해주세요.'); return; }
    }

    let finalNickname = formData.nickname.trim();
    if (!finalNickname) finalNickname = formData.name.trim() || '미지정회원';

    const roleLabel = role === ROLE_BUSINESS ? '사업자 회원' : '일반 회원';
    alert(`회원가입 완료!\n회원 유형: ${roleLabel}\n닉네임: ${finalNickname}`);

    if (onComplete) onComplete(role);
  };

  const handleVerify = () => {
    if (authCode === '1234') {
      setIsEmailVerified(true);
      setShowAuthInput(false);
      setCodeError('');
      alert('이메일 인증이 완료되었습니다.');
    } else {
      setCodeError('인증코드를 정확히 작성해주세요.');
    }
  };

  const isSubmitDisabled =
    !isCertified ||
    !isEmailVerified ||
    pwError !== '' ||
    matchError !== '' ||
    formData.pw === '' ||
    formData.name === '' ||
    (formData.nickname.trim() !== '' && !isNicknameChecked) ||
    (role === ROLE_BUSINESS && (!formData.companyName.trim() || formData.bizNumber.replace(/\D/g, '').length !== 10));

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}><IconChevronLeft width={18} height={18} /></button>
        <h2 className={styles.title}>회원가입</h2>
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
          {/* 프로필 사진 등록 슬롯 */}
          <div className={styles.profileUploadSection}>
            <div className={styles.profilePreviewCircle}>
              {renderProfilePreview()}
            </div>
            <button className={styles.profileSelectTriggerBtn} onClick={() => setIsProfileModalOpen(true)}>
              <IconCamera width={14} height={14} /> 프로필 사진 등록 (선택)
            </button>
          </div>

          {/* 닉네임 */}
          <div className={styles.rowFieldContainer}>
            <input
              type="text"
              placeholder="닉네임 (미입력 시 이름으로 자동기입)"
              className={styles.inputField}
              value={formData.nickname}
              onChange={(e) => {
                setFormData(p => ({ ...p, nickname: e.target.value }));
                setIsNicknameChecked(false);
              }}
            />
            <button className={styles.rowCheckBtn} onClick={handleCheckNickname}>중복확인</button>
          </div>
          {nicknameError && <p className={styles.errorText}>{nicknameError}</p>}
          {isNicknameChecked && <p className={styles.successText}><IconCheck width={12} height={12} /> 닉네임 중복 확인 완료</p>}

          <hr className={styles.fieldDivider} />

          <input type="text" placeholder="이름" className={styles.inputField} value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />

          {/* 사업자 회원 전용 입력 필드 */}
          {role === ROLE_BUSINESS && (
            <>
              <div className={styles.businessFieldGroup}>
                <label className={styles.fieldLabel}><IconBriefcase width={12} height={12} /> 사업자 회원 전용 정보</label>
                <input
                  type="text"
                  placeholder="회사명"
                  className={styles.inputField}
                  value={formData.companyName}
                  onChange={(e) => setFormData(p => ({ ...p, companyName: e.target.value }))}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="사업자등록번호 (예: 123-45-67890)"
                  className={styles.inputField}
                  value={formData.bizNumber}
                  onChange={handleBizNumberChange}
                />
                {bizError && <p className={styles.errorText}>{bizError}</p>}
              </div>
              <hr className={styles.fieldDivider} />
            </>
          )}

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
              {showAuthInput ? '확인' : '이메일 인증 받기'}
            </button>
          )}
          {isEmailVerified && <p className={styles.verifiedText}><IconCheck width={14} height={14} /> 이메일 인증 완료</p>}

          <input type="password" placeholder="비밀번호" className={styles.inputField} value={formData.pw} onChange={(e) => { const v = e.target.value; setFormData(p => ({...p, pw: v})); setPwError(validatePassword(v)); }} />
          {pwError && <p className={styles.errorText}>{pwError}</p>}

          <input type="password" placeholder="비밀번호 확인" className={styles.inputField} value={formData.pwConfirm} onChange={(e) => { const v = e.target.value; setFormData(p => ({...p, pwConfirm: v})); setMatchError(formData.pw !== v ? '비밀번호가 일치하지 않습니다.' : ''); }} />
          {matchError && <p className={styles.errorText}>{matchError}</p>}

          <button className={styles.authBtn} onClick={() => { setIsCertified(true); alert('본인인증 완료'); }}>
            {isCertified ? <><IconCheck width={14} height={14} /> 휴대폰 본인인증 완료</> : '휴대폰 본인인증하기'}
          </button>

          <button className={styles.emailLoginBtn} onClick={handleFinalSubmit} disabled={isSubmitDisabled}>
            {role === ROLE_BUSINESS ? '사업자 회원 가입 완료하기' : '가입 완료하기'}
          </button>
        </div>
      </div>

      {isProfileModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsProfileModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>프로필 설정</h3>
            <p className={styles.modalSub}>원하는 방식으로 이미지를 지정하세요.</p>

            <div className={styles.modalBody}>
              <label htmlFor="fileUploadInput" className={styles.fileUploadLabelBtn}>
                <IconCamera width={16} height={16} /> 내 앨범에서 이미지 선택
              </label>
              <input type="file" id="fileUploadInput" accept="image/*" className={styles.hiddenFileInput} onChange={handleFileChange} />

              <div className={styles.emojiSelectionDivider}>
                <span>또는 기본 캐릭터 고르기</span>
              </div>

              <div className={styles.emojiGrid}>
                <button className={styles.emojiPickBtn} onClick={() => handleSelectEmoji('dog')}><IconDogFace width={30} height={30} /></button>
                <button className={styles.emojiPickBtn} onClick={() => handleSelectEmoji('cat')}><IconCatFace width={30} height={30} /></button>
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
