import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './ThemeSelection.module.css';
import { IconDog, IconCat, IconCup, IconUmbrella } from '../components/Icon';

function ThemeSelection() {
  const originalThemes = [
    { id: 1, name: '초대형견 OK!\n프리미엄 숙소', desc: '40kg 몸짱 댕댕이도 대환영', Icon: IconDog, color: '#E3DAFF' },
    { id: 2, name: '반려묘 동반\n캣캉스 추천 카페', desc: '집사와 냥이 모두 행복한 쉼터', Icon: IconCat, color: '#C9E9FF' },
    { id: 3, name: '댕댕이와 한잔\n심야 애견 포차', desc: '늦은 밤에도 걱정 없는 아지트', Icon: IconCup, color: '#FCD8E3' },
    { id: 4, name: '비와도 달린다!\n대형 실내 운동장', desc: '날씨 구애 없는 오프리시 공간', Icon: IconUmbrella, color: '#FFF5C3' }
  ];

  const themeList = [...originalThemes, ...originalThemes, ...originalThemes];

  return (
    <div className={styles.themeContainer}>
      <div className={styles.themeTitleWrapper}>
        <h3 className={styles.themeTitle}>다양한 동반 테마</h3>
      </div>
      
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
        {themeList.map((theme, index) => (
          <SwiperSlide key={index} className={styles.swiperSlideCustom}>
            <div className={styles.themeCard}>
              <div className={styles.themeBgImage} style={{ backgroundColor: theme.color }}>
                <theme.Icon width={44} height={44} />
              </div>
              <div className={styles.themeGradientOverlay}></div>
              
              <div className={styles.themeInfoBox}>
                <h4 className={styles.themeName}>
                  {theme.name.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                </h4>
                <p className={styles.themeDesc}>{theme.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.themeBtnWrapper}>
        <button className={styles.themeMoreLinkBtn}>
          동반인 테마 전체보기
        </button>
      </div>
    </div>
  );
}

export default ThemeSelection;
