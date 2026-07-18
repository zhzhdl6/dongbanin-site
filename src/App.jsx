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
import FindAccount from './pages/FindAccount/FindAccount';
import Register from './pages/Register/Register';
import MyPage from './pages/MyPage/MyPage';
import AuthGuard from './pages/AuthGuard/AuthGuard';
import EditProfile from './pages/MyPage/EditProfile';
import EditNickname from './pages/MyPage/EditNickname';
import BusinessDashboard from './pages/BusinessDashboard/BusinessDashboard';

import 'swiper/css';

function App() {
  const [viewMode, setViewMode] = useState('main');
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('general'); // 🌟 'general' | 'business'
  const [companyName, setCompanyName] = useState(''); // 🌟 사업자 회원 회사명

  // 화면 전환 함수들
  const handleSelectCategory = (id) => { setSelectedCategoryId(id); setViewMode('list'); window.scrollTo(0, 0); };
  const handleSelectPlace = (id) => { setSelectedPlaceId(id); setViewMode('detail'); window.scrollTo(0, 0); };
  const handleGoHome = () => { setViewMode('main'); window.scrollTo(0, 0); };
  const handleGoWishlist = () => { setViewMode('wish'); window.scrollTo(0, 0); };
  const handleGoLogin = () => { setViewMode('login'); window.scrollTo(0, 0); };
  const handleGoRegister = () => { setViewMode('register'); window.scrollTo(0, 0); };
  const handleGoFindAccount = () => { setViewMode('findAccount'); window.scrollTo(0, 0); };

  // 🌟 로그인 성공 시 역할에 따라 대시보드 분기
  const handleLoginSuccess = (role = 'general') => {
    setIsLoggedIn(true);
    setUserRole(role);
    if (role === 'business') {
      setCompanyName('(주)동반인');
      setViewMode('businessDashboard');
    } else {
      setViewMode('main');
    }
    window.scrollTo(0, 0);
  };

  // 🌟 로그아웃 처리
  const handleLogout = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    setIsLoggedIn(false);
    setUserRole('general');
    setCompanyName('');
    setViewMode('main');
    window.scrollTo(0, 0);
  };

  // 🌟 마이페이지 진입 시 역할에 따라 분기
  const handleGoMyPage = () => {
    if (userRole === 'business') {
      setViewMode('businessDashboard');
    } else {
      setViewMode('mypage');
    }
    window.scrollTo(0, 0);
  };

  const userTypeLabel = userRole === 'business' ? '사업자 회원' : '일반 회원';

  // 헤더/하단네비 숨김 여부
  const hideChrome = ['login', 'findAccount', 'register', 'editProfile', 'editNickname'].includes(viewMode);

  return (
    <div>
      {!hideChrome && <Header onGoHome={handleGoHome} />}

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
            userType={userTypeLabel}
            onGoWishlist={() => setViewMode('wish')}
            onGoEditProfile={() => setViewMode('editProfile')}
            onGoEditNickname={() => setViewMode('editNickname')}
            onLogout={handleLogout}
          />
        </AuthGuard>
      ) : viewMode === 'businessDashboard' ? (
        <AuthGuard isLoggedIn={isLoggedIn} onGoLogin={handleGoLogin}>
          <BusinessDashboard onLogout={handleLogout} companyName={companyName} />
        </AuthGuard>
      ) : viewMode === 'editProfile' ? (
        <EditProfile onBack={() => setViewMode('mypage')} />
      ) : viewMode === 'editNickname' ? (
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

      {!hideChrome && (
        <>
          <Footer />
          <BottomNav
            onGoHome={() => setViewMode('main')}
            onGoWishlist={() => setViewMode('wish')}
            onGoMyPage={handleGoMyPage}
          />
          <div style={{ height: '60px' }} className="mobile-only-space" />
        </>
      )}
    </div>
  );
}

export default App;
