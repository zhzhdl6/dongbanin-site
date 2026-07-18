import React, { useState } from 'react';
import styles from './BottomNav.module.css';
import { IconGrid, IconMap, IconHome, IconHeart, IconUser } from '../../components/Icon';

function BottomNav({ onGoHome, onGoWishlist, onGoMyPage }) {
  const [activeTab, setActiveTab] = useState('홈');

  const navItems = [
    { id: 'category', label: '카테고리', Icon: IconGrid },
    { id: 'map', label: '지도', Icon: IconMap },
    { id: 'home', label: '홈', Icon: IconHome },
    { id: 'wish', label: '찜', Icon: IconHeart },
    { id: 'my', label: '마이', Icon: IconUser },
  ];

  return (
    <div className={styles.navContainer}>
      <div className={styles.navInner}>
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <div
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(item.label);
                if (item.id === 'home' && onGoHome) onGoHome();
                if (item.id === 'wish' && onGoWishlist) onGoWishlist();
                if (item.id === 'my' && onGoMyPage) onGoMyPage();
              }}
            >
              <div className={styles.iconBox}>
                <item.Icon width={22} height={22} />
              </div>
              <div className={styles.label}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
