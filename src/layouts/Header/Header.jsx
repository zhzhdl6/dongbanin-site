import React from 'react';
import styles from './Header.module.css';

// 🌟 App.jsx에서 넘겨줄 onGoHome 함수를 받습니다.
function Header({ onGoHome }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInner} style={{ paddingBottom: '16px' }}>
        <div className={styles.topRow} style={{ margin: 0 }}>
          {/* 🌟 로고에 onClick 이벤트와 마우스 포인터를 추가했습니다. */}
          <div className={styles.logo} onClick={onGoHome} style={{ cursor: 'pointer' }}>동반인</div>
          <div className={styles.searchWrapper}>
            <input className={styles.searchBar} placeholder="어디로 놀러가볼까?" />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <div className={styles.userMenuGroup}>
            <div className={styles.userMenuItem}>👤 마이동반</div>
            <div className={styles.userMenuItem}>🤍 찜한곳</div>
            <div className={styles.userMenuItem}>🕒 최근 본 장소</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;