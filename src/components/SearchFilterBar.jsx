import React from 'react';
import styles from './SearchFilterBar.module.css';
import { IconPin, IconArrowRight, IconMap } from '../components/Icon';

function SearchFilterBar() {
  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterBarInner}>
        <button className={styles.locationBtn} onClick={() => console.log('지역선택 팝업 오픈')}>
          <span className={styles.pinIcon}><IconPin width={16} height={16} /></span>
          <span className={styles.btnText}>지역선택</span>
          <span className={styles.arrowIcon}><IconArrowRight width={14} height={14} /></span>
        </button>

        <button className={styles.mapBtn} onClick={() => console.log('지도화면으로 이동')}>
          <span className={styles.mapIcon}><IconMap width={18} height={18} /></span>
          <span className={styles.mapText}>지도보기</span>
        </button>
      </div>
    </div>
  );
}

export default SearchFilterBar;
