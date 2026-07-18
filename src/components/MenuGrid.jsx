import React from 'react';
import styles from './MenuGrid.module.css';
import {
  IconUtensils, IconHouse, IconPaw, IconBackpack,
  IconScissors, IconHospital, IconShopping, IconPin
} from '../components/Icon';

function MenuGrid({ onSelectCategory }) {
  const menuList = [
    { id: 1, label: '식당·카페', Icon: IconUtensils },
    { id: 4, label: '숙소', Icon: IconHouse },
    { id: 6, label: '호텔링', Icon: IconPaw },
    { id: 9, label: '유치원', Icon: IconBackpack },
    { id: 5, label: '미용실', Icon: IconScissors },
    { id: 10, label: '병원·약국', Icon: IconHospital },
    { id: 7, label: '반려용품', Icon: IconShopping },
    { id: 8, label: '기타', Icon: IconPin },
  ];

  return (
    <div className={styles.menuGridContainer}>
      <div className={styles.menuGrid}>
        {menuList.map((menu) => (
          <div key={menu.id} className={styles.menuCard} onClick={() => onSelectCategory(menu.id)}>
            <div className={styles.menuIconBox}>
              <menu.Icon width={26} height={26} />
            </div>
            <div className={styles.menuLabel}>{menu.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuGrid;
