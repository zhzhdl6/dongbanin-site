import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  // 나중에 관리자 페이지나 DB에서 회사 정보가 바뀌면 이 객체만 업데이트하면 자동으로 반영됩니다.
  const companyInfo = {
    companyName: '(주)동반인',
    ceo: '홍길동',
    businessNumber: '123-45-67890',
    mailOrderNumber: '제 2026-경기의정부-0000호',
    address: '경기도 의정부시 의정부동 동반인 빌딩 4층',
    customerService: '1588-0000',
    email: 'help@dongbanin.com',
    hours: '평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 주말·공휴일 휴무)'
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInner}>
        
        {/* 상단 층: 이용약관 및 정책 바로가기 링크 */}
        <div className={styles.footerNav}>
          <span className={styles.navLink} onClick={() => console.log('서비스 이용약관')}>서비스 이용약관</span>
          <span className={styles.divider}>|</span>
          <span className={`${styles.navLink} ${styles.bold}`} onClick={() => console.log('개인정보처리방침')}>개인정보처리방침</span>
          <span className={styles.divider}>|</span>
          <span className={styles.navLink} onClick={() => console.log('고객센터')}>고객센터</span>
        </div>

        {/* 중간 층: 사업자 정보 기술 구역 */}
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <span>{companyInfo.companyName}</span>
            <span className={styles.divider}>|</span>
            <span>대표자: {companyInfo.ceo}</span>
            <span className={styles.divider}>|</span>
            <span>사업자등록번호: {companyInfo.businessNumber}</span>
          </div>
          <div className={styles.infoRow}>
            <span>통신판매업신고: {companyInfo.mailOrderNumber}</span>
            <span className={styles.divider}>|</span>
            <span>주소: {companyInfo.address}</span>
          </div>
          <div className={styles.infoRow}>
            <span>이메일: {companyInfo.email}</span>
          </div>
        </div>

        {/* 하단 층: 고객센터 안내 및 카피라이트 */}
        <div className={styles.csSection}>
          <h5 className={styles.csTitle}>고객센터 {companyInfo.customerService}</h5>
          <p className={styles.csHours}>{companyInfo.hours}</p>
        </div>

        <p className={styles.copyright}>
          © 2026 dongbanin Co., Ltd. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;