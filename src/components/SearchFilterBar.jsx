// src/components/SearchFilterBar.jsx
import React from 'react';
import styles from './SearchFilterBar.module.css';

function SearchFilterBar() {
  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterBarInner}>
        
        {/* 왼쪽: 지역선택 버튼 (시원하게 한눈에 들어오는 가로형 바) */}
        <button className={styles.locationBtn} onClick={() => console.log('지역선택 팝업 오픈')}>
          <span className={styles.pinIcon}>📍</span>
          <span className={styles.btnText}>지역선택</span>
          <span className={styles.arrowIcon}>＞</span>
        </button>

        {/* 오른쪽: 지도보기 버튼 (정사각형 타입의 컴팩트 핏) */}
        <button className={styles.mapBtn} onClick={() => console.log('지도화면으로 이동')}>
          {/* 이미지의 화살표와 매칭되는 깔끔한 SVG 아이콘 */}
          <svg className={styles.mapIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22l10-4 10 4z" />
          </svg>
          <span className={styles.mapText}>지도보기</span>
        </button>

      </div>
    </div>
  );
}

export default SearchFilterBar;