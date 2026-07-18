import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './MainBanner.module.css';

function MainBanner() {
  const originalBanners = [
    { id: 1, badge: 'OPEN EVENT', title: '동반인 첫 가입시\n전체 미용/식당 10% 쿠폰팩', icon: '🎁', bg: 'linear-gradient(135deg, #FF8A3D 0%, #FFB074 100%)' },
    { id: 2, badge: '쇼핑 추천', title: '쿠팡 인기 반려용품\n최저가 라인업 보러가기', icon: '🐶', bg: 'linear-gradient(135deg, #3B82F6 0%, #86B1F9 100%)' },
    { id: 3, badge: '산책 가이드', title: '이번 주말 아이와 함께\n달리기 좋은 운동장 BEST 5', icon: '🌳', bg: 'linear-gradient(135deg, #2FBB86 0%, #76DCB6 100%)' }
  ];

  const bannerList = [...originalBanners, ...originalBanners, ...originalBanners];

  const [bannerIdx, setBannerIdx] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const swiperRef = useRef(null);

  const togglePlay = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.bannerContainer}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={400}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setBannerIdx((swiper.realIndex % originalBanners.length) + 1)}
        centeredSlides={true}
        slidesPerView={'auto'}
        watchSlidesProgress={true}
      >
        {bannerList.map((banner, index) => (
          <SwiperSlide key={index} className={styles.swiperSlideCustom}>
            <div className={styles.bannerWrapper} style={{ background: banner.bg }}>
              <div className={styles.bannerTextBox}>
                <span className={styles.bannerBadge}>{banner.badge}</span>
                <h2 className={styles.bannerTitle}>
                  {banner.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                </h2>
              </div>
              <div className={styles.bannerGraphic}>{banner.icon}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.bannerControls}>
        <button className={styles.bannerPlayBtn} onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <div className={styles.bannerCounter}>
          {String(bannerIdx).padStart(2, '0')} / {String(originalBanners.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

export default MainBanner;