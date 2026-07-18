import React, { useState } from 'react';
import styles from './Wishlist.module.css';
import {
  IconUtensils, IconHouse, IconPaw, IconBackpack,
  IconScissors, IconHospital, IconShopping, IconPin,
  IconCup, IconDog, IconCat, IconBed
} from '../../components/Icon';

const mockWishlist = [
  { id: 201, categoryId: 1, type: '카페', pets: '둘다', name: '숲속댕냥 정원 카페', tags: ['실내 운동장', '주차'], reqs: ['캐리어 필수'], imgBg: '#FFD1A9', Icon: IconCup },
  { id: 203, categoryId: 1, type: '카페', pets: '반려묘', name: '묘생낙원 캣캉스 라운지', tags: ['반려동물존'], reqs: ['유모차 필수'], imgBg: '#C9E9FF', Icon: IconCat },
  { id: 205, categoryId: 4, type: '펜션', pets: '반려견', name: '포근 댕댕 풀빌라', tags: ['수영장', '바베큐'], reqs: ['대형견 불가'], imgBg: '#E2CBF7', Icon: IconBed }
];

function Wishlist({ isLoggedIn, onSelectPlace, onGoLogin }) {
  const [localCategoryId, setLocalCategoryId] = useState(1);

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

  const filteredPlaces = mockWishlist.filter(p => p.categoryId === localCategoryId);

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.staticMenuContainer}>
        <div className={styles.menuGridMesh}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.menuGridItemCard} ${localCategoryId === item.id ? styles.activeGridCard : ''}`}
              onClick={() => setLocalCategoryId(item.id)}
            >
              <div className={styles.menuItemEmojiCircle}><item.Icon width={22} height={22} /></div>
              <span className={styles.menuItemLabelText}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contentBody}>
        {filteredPlaces.length === 0 ? (
          <div className={styles.emptyBox}>
            <div className={styles.emptyEmoji}>텅</div>
            <p className={styles.emptyText}>찜 한 플레이스가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {filteredPlaces.map((place) => (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
