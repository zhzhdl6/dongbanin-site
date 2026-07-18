import React, { useState } from 'react';
import styles from './PlaceList.module.css';
import { CATEGORY_MASTER } from '../data/categoryData';
import SearchFilterBar from './SearchFilterBar';
import {
  IconUtensils, IconHouse, IconPaw, IconBackpack,
  IconScissors, IconHospital, IconShopping, IconPin,
  IconChevronDown, IconCup, IconBowl, IconDog, IconBed, IconGift
} from '../components/Icon';

const mockPlaces = [
  { id: 201, categoryId: 1, type: '카페', pets: '둘다', name: '숲속댕냥 정원 카페', tags: ['실내 운동장', '야외 운동장', '주차'], reqs: ['캐리어/유모차 필수'], imgBg: '#FFD1A9', Icon: IconCup },
  { id: 202, categoryId: 1, type: '식당', pets: '반려견', name: '댕댕브런치 다이닝 룸', tags: ['개별 룸', '주차', '펫푸드'], reqs: ['하네스 착용'], imgBg: '#A9F1D5', Icon: IconBowl },
  { id: 203, categoryId: 1, type: '카페', pets: '반려묘', name: '묘생낙원 캣캉스 라운지', tags: ['반려동물존', '개별 룸'], reqs: ['캐리어/유모차 필수'], imgBg: '#C9E9FF', Icon: IconCup },
  { id: 204, categoryId: 1, type: '식당', pets: '둘다', name: '바베큐 댕냥 가든', tags: ['야외 운동장', '수영장', '주차'], reqs: ['기저귀 착용', '대형견 가능'], imgBg: '#FFF5C3', Icon: IconBowl }
];

function PlaceList({ categoryId, onSelectPlace, onChangeCategory, setCategoryId }) {
  const categoryInfo = CATEGORY_MASTER[categoryId] || { name: '조회', subTypes: ['전체'] };
  const [selectedPet, setSelectedPet] = useState('전체');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 1, label: '식당·카페', Icon: IconUtensils },
    { id: 4, label: '숙소', Icon: IconHouse },
    { id: 6, label: '호텔링', Icon: IconPaw },
    { id: 9, label: '유치원', Icon: IconBackpack },
    { id: 5, label: '미용실', Icon: IconScissors },
    { id: 10, label: '병원·약국', Icon: IconHospital },
    { id: 7, label: '반려용품', Icon: IconShopping },
    { id: 8, label: '기타', Icon: IconPin },
  ];

  const handleMenuClick = (targetId) => {
    setIsMenuOpen(false);
    if (onChangeCategory) onChangeCategory(targetId);
    if (setCategoryId) setCategoryId(targetId);
  };

  if (categoryId === 4) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.listHeader}>
          <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
            <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}><IconChevronDown width={16} height={16} /></span>
          </div>
          {isMenuOpen && renderMenuGrid()}
        </div>
        {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}
        <h3><IconHouse width={20} height={20} style={{ verticalAlign: 'middle' }} /> 숙소 검색</h3>
        <p className={styles.apiBadge}>야놀자 API 연동 구역</p>
        <p className={styles.desc}>지도 및 지역별 실시간 숙소/풀빌라 리스트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (categoryId === 7) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.listHeader}>
          <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
            <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}><IconChevronDown width={16} height={16} /></span>
          </div>
          {isMenuOpen && renderMenuGrid()}
        </div>
        {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}
        <h3><IconShopping width={20} height={20} style={{ verticalAlign: 'middle' }} /> 반려용품 쇼핑</h3>
        <p className={styles.apiBadgeCoupang}>쿠팡 API 연동 구역</p>
        <p className={styles.desc}>우리 아이 맞춤 간식/사료/장난감 최저가 라인업 연동 중...</p>
      </div>
    );
  }

  const handleToggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

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
              <div className={styles.menuItemEmojiCircle}><item.Icon width={22} height={22} /></div>
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
      <div className={styles.listHeader}>
        <div className={styles.titleDropdownTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <h3 className={styles.categoryTitle}>{categoryInfo.name}</h3>
          <span className={`${styles.dropdownArrow} ${isMenuOpen ? styles.arrowUp : ''}`}><IconChevronDown width={16} height={16} /></span>
        </div>
        {isMenuOpen && renderMenuGrid()}
      </div>

      {isMenuOpen && <div className={styles.menuOverlayInvisible} onClick={() => setIsMenuOpen(false)} />}

      <SearchFilterBar />

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
                <span className={styles.cardEmoji}><place.Icon width={40} height={40} /></span>
              </div>
              <div className={styles.cardInfo}>
                <h4 className={styles.placeName}>{place.name}</h4>
                <div className={styles.placeChips}>
                  {place.tags.map((t, idx) => <span key={idx} className={styles.miniTag}>#{t}</span>)}
                </div>
                <div className={styles.placeReqs}>
                  <p className={styles.miniReq}>{place.reqs.join(', ')}</p>
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
