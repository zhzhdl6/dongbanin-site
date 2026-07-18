// src/components/PlaceList.jsx
import React, { useState } from 'react';
import styles from './PlaceList.module.css';
import { CATEGORY_MASTER } from '../data/categoryData';
import SearchFilterBar from './SearchFilterBar';

// 상단 데이터 배열 및 mockPlaces 원본 그대로 유지
const mockPlaces = [
  { 
    id: 201, 
    categoryId: 1, 
    type: '카페', 
    pets: '둘다', 
    name: '숲속댕냥 정원 카페', 
    tags: ['실내 운동장', '야외 운동장', '주차'], 
    reqs: ['캐리어/유모차 필수'], 
    imgBg: '#FFD1A9', 
    emoji: '☕' 
  },
  { 
    id: 202, 
    categoryId: 1, 
    type: '식당', 
    pets: '반려견', 
    name: '댕댕브런치 다이닝 룸', 
    tags: ['개별 룸', '주차', '펫푸드'], 
    reqs: ['하네스 착용'], 
    imgBg: '#A9F1D5', 
    emoji: '🥞' 
  },
  { 
    id: 203, 
    categoryId: 1, 
    type: '카페', 
    pets: '반려묘', 
    name: '묘생낙원 캣캉스 라운지', 
    tags: ['반려동물존', '개별 룸'], 
    reqs: ['캐리어/유모차 필수'], 
    imgBg: '#C9E9FF', 
    emoji: '🐈' 
  },
  { 
    id: 204, 
    categoryId: 1, 
    type: '식당', 
    pets: '둘다', 
    name: '바베큐 댕냥 가든', 
    tags: ['야외 운동장', '수영장', '주차'], 
    reqs: ['기저귀 착용', '대형견 가능'], 
    imgBg: '#FFF5C3', 
    emoji: '🍖' 
  }
];

