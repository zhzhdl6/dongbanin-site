// src/App.jsx
import React, { useState } from 'react';

import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import BottomNav from './layouts/BottomNav/BottomNav';

import MenuGrid from './components/MenuGrid';
import MainBanner from './components/MainBanner';
import RecommendPlaces from './components/RecommendPlaces';
import MiddleLink from './components/MiddleLink';
import ThemeSelection from './components/ThemeSelection';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail';

import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Login/Login';
import FindAccount from './pages/FindAccount/FindAccount'; // 🌟 1. 파일 불러오기
import Register from './pages/Register/Register';
import MyPage from './pages/MyPage/MyPage';
import AuthGuard from './pages/AuthGuard/AuthGuard'; // 🌟 AuthGuard 컴포넌트 추가
import EditProfile from './pages/MyPage/EditProfile';
import EditNickname from './pages/MyPage/EditNickname';

import 'swiper/css';

function App() {
  const [viewMode, setViewMode] = useState('main');
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 화면 전환 함수들
  const handleSelectCategory = (id) => { setSelectedCategoryId(id); setViewMode('list'); window.scrollTo(0, 0); };
  const handleSelectPlace = (id) => { setSelectedPlaceId(id); setViewMode('detail'); window.scrollTo(0, 0); };
  const handleGoHome = () => { setViewMode('main'); window.scrollTo(0, 0); };
  const handleGoWishlist = () => { setViewMode('wish'); window.scrollTo(0, 0); };
  const handleGoLogin = () => { setViewMode('login'); window.scrollTo(0, 0); };
  const handleLoginSuccess = () => { setIsLoggedIn(true); setViewMode('main'); window.scrollTo(0, 0); };
  const handleGoRegister = () => { setViewMode('register'); window.scrollTo(0, 0); };
  const handleGoFindAccount = () => { setViewMode('findAccount'); window.scrollTo(0, 0); };

  return (
    <div>
      {/* 상단 헤더 (로그인, 찾기, 회원가입, 계정설정, 닉네임변경 화면에서는 숨김) */}
      {!['login', 'findAccount', 'register', 'editProfile', 'editNickname'].includes(viewMode) && (
        <Header onGoHome={handleGoHome} />
      )}

      {/* 화면 라우팅 분기 처리 */}
      {viewMode === 'main' ? (
        <>
          <MenuGrid onSelectCategory={handleSelectCategory} />
          <MainBanner />
          <RecommendPlaces />
          <MiddleLink />
          <ThemeSelection />
        </>
      ) : viewMode === 'list' ? (
        <PlaceList categoryId={selectedCategoryId} onSelectPlace={handleSelectPlace} onChangeCategory={handleSelectCategory} />
      ) : viewMode === 'wish' ? (
        <AuthGuard isLoggedIn={isLoggedIn} onGoLogin={handleGoLogin}>
          <Wishlist onSelectPlace={handleSelectPlace} />
        </AuthGuard>
      ) : viewMode === 'mypage' ? ( 
        <AuthGuard isLoggedIn={isLoggedIn} onGoLogin={handleGoLogin}>
          <MyPage 
            onGoWishlist={() => setViewMode('wish')}
            onGoEditProfile={() => setViewMode('editProfile')}     // 🌟 계정설정 페이지 점프 함수 연동
            onGoEditNickname={() => setViewMode('editNickname')}   // 🌟 닉네임변경 페이지 점프 함수 연동
          />
        </AuthGuard>
      ) : viewMode === 'editProfile' ? ( 
        /* 🌟 계정 설정 페이지 렌더링 */
        <EditProfile onBack={() => setViewMode('mypage')} />
      ) : viewMode === 'editNickname' ? ( 
        /* 🌟 닉네임 변경 페이지 렌더링 */
        <EditNickname onBack={() => setViewMode('mypage')} />
      ) : viewMode === 'login' ? (
        <Login onLoginSuccess={handleLoginSuccess} onBack={handleGoHome} onGoFindAccount={handleGoFindAccount} onGoRegister={handleGoRegister} />
      ) : viewMode === 'findAccount' ? (
        <FindAccount onBack={() => setViewMode('login')} onGoHome={handleGoHome} />
      ) : viewMode === 'register' ? ( 
        <Register onBack={() => setViewMode('login')} onComplete={handleLoginSuccess} />
      ) : (
        <PlaceDetail placeId={selectedPlaceId} onBack={() => setViewMode('list')} />
      )}

      {/* 하단 네비게이션 및 푸터 여백 제어 (인증 화면 및 설정 세부 화면에서는 제외) */}
      {!['login', 'findAccount', 'register', 'editProfile', 'editNickname'].includes(viewMode) && (
        <>
          <Footer />
          <BottomNav 
            onGoHome={() => setViewMode('main')} 
            onGoWishlist={() => setViewMode('wish')} 
            onGoMyPage={() => setViewMode('mypage')} 
          />
          <div style={{ height: '60px' }} className="mobile-only-space" />
        </>
      )}
    </div>
  );
}

export default App;