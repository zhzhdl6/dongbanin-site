// src/components/BottomNav.jsx
import React, { useState } from 'react';
import styles from './BottomNav.module.css';

// 🌟 App.jsx에서 넘겨줄 onGoHome 함수를 받습니다.
function BottomNav({ onGoHome, onGoWishlist, onGoMyPage }) {
  const [activeTab, setActiveTab] = useState('홈');

  // 각 탭별로 이미지와 똑같은 형태의 선형(Line) SVG 구조를 정의합니다.
  const navItems = [
    {
      id: 'category',
      label: '카테고리',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )
    },
    {
      id: 'map',
      label: '지도',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      )
    },
    {
      id: 'home',
      label: '홈',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'wish',
      label: '찜',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      id: 'my',
      label: '마이',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
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
                console.log(`[관리자] ${item.label} 탭 전환`);
                
                // 🌟 만약 누른 버튼이 '홈'이라면 메인으로 가는 함수 실행!
                if (item.id === 'home' && onGoHome) {
                  onGoHome();
                }
                if (item.id === 'wish' && onGoWishlist) {
                  onGoWishlist();
                }
                
                if (item.id === 'my' && onGoMyPage) {
                  onGoMyPage();
                }
              }}
            >
              {/* SVG 아이콘 상자 */}
              <div className={styles.iconBox}>
                {item.svg}
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