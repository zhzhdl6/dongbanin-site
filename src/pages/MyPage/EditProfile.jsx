// src/pages/MyPage/EditProfile.jsx 전체 코드
import React from 'react';
import styles from './EditProfile.module.css';

function EditProfile({ onBack }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>◀</button>
        <h2 className={styles.title}>계정 설정</h2>
      </div>

      <div className={styles.content}>
        {/* 고정 항목 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>이메일 주소 (변경불가)</label>
          <input type="text" className={styles.input} value="admin@dongbanin.com" readOnly />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>이름 (변경불가)</label>
          <input type="text" className={styles.input} value="관리자" readOnly />
        </div>

        <hr className={styles.divider} />

        {/* 변경 가능 항목 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호 변경</label>
          <input type="password" className={styles.input} placeholder="새 비밀번호 입력" />
          <input type="password" className={styles.input} style={{marginTop: '8px'}} placeholder="새 비밀번호 확인" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>휴대폰 번호 변경</label>
          <div className={styles.row}>
            <input type="text" className={styles.input} value="010-1234-5678" />
            <button className={styles.actionBtn}>변경하기</button>
          </div>
        </div>

        <button className={styles.submitBtn} onClick={() => { alert('저장되었습니다.'); onBack(); }}>
          회원정보 수정 완료
        </button>

        {/* 🌟 최하단 회원탈퇴 소형 링크 */}
        <div className={styles.leaveWrap}>
          <span className={styles.leaveBtn} onClick={() => { if(window.confirm('정말 동반인을 탈퇴하시겠습니까?')) alert('탈퇴 처리되었습니다.'); }}>
            회원탈퇴
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;