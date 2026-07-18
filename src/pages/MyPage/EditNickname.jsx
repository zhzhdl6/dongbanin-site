// src/pages/MyPage/EditNickname.jsx 전체 코드
import React, { useState } from 'react';
import styles from './EditNickname.module.css';

function EditNickname({ onBack }) {
  const [nickname, setNickname] = useState('관리자');
  const [profileImg, setProfileImg] = useState('🐱');
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>◀</button>
        <h2 className={styles.title}>닉네임 변경</h2>
      </div>

      <div className={styles.content}>
        {/* 프로필 이미지 슬롯 */}
        <div className={styles.profileSection}>
          <div className={styles.circle}>
            {profileImg.startsWith('http') ? <img src={profileImg} alt="유저" /> : <span>{profileImg}</span>}
          </div>
          <button className={styles.imgBtn} onClick={() => setIsModalOpen(true)}>프로필 사진 변경</button>
        </div>

        {/* 닉네임 변경 인풋 상자 */}
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
    </div>
  );
}

export default EditNickname;