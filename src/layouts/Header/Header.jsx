import React from 'react';
import styles from './Header.module.css';
import { IconSearch, IconUser, IconHeart, IconClock } from '../../components/Icon';

function Header({ onGoHome }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInner} style={{ paddingBottom: '16px' }}>
        <div className={styles.topRow} style={{ margin: 0 }}>
          <div className={styles.logo} onClick={onGoHome} style={{ cursor: 'pointer' }}>동반인</div>
          <div className={styles.searchWrapper}>
            <input className={styles.searchBar} placeholder="어디로 놀러가볼까?" />
            <span className={styles.searchIcon}><IconSearch width={18} height={18} /></span>
          </div>
          <div className={styles.userMenuGroup}>
            <div className={styles.userMenuItem}><IconUser width={16} height={16} /> 마이동반</div>
            <div className={styles.userMenuItem}><IconHeart width={16} height={16} /> 찜한곳</div>
            <div className={styles.userMenuItem}><IconClock width={16} height={16} /> 최근 본 장소</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
