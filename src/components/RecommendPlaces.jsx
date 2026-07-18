import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './RecommendPlaces.module.css';

function RecommendPlaces() {
  const originalPlaces = [
    { id: 1, tag: '식당·카페', name: '[의정부] 숲속댕댕 정원 카페', desc: '천연 잔디 가득하고 수제 간식이 맛있는 곳! 대표님이 직접 다녀와서 강추하는 포토존 명소.', emoji: '☕', color: '#FFD1A9' },
    { id: 2, tag: '운동장·산책', name: '[양주] 하늘달리기 애견 운동장', desc: '오프리시로 마음껏 뛰어놀 수 있는 초대형 잔디 운동장. 주말 스트레스 날리기에 제격!', emoji: '🐕', color: '#A9F1D5' },
    { id: 3, tag: '숙소·펜션', name: '[가평] 댕댕힐링 풀빌라 독채', desc: '개별 수영장 and 반려견 전용 스파 시설 완비! 이번 여름 휴가는 무조건 여기로 떠나보세요.', emoji: '🏡', color: '#A9D6F1' }
  ];

  const placeList = [...originalPlaces, ...originalPlaces, ...originalPlaces];

  return (
    <div className={styles.recommendContainer}>
      <h3 className={styles.recommendTitle}>동반인에서 추천하는 장소 BEST</h3>
      
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        centeredSlides={true}
        slidesPerView={'auto'}
        watchSlidesProgress={true}
        breakpoints={{
          768: { slidesPerView: 3, centeredSlides: false, loop: false }
        }}
      >
        {placeList.map((place, index) => (
          <SwiperSlide key={index} className={styles.swiperSlideCustom}>
            <div className={styles.recommendCard}>
              <div className={styles.cardBgImage} style={{ backgroundColor: place.color }}>
                {place.emoji}
              </div>
              <div className={styles.cardGradientOverlay}></div>
              <div className={styles.cardInfoBox}>
                <span className={styles.cardTag}>{place.tag}</span>
                <h4 className={styles.cardName}>{place.name}</h4>
                <p className={styles.cardDesc}>{place.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecommendPlaces;