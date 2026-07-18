// src/components/PlaceDetail.jsx
import React, { useState } from 'react';
import styles from './PlaceDetail.module.css';

function PlaceDetail({ placeId, onBack }) {
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isNaviOpen, setIsNaviOpen] = useState(false);
  const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);
  
  // 어떤 리뷰 카드를 누르든 상세 내용을 띄워줄 공통 리뷰 팝업 상태값
  const [selectedReview, setSelectedReview] = useState(null);
  
  const [reviewSort, setReviewSort] = useState('latest');

  // 샘플 데이터베이스
  const placeData = {
    id: 201,
    type: '카페',
    pets: '둘다',
    name: '숲속댕냥 정원 카페',
    address: '경기 의정부시 숲속길 12',
    tel: '031-123-4567',
    rating: '4.7',
    reviewCount: '3,867',
    imgBg: '#FFD1A9',
    emoji: '☕',
    tags: ['실내 운동장', '야외 운동장', '주차'],
    reqs: ['캐리어/유모차 필수', '대형견 공간 분리', '노령동물 미끄럼 방지'],
    infoText: '안녕하세요! 동반인 대표 지기가 직접 꼼꼼히 검증하고 다녀온 숲속댕냥 정원 카페입니다. 300평 규모의 천연 잔디가 넓게 펼쳐져 있어 아이들이 목줄 없이 뛰어놀기 최적화되어 있습니다.',
    subways: ['1호선 의정부역', '의정부경전철 중앙역'],
    naviGuide: '의정부역 2번 출구에서 450m',
    sellerInfo: {
      ceo: '홍길동',
      companyName: '(주)댕냥컴퍼니',
      address: '경기도 의정부시 행복로 100',
      email: 'contact@daengnyang.com',
      bizNumber: '123-45-67890',
      mailOrderNumber: '2026-의정부-0123호'
    },
    reviews: [
      { id: 1, user: '구름이엄마', stars: '★★★★★', ratingNum: 5, tag: '추천플레이스', date: '2026.01.25', content: '너~무 저렴하게 잘다녀왔어요 맛집도 주변에 많고 인프라도 훌륭해요! 아이가 잔디에서 눈치 안 보고 너무 잘 뛰어놀아서 다음 주에 또 오려고요. 사장님도 친절하시고 최고입니다!', imgBg: '#E2E8F0', imgEmoji: '🐶' },
      { id: 2, user: '초코아빠', stars: '★★★★★', ratingNum: 5, tag: '친절해요', date: '2026.02.14', content: '수제 간식 퀄리티가 대박입니다. 공간 분리도 잘 되어 있어서 고양이 데리고 오기에도 전혀 부담 없었어요. 아이들을 위한 세심한 배려가 돋보입니다. 완전 강추합니다!', imgBg: '#CBD5E1', imgEmoji: '🐈' },
      { id: 3, user: '별이누나', stars: '★★★☆☆', ratingNum: 3, tag: '넓은주차장', date: '2026.03.02', content: '주차하기 진짜 편하고 초보운전인데도 널널하게 댔어요. 음료 맛은 평범하지만 실내 인테리어가 인스타 감성 샷 찍기 딱 좋습니다.', imgBg: '#94A3B8', imgEmoji: '📸' }
    ],
    recommendations: [
      { id: 301, name: '구름이네 루프탑 카페', type: '카페', imgBg: '#FFF5C3', emoji: '🍹', tags: ['노키즈존', '주차'] },
      { id: 302, name: '힐링 아일랜드 티 하우스', type: '카페', imgBg: '#C9E9FF', emoji: '🍵', tags: ['반려동물존'] }
    ]
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(placeData.address);
    alert('주소가 클립보드에 복사되었습니다.');
  };

  const handleNaviLink = (appType) => {
    const encodedName = encodeURIComponent(placeData.name);
    const encodedAddress = encodeURIComponent(placeData.address);
    if (appType === 'kakaoMap') window.open(`https://map.kakao.com/?q=${encodedAddress}`, '_blank');
    else if (appType === 'naverMap') window.open(`https://map.naver.com/v5/search/${encodedAddress}`, '_blank');
    else if (appType === 'tmap') window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=YOUR_KEY&name=${encodedName}`, '_blank');
    else if (appType === 'kakaoT') window.open(`https://t-map.kakao.com/`, '_blank');
    setIsNaviOpen(false);
  };

  const getSortedReviews = () => {
    if (!placeData.reviews) return [];
    const copiedReviews = [...placeData.reviews];
    if (reviewSort === 'latest') {
      return copiedReviews.sort((a, b) => new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')));
    } else if (reviewSort === 'highRating') {
      return copiedReviews.sort((a, b) => b.ratingNum - a.ratingNum || new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')));
    } else if (reviewSort === 'lowRating') {
      return copiedReviews.sort((a, b) => a.ratingNum - b.ratingNum || new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')));
    }
    return copiedReviews;
  };

  return (
    <div className={styles.detailContainer}>
      
      {/* 1:1 이미지 구역 */}
      <div className={styles.imageVisualBox} style={{ backgroundColor: placeData.imgBg }}>
        <div className={styles.badgeGroup}>
          <span className={styles.typeBadge}>{placeData.type}</span>
          <span className={styles.petBadge}>{placeData.pets}</span>
        </div>
        <span className={styles.mainEmoji}>{placeData.emoji}</span>
        <div className={styles.imageCounter}>1 / 1</div>
      </div>

      {/* 메인 정보 섹션 */}
      <div className={styles.mainInfoSection}>
        <span className={styles.subTypeLabel}>{placeData.type}</span>
        <h2 className={styles.mainTitle}>{placeData.name}</h2>
        
        <div className={styles.placeChipsZone}>
          {placeData.tags && placeData.tags.map((t, idx) => <span key={idx} className={styles.miniTag}>#{t}</span>)}
        </div>

        <div className={styles.addressRow} onClick={() => setIsNaviOpen(true)}>
          <span className={styles.pinIcon}>📍</span>
          <span className={styles.addressText}>{placeData.address}</span>
          <span className={styles.arrowIcon}>＞</span>
        </div>

        <div className={styles.ratingRow} onClick={() => setIsAllReviewsOpen(true)}>
          <span className={styles.starIcon}>★</span>
          <span className={styles.ratingText}>
            <strong>{placeData.rating}</strong> · {placeData.reviewCount}명 평가
          </span>
          <span className={styles.arrowIcon}>＞</span>
        </div>

        <div className={styles.infoBlockWarning}>
          <h4 className={styles.blockTitleWarning}>이용 전 필수 확인사항</h4>
          <ul className={styles.reqList}>
            {placeData.reqs && placeData.reqs.map((r, idx) => <li key={idx} className={styles.reqItem}>{r}</li>)}
          </ul>
        </div>

        <div className={styles.infoBlock}>
          <h4 className={styles.blockTitle}>장소 소개</h4>
          <p className={styles.infoText}>{placeData.infoText}</p>
        </div>
      </div>

      {/* 가로 스크롤 리뷰 구역 */}
      <div className={styles.reviewSectionBox}>
        <div className={styles.reviewTopBar}>
          <div className={styles.totalRatingZone}>
            <span className={styles.bigStar}>★</span>
            <span className={styles.bigRatingNum}>{placeData.rating}</span>
            <span className={styles.bigCountNum}>({placeData.reviewCount})</span>
          </div>
          <button className={styles.viewAllBtn} onClick={() => setIsAllReviewsOpen(true)}>
            전체보기 ＞
          </button>
        </div>

        <div className={styles.horizontalScrollRow}>
          {placeData.reviews && placeData.reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className={styles.reviewScrollCard} onClick={() => setSelectedReview(rev)}>
              <div className={styles.revCardTop}>
                <span className={styles.revStars}>{rev.stars}</span>
                <span className={styles.revBadge}>{rev.tag}</span>
                <span className={styles.revDate}>{rev.date}</span>
              </div>
              <div className={styles.revCardBody}>
                <p className={styles.revTextContent}>{rev.content}</p>
                <div className={styles.revMinipic} style={{ backgroundColor: rev.imgBg }}>
                  <span>{rev.imgEmoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 위치/교통 구역 (대표님 수정본 100% 동기화 - 길안내 텍스트 구역 완전 삭제) */}
      <div className={styles.mapTrafficSection}>
        <h3 className={styles.sectionMainTitle}>위치/교통</h3>
        <div className={styles.mapPreviewBoxNaver}>
          <div className={styles.naverPin}>📍</div>
          <span className={styles.mapTextPreviewNaver}>Naver Maps API</span>
        </div>
        <p className={styles.trafficAddressText}>📍 {placeData.address}</p>
        <div className={styles.btnDoubleRow}>
          <button className={styles.trafficBtn} onClick={handleCopyAddress}>주소복사</button>
          <button className={styles.trafficBtnActive} onClick={() => setIsNaviOpen(true)}>길안내</button>
        </div>
        <div className={styles.subwayGuideZone}>
          <span className={styles.subwayIcon}>🚇</span>
          <div className={styles.subwayList}>
            {placeData.subways && placeData.subways.map((sub, i) => <p key={i} className={styles.subwayName}>{sub}</p>)}
          </div>
        </div>
      </div>

      {/* 문의하기 및 판매자 정보 구역 */}
      <div className={styles.actionMenuSection}>
        <a href={`tel:${placeData.tel}`} className={styles.actionRow}>
          <span className={styles.actionLabel}>{placeData.type} 문의</span>
          <span className={styles.actionRightText}>전화하기 ＞</span>
        </a>
        <div className={styles.actionRow} onClick={() => setIsSellerOpen(true)}>
          <span className={styles.actionLabel}>판매자 정보</span>
          <span className={styles.arrowIcon}>＞</span>
        </div>
      </div>

      {/* 연관 추천 리스트 구역 */}
      <div className={styles.recommendSection}>
        <h3 className={styles.recommendMainTitle}>다른 사람이 자주 찾는 {placeData.type}</h3>
        <div className={styles.recGrid}>
          {placeData.recommendations && placeData.recommendations.map((rec) => (
            <div key={rec.id} className={styles.recCard}>
              <div className={styles.recImgBox} style={{ backgroundColor: rec.imgBg }}>
                <span className={styles.recEmoji}>{rec.emoji}</span>
              </div>
              <div className={styles.recInfoBox}>
                <h4 className={styles.recName}>{rec.name}</h4>
                <div className={styles.recChips}>
                  {rec.tags && rec.tags.map((tag, i) => <span key={i} className={styles.recMiniTag}>#{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 판매자 정보 중앙 팝업 */}
      {isSellerOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSellerOpen(false)}>
          <div className={styles.centerModalBox} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalMainTitle}>판매자 정보</h3>
            <table className={styles.sellerTable}>
              <tbody>
                <tr><th>대표자명</th><td>{placeData.sellerInfo.ceo}</td></tr>
                <tr><th>상호명</th><td>{placeData.sellerInfo.companyName}</td></tr>
                <tr><th>사업자주소</th><td>{placeData.sellerInfo.address}</td></tr>
                <tr><th>전자우편주소</th><td>{placeData.sellerInfo.email}</td></tr>
                <tr><th>연락처</th><td>{placeData.tel}</td></tr>
                <tr><th>사업자등록번호</th><td>{placeData.sellerInfo.bizNumber}</td></tr>
                <tr><th>통신판매업자<br/>신고번호</th><td>{placeData.sellerInfo.mailOrderNumber}</td></tr>
              </tbody>
            </table>
            <button className={styles.modalCloseBtn} onClick={() => setIsSellerOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 길안내 내비 선택 팝업 */}
      {isNaviOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsNaviOpen(false)}>
          <div className={styles.centerModalBox} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalMainTitle}>길안내 내비게이션 선택</h3>
            <p className={styles.modalSubDesc}>연결할 지도를 선택해 주세요.</p>
            <div className={styles.naviLinkList}>
              <button className={styles.naviLinkBtn} onClick={() => handleNaviLink('kakaoT')}>💛 카카오 T 내비</button>
              <button className={styles.naviLinkBtn} onClick={() => handleNaviLink('kakaoMap')}>💛 카카오맵</button>
              <button className={styles.naviLinkBtn} onClick={() => handleNaviLink('naverMap')}>💚 네이버 지도</button>
              <button className={styles.naviLinkBtn} onClick={() => handleNaviLink('tmap')}>💙 티맵 (TMap)</button>
            </div>
            <button className={styles.modalCloseBtn} onClick={() => setIsNaviOpen(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 전체 리뷰 목록 팝업 모달 */}
      {isAllReviewsOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsAllReviewsOpen(false)}>
          <div className={styles.centerModalBoxReviewList} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalMainTitle}>방문자 리뷰 전체보기</h3>
            <p className={styles.modalSubDesc}>총 {placeData.reviewCount}개의 생생한 평가</p>
            
            <div className={styles.reviewSortTabRow}>
              <button className={`${styles.sortTabBtn} ${reviewSort === 'latest' ? styles.activeSort : ''}`} onClick={() => setReviewSort('latest')}>최신순</button>
              <span className={styles.sortDivider}>|</span>
              <button className={`${styles.sortTabBtn} ${reviewSort === 'highRating' ? styles.activeSort : ''}`} onClick={() => setReviewSort('highRating')}>평점 높은순</button>
              <span className={styles.sortDivider}>|</span>
              <button className={`${styles.sortTabBtn} ${reviewSort === 'lowRating' ? styles.activeSort : ''}`} onClick={() => setReviewSort('lowRating')}>평점 낮은순</button>
            </div>
            
            <div className={styles.popupScrollListZone}>
              {getSortedReviews().map((rev) => (
                <div key={rev.id} className={styles.popupReviewItemRow} onClick={() => setSelectedReview(rev)}>
                  <div className={styles.popupReviewUserLine}>
                    <span className={styles.popupUserNm}>{rev.user}</span>
                    <span className={styles.popupDateText}>{rev.date}</span>
                  </div>
                  <div className={styles.popupReviewMetaLine}>
                    <span className={styles.popupStarText}>{rev.stars}</span>
                    <span className={styles.popupBadgeText}>#{rev.tag}</span>
                  </div>
                  <div className={styles.popupReviewBodyLine}>
                    <p className={styles.popupFullContentText}>{rev.content}</p>
                    <div className={styles.popupMiniImage} style={{ backgroundColor: rev.imgBg }}>
                      <span>{rev.imgEmoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.modalCloseBtn} onClick={() => setIsAllReviewsOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 리뷰 상세내용 단독 팝업창 */}
      {selectedReview && (
        <div className={styles.modalOverlay} onClick={() => setSelectedReview(null)}>
          <div className={styles.centerModalBoxReview} onClick={(e) => e.stopPropagation()}>
            <div className={styles.reviewPopupTop}>
              <span className={styles.popupUser}>{selectedReview.user}님의 리뷰</span>
              <span className={styles.popupDate}>{selectedReview.date}</span>
            </div>
            
            <div className={styles.reviewPopupMeta}>
              <span className={styles.popupStars}>{selectedReview.stars}</span>
              <span className={styles.popupBadge}>#{selectedReview.tag}</span>
            </div>

            <div className={styles.popupBigPic} style={{ backgroundColor: selectedReview.imgBg }}>
              <span>{selectedReview.imgEmoji}</span>
            </div>

            <div className={styles.popupScrollContent}>
              <p className={styles.popupContentText}>{selectedReview.content}</p>
            </div>

            <button className={styles.modalCloseBtn} onClick={() => setSelectedReview(null)}>확인</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default PlaceDetail;