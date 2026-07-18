// src/pages/MyPage/MyPage.jsx
import React from 'react';
import styles from './MyPage.module.css';

function MyPage({ onGoWishlist, onGoEditProfile, onGoEditNickname, onLogout, userType = '일반 회원' }) {
  return (
    <div className={styles.myPageContainer}>

      {/* 프로필 섹션 */}
      <div className={styles.profileBox}>
        <div className={styles.profileImagePlaceholder}></div>

        <div className={styles.profileTextGroup}>
          <span className={styles.userLabel}>{userType}</span>
          <div className={styles.nameLine} onClick={onGoEditNickname}>
            <h3 className={styles.userName}>관리자</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
              <path fill="currentColor" d="M9.884 4.116a1.25 1.25 0 1 0-1.768 1.768L14.232 12l-6.116 6.116a1.25 1.25 0 1 0 1.768 1.768l7-7a1.25 1.25 0 0 0 0-1.768z"></path>
            </svg>
          </div>
        </div>

        <div className={styles.accountSettingWrap} onClick={onGoEditProfile}>
          <span className={styles.accountSettingBtn}>계정설정</span>
        </div>
      </div>

      {/* 메뉴 그룹 1: 활동 관련 */}
      <div className={styles.menuGroup}>
        <div className={styles.menuItem} onClick={onGoWishlist}>
          <span>❤️ 내가 찜한 곳</span>
          <span>&gt;</span>
        </div>
        <div className={styles.menuItem}>
          <span>👀 최근 본 게시물</span>
          <span>&gt;</span>
        </div>
        <div className={styles.menuItem}>
          <span>💬 내가 쓴 댓글</span>
          <span>&gt;</span>
        </div>
      </div>

      <hr className={styles.groupDivider} />

      {/* 메뉴 그룹 2: 고객센터 및 설정 */}
      <div className={styles.menuGroup}>
        <div className={styles.menuItem}>
          <span>📢 공지사항</span>
          <span>&gt;</span>
        </div>
        <div className={styles.menuItem}>
          <span>❓ 자주 묻는 질문</span>
          <span>&gt;</span>
        </div>
        <div className={styles.menuItem}>
          <span>💼 비즈니스설정</span>
          <span>&gt;</span>
        </div>
      </div>

      {/* 🌟 로그아웃 버튼 - onLogout 연동 */}
      <button className={styles.logoutBtn} onClick={onLogout}>로그아웃</button>
    </div>
  );
}

export default MyPage;
