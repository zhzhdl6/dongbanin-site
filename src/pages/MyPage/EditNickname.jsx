import React, { useState } from 'react';
import styles from './EditNickname.module.css';
import { IconChevronLeft, IconCamera, IconDogFace, IconCatFace } from '../../components/Icon';

function EditNickname({ onBack }) {
  const [nickname, setNickname] = useState('관리자');
  const [profileImg, setProfileImg] = useState('cat');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const mockNicknames = ['홍길동', '이순신'];

  const handleCheck = () => {
    if (!nickname.trim()) return alert('닉네임을 입력해주세요.');
    if (mockNicknames.includes(nickname.trim())) {
      alert('이미 사용 중인 닉네임입니다.');
      setIsChecked(false);
    } else {
      alert('사용 가능한 닉네임입니다.');
      setIsChecked(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
      setIsModalOpen(false);
    }
  };

  const handleSelectEmoji = (emojiKey) => {
    setProfileImg(emojiKey);
    setIsModalOpen(false);
  };

  const renderProfile = () => {
    if (typeof profileImg === 'string' && profileImg.startsWith('http')) {
      return <img src={profileImg} alt="유저" className={styles.uploadedImg} />;
    }
    if (profileImg === 'dog') return <IconDogFace width={44} height={44} />;
    if (profileImg === 'cat') return <IconCatFace width={44} height={44} />;
    return <span>{profileImg}</span>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}><IconChevronLeft width={18} height={18} /></button>
        <h2 className={styles.title}>닉네임 변경</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.profileSection}>
          <div className={styles.circle}>{renderProfile()}</div>
          <button className={styles.imgBtn} onClick={() => setIsModalOpen(true)}>
            <IconCamera width={14} height={14} /> 프로필 사진 변경
          </button>
        </div>

        <div className={styles.row}>
          <input
            type="text"
            className={styles.input}
            value={nickname}
            onChange={(e) => { setNickname(e.target.value); setIsChecked(false); }}
          />
          <button className={styles.checkBtn} onClick={handleCheck}>중복확인</button>
        </div>

        <button className={styles.saveBtn} disabled={!isChecked} onClick={() => { alert('변경되었습니다.'); onBack(); }}>
          변경사항 저장하기
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
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
            <button className={styles.modalCloseBtn} onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditNickname;
