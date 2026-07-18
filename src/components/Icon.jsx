// src/components/Icon.jsx
// 귀엽고 둥글둥글한(plump, rounded) 벡터 SVG 아이콘 라이브러리
// 모든 아이콘은 24x24 viewBox, 둥근 선(strokeLinecap/strokeLinejoin=round), 통일된 굵기 사용

import React from 'react';

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconHome = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M3.5 10.5 12 3l8.5 7.5" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  </svg>
);

export const IconMap = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
    <path d="M9 4v13" />
    <path d="M15 6.5v13" />
  </svg>
);

export const IconGrid = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </svg>
);

export const IconHeart = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M12 20.5s-7.5-4.7-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3.3c0 5.5-7.5 10.2-7.5 10.2Z" />
  </svg>
);

export const IconUser = (p) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20.5a8 8 0 0 1 16 0" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...baseProps} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4-4" />
  </svg>
);

export const IconClock = (p) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconChevronLeft = (p) => (
  <svg {...baseProps} {...p}>
    <path d="m14.5 5-6 7 6 7" />
  </svg>
);

export const IconChevronRight = (p) => (
  <svg {...baseProps} {...p}>
    <path d="m9.5 5 6 7-6 7" />
  </svg>
);

export const IconChevronDown = (p) => (
  <svg {...baseProps} {...p}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export const IconArrowRight = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M4 12h15" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

export const IconPlay = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const IconPause = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <rect x="6.5" y="5" width="4" height="14" rx="1.5" />
    <rect x="13.5" y="5" width="4" height="14" rx="1.5" />
  </svg>
);

export const IconPin = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M12 21.5s-6.5-5.8-6.5-11A6.5 6.5 0 0 1 18.5 10.5c0 5.2-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </svg>
);

export const IconStar = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </svg>
);

export const IconPhone = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M6.5 3.5h4l1.5 5-2.5 1.5a12 12 0 0 0 5 5l1.5-2.5 5 1.5v4a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const IconCopy = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="8" y="8" width="12" height="12" rx="3" />
    <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3H5.5A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8" />
  </svg>
);

export const IconSubway = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="5" y="3" width="14" height="14" rx="4" />
    <path d="M5 11h14" />
    <circle cx="8.5" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="14" r="1" fill="currentColor" stroke="none" />
    <path d="M8 17l-2 4M16 17l2 4" />
  </svg>
);

export const IconLock = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...baseProps} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconRefresh = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M19 8a8 8 0 1 0 1.5 5" />
    <path d="M19 4v4h-4" />
  </svg>
);

export const IconLogout = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
    <path d="M10 12h10" />
    <path d="m16 8 4 4-4 4" />
  </svg>
);

export const IconChart = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M4 4v16h16" />
    <rect x="7" y="11" width="3" height="6" rx="1" fill="currentColor" stroke="none" />
    <rect x="12" y="7" width="3" height="10" rx="1" fill="currentColor" stroke="none" />
    <rect x="17" y="13" width="3" height="4" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconShopping = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M5 7h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);

export const IconUtensils = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M6 3v7a2 2 0 0 0 4 0V3" />
    <path d="M8 10v11" />
    <path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9" />
  </svg>
);

export const IconHouse = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const IconPaw = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <circle cx="7" cy="9" r="2" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="17" cy="9" r="2" />
    <path d="M12 12c-3 0-5 2-5 4.5 0 2 2 3 5 3s5-1 5-3c0-2.5-2-4.5-5-4.5Z" />
  </svg>
);

export const IconBackpack = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="6" y="7" width="12" height="13" rx="4" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M9 12h6" />
    <path d="M8 20v1M16 20v1" />
  </svg>
);

export const IconScissors = (p) => (
  <svg {...baseProps} {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8 8l12 12" />
    <path d="M8 16 20 4" />
  </svg>
);

export const IconHospital = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="4" y="6" width="16" height="15" rx="3" />
    <path d="M8 6V4h8v2" />
    <path d="M12 10v7M8.5 13.5h7" />
  </svg>
);

export const IconGift = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="4" y="9" width="16" height="11" rx="2" />
    <path d="M4 13h16" />
    <path d="M12 9v11" />
    <path d="M12 9S10.5 4 8 4.5 9 9 12 9Z" />
    <path d="M12 9s1.5-5 4-4.5S15 9 12 9Z" />
  </svg>
);

export const IconDog = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M6 8c-1.5 0-2.5-2-2.5-3.5S5 3 6 4s1.5 3 0 4Z" />
    <path d="M18 8c1.5 0 2.5-2 2.5-3.5S19 3 18 4s-1.5 3 0 4Z" />
    <path d="M7 10a5 5 0 0 1 10 0v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-3Z" />
    <circle cx="10" cy="13" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="0.8" fill="currentColor" stroke="none" />
    <path d="M12 16v1" />
  </svg>
);

export const IconCat = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M5 4l2 4M19 4l-2 4" />
    <path d="M7 8a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0V8Z" />
    <circle cx="10" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="14" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <path d="M11 14l1 1 1-1" />
  </svg>
);

export const IconTree = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M12 3 6 11h3l-3 5h12l-3-5h3L12 3Z" />
    <path d="M12 16v5" />
  </svg>
);

export const IconUmbrella = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z" />
    <path d="M12 12v6a2 2 0 0 0 4 0" />
    <path d="M12 3v0" />
  </svg>
);

export const IconCup = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M5 8h12l-1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8Z" />
    <path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M9 4c0-1 1-1 1-2M13 4c0-1 1-1 1-2" />
  </svg>
);

export const IconBed = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M3 8v12M3 12h18a2 2 0 0 1 2 2v6" />
    <path d="M3 18h20" />
    <path d="M7 12V9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3" />
  </svg>
);

export const IconBowl = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M3 11h18a8 8 0 0 1-16 0H3Z" />
    <path d="M9 11V8a3 3 0 0 1 6 0" />
    <path d="M2 11h20" />
  </svg>
);

export const IconBell = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IconQuestion = (p) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 4 2c0 1.5-2 2-2 3.5" />
    <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconBriefcase = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="3" y="8" width="18" height="12" rx="3" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

export const IconEye = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconChat = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);

export const IconCamera = (p) => (
  <svg {...baseProps} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="3" />
    <path d="M8 7l1.5-3h5L16 7" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...baseProps} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconSort = (p) => (
  <svg {...baseProps} {...p}>
    <path d="M7 4v16M7 4 4 7M7 4l3 3" transform="rotate(180 7 12)" />
    <path d="M17 4v16M17 4l-3 3M17 4l3 3" />
  </svg>
);

// 카테고리/배지용 캐릭터 이모지 대체용 (간단한 동물 얼굴)
export const IconDogFace = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <path d="M12 3c-4 0-7 3-7 7 0 1 .3 2 .8 2.8C4.5 13.5 4 14.7 4 16c0 2.5 2 4.5 4.5 4.5.9 0 1.7-.3 2.5-.7.8.4 1.6.7 2.5.7C16 20.5 18 18.5 18 16c0-1.3-.5-2.5-1.8-3.2.5-.8.8-1.8.8-2.8 0-4-3-7-7-7Z" />
    <path d="M9 10c.5-.5 1.5-.5 2 0M13 10c.5-.5 1.5-.5 2 0" stroke="#fff" strokeWidth="1.2" fill="none" />
    <circle cx="10" cy="13" r="0.8" fill="#fff" />
    <circle cx="14" cy="13" r="0.8" fill="#fff" />
  </svg>
);

export const IconCatFace = (p) => (
  <svg {...baseProps} {...p} fill="currentColor" stroke="none">
    <path d="M6 3l2 4M18 3l-2 4" />
    <path d="M12 5c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7Z" />
    <circle cx="9.5" cy="11" r="0.9" fill="#fff" />
    <circle cx="14.5" cy="11" r="0.9" fill="#fff" />
    <path d="M11 14l1 1 1-1" stroke="#fff" strokeWidth="1.2" fill="none" />
  </svg>
);

export default {
  IconHome, IconMap, IconGrid, IconHeart, IconUser, IconSearch, IconClock,
  IconChevronLeft, IconChevronRight, IconChevronDown, IconArrowRight,
  IconPlay, IconPause, IconPin, IconStar, IconPhone, IconCopy, IconSubway,
  IconLock, IconCheck, IconRefresh, IconLogout, IconChart, IconShopping,
  IconUtensils, IconHouse, IconPaw, IconBackpack, IconScissors, IconHospital,
  IconGift, IconDog, IconCat, IconTree, IconUmbrella, IconCup, IconBed,
  IconBowl, IconBell, IconQuestion, IconBriefcase, IconEye, IconChat,
  IconCamera, IconClose, IconSort, IconDogFace, IconCatFace,
};