// 🌟 App.jsx의 스펙과 100% 일치하도록 매칭 (인자 구조 절대 보존)
function PlaceList({ categoryId, onSelectPlace, onChangeCategory, setCategoryId }) {
  const categoryInfo = CATEGORY_MASTER[categoryId] || { name: '조회', subTypes: ['전체'] };
  
  const [selectedPet, setSelectedPet] = useState('전체');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // 🌟 [이식] 카테고리 메뉴판 오픈 제어용 상태 추가
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🌟 [이식] 메인에 있던 8개 카테고리 마스터 맵핑 데이터 세트
  const menuItems = [
    { id: 1, label: '식당·카페', emoji: '🍴' },
    { id: 4, label: '숙소', emoji: '🏡' },
    { id: 6, label: '호텔링', emoji: '🐾' }, 
    { id: 9, label: '유치원', emoji: '🎒' }, 
    { id: 5, label: '미용실', emoji: '✂️' },
    { id: 10, label: '병원·약국', emoji: '🏥' }, 
    { id: 7, label: '반려용품', emoji: '🛍️' },
    { id: 8, label: '기타', emoji: '📍' } ,
  ];

  // 🌟 [이식] 드롭다운에서 클릭 시 부모 컴포넌트(App.jsx)의 상태를 직접 전환시키는 핸들러
  const handleMenuClick = (targetId) => {
    setIsMenuOpen(false); 
    if (onChangeCategory) onChangeCategory(targetId);
    if (setCategoryId) setCategoryId(targetId);
  };

  // API 분기 리턴문 원본 코드 형태 100% 유지
  if (categoryId === 4) {
    return (
      <div className={styles.centerContainer}>
        {/* 🌟 숙소 화면에서도 드롭다운 점프가 가능하도록 상단에 토글 헤더 부착 */}
        <div className={styles.listHeader}>
          <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
            <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}>▼</span>
          </div>
          {isMenuOpen && renderMenuGrid()}
        </div>
        {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}
        
        <h3>🏡 숙소 검색</h3>
        <p className={styles.apiBadge}>야놀자 API 연동 구역</p>
        <p className={styles.desc}>지도 및 지역별 실시간 숙소/풀빌라 리스트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (categoryId === 7) {
    return (
      <div className={styles.centerContainer}>
        {/* 🌟 반려용품 화면에서도 드롭다운 점프가 가능하도록 상단에 토글 헤더 부착 */}
        <div className={styles.listHeader}>
          <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
            <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}>▼</span>
          </div>
          {isMenuOpen && renderMenuGrid()}
        </div>
        {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}

        <h3>🛍️ 반려용품 쇼핑</h3>
        <p className={styles.apiBadgeCoupang}>쿠팡 API 연동 구역</p>
        <p className={styles.desc}>우리 아이 맞춤 간식/사료/장난감 최저가 라인업 연동 중...</p>
      </div>
    );
  }

  // 해시태그 온/오프 토글 함수 원본 그대로 유지
  const handleToggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // 🌟 [이식] 카테고리 드롭다운 마크업 생성기
  function renderMenuGrid() {
    return (
      <div className={styles.dropdownMenuGridContainer}>
        <div className={styles.menuGridMesh}>
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.menuGridItemCard} ${categoryId === item.id ? styles.activeGridCard : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <div className={styles.menuItemEmojiCircle}>{item.emoji}</div>
              <span className={styles.menuItemLabelText}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredPlaces = mockPlaces.filter(p => p.categoryId === categoryId);

  return (
    <div className={styles.listContainer}>
      
      {/* 🌟 [이식 구역 ①] 타이틀 우측에 화살표 장착 및 클릭 시 메뉴 토글 연동 */}
      <div className={styles.listHeader}>
        <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
          <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}>▼</span>
        </div>
        
        {/* 🌟 [이식 구역 ②] 토글 온 상태일 때 메인 페이지 스타일의 카테고리 그리드 노출 */}
        {isMenuOpen && renderMenuGrid()}
      </div>

      {/* 바깥 레이어 클릭 시 메뉴가 부드럽게 닫히는 차단막 */}
      {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}

      <SearchFilterBar />

      {/* 대상동물 3등분 필터 바 원본 유지 */}
      {categoryInfo.petTypes && (
        <div className={styles.petFilterRow}>
          {['전체', '반려견', '반려묘'].map((pet) => (
            <button 
              key={pet} 
              className={`${styles.petFilterBtn} ${selectedPet === pet ? styles.active : ''}`}
              onClick={() => setSelectedPet(pet)}
            >
              {pet}
            </button>
          ))}
        </div>
      )}

      {/* 해시태그 목록 원본 유지 */}
      {categoryInfo.amenities && (
        <div className={styles.amenityWrapRow}>
          {categoryInfo.amenities.map((am, i) => {
            const isSelected = selectedAmenities.includes(am);
            return (
              <button
                key={i}
                className={`${styles.amenityFilterBtn} ${isSelected ? styles.activeAmenity : ''}`}
                onClick={() => handleToggleAmenity(am)}
              >
                #{am}
              </button>
            );
          })}
        </div>
      )}

      {/* 상단 필터 해제 상태 상자 원본 유지 */}
      {selectedAmenities.length > 0 && (
        <div className={styles.selectedStatusBox}>
          <div className={styles.statusList}>
            {selectedAmenities.map((am, i) => (
              <span key={i} className={styles.statusBadge} onClick={() => handleToggleAmenity(am)}>
                #{am} <span className={styles.deleteX}>×</span>
              </span>
            ))}
            <button className={styles.clearAllBtn} onClick={() => setSelectedAmenities([])}>전체 해제</button>
          </div>
        </div>
      )}

      {/* 2열 격자 레이아웃 카드 목록 구역 원본 100% 보존 */}
      <div className={styles.cardGrid}>
        {filteredPlaces.length === 0 ? (
          <p className={styles.noData}>등록된 장소가 없습니다.</p>
        ) : (
          filteredPlaces.map((place) => (
            <div key={place.id} className={styles.placeCard} onClick={() => onSelectPlace(place.id)}>
              
              <div className={styles.cardImgBox} style={{ backgroundColor: place.imgBg }}>
                <div className={styles.badgeGroup}>
                  <span className={styles.typeBadge}>{place.type}</span>
                  <span className={styles.petBadge}>{place.pets}</span>
                </div>
                <span className={styles.cardEmoji}>{place.emoji}</span>
              </div>

              <div className={styles.cardInfo}>
                <h4 className={styles.placeName}>{place.name}</h4>
                <div className={styles.placeChips}>
                  {place.tags.map((t, idx) => <span key={idx} className={styles.miniTag}>#{t}</span>)}
                </div>
                <div className={styles.placeReqs}>
                  <p className={styles.miniReq}>
                    {place.reqs.join(', ')}
                  </p>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default PlaceList;