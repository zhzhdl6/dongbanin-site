// src/pages/MyPage/MyPage.jsx
import React from 'react';
import styles from './MyPage.module.css';
import {
  IconHeart, IconEye, IconChat, IconBell, IconQuestion,
  IconBriefcase, IconUser, IconChevronRight, IconLogout
} from '../../components/Icon';

function MyPage({ onGoWishlist, onGoEditProfile, onGoEditNickname, onLogout, userType = '일반 회원' }) {
  const MenuItem = ({ Icon, label, onClick }) => (
    <div className={styles.menuItem} onClick={onClick}>
      <span className={styles.menuItemLeft}><Icon width={20} height={20} /> {label}</span>
      <span className={styles.menuItemArrow}><IconChevronRight width={16} height={16} /></span>
    </div>
  );

  return (
    <div className={styles.myPageContainer}>

      {/* 프로필 섹션 */}
      <div className={styles.profileBox}>
        <div className={styles.profileImagePlaceholder}></div>

        <div className={styles.profileTextGroup}>
          <span className={styles.userLabel}>{userType}</span>
          <div className={styles.nameLine} onClick={onGoEditNickname}>
            <h3 className={styles.userName}>관리자</h3>
            <span className={styles.arrowIcon}><IconChevronRight width={16} height={16} /></span>
          </div>
        </div>

        <div className={styles.accountSettingWrap} onClick={onGoEditProfile}>
          <span className={styles.accountSettingBtn}><IconUser width={14} height={14} /> 계정설정</span>
        </div>
      </div>

      {/* 메뉴 그룹 1: 활동 관련 */}
      <div className={styles.menuGroup}>
        <MenuItem Icon={IconHeart} label="내가 찜한 곳" onClick={onGoWishlist} />
        <MenuItem Icon={IconEye} label="최근 본 게시물" />
        <MenuItem Icon={IconChat} label="내가 쓴 댓글" />
      </div>

      <hr className={styles.groupDivider} />

      {/* 메뉴 그룹 2: 고객센터 및 설정 */}
      <div className={styles.menuGroup}>
        <MenuItem Icon={IconBell} label="공지사항" />
        <MenuItem Icon={IconQuestion} label="자주 묻는 질문" />
        <MenuItem Icon={IconBriefcase} label="비즈니스 설정" />
      </div>

      {/* 로그아웃 버튼 */}
      <button className={styles.logoutBtn} onClick={onLogout}>
        <IconLogout width={16} height={16} /> 로그아웃
      </button>
    </div>
  );
}

export default MyPage;
