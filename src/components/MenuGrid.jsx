// src/components/MenuGrid.jsx
import React from 'react';
import styles from './MenuGrid.module.css';

function MenuGrid({ onSelectCategory }) {
  // 🌟 [대표님 기획 반영] 운동장·산책 삭제 완료! 정확히 7개 메뉴로 리밸런싱
  const menuList = [
    { id: 1, label: '식당·카페', icon: '🍴' },
    { id: 4, label: '숙소', icon: '🏡' },
    { id: 6, label: '호텔링', icon: '🐾' }, 
    { id: 9, label: '유치원', icon: '🎒' }, 
    { id: 5, label: '미용실', icon: '✂️' },
    { id: 10, label: '병원·약국', icon: '🏥' }, 
    { id: 7, label: '반려용품', icon: '🛍️' },
    { id: 8, label: '기타', icon: '📍' }  
  ];

  return (
    <div className={styles.menuGridContainer}>
      <div className={styles.menuGrid}>
        {menuList.map((menu) => (
          <div key={menu.id} className={styles.menuCard} onClick={() => onSelectCategory(menu.id)}>
            <div className={styles.menuIconBox}>{menu.icon}</div>
            <div className={styles.menuLabel}>{menu.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuGrid;