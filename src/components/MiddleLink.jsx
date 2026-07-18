import React from 'react';
import styles from './MiddleLink.module.css';

function MiddleLink() {
  return (
    <div className={styles.midLinkContainer}>
      <div className={styles.midLinkBox}>
        <div className={styles.midLinkTextGroup}>
          <h4 className={styles.midLinkTitle}>🛍️ 최저가 반려용품 보러가기</h4>
          <p className={styles.midLinkSubtitle}>우리 아이 맞춤 간식부터 장난감까지 한눈에!</p>
        </div>
        <div className={styles.midLinkAction}>
          <span className={styles.midLinkArrow}>▶</span>
        </div>
      </div>
    </div>
  );
}

export default MiddleLink;