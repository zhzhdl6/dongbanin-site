// src/pages/BusinessDashboard/BusinessDashboard.jsx
import React, { useMemo, useState } from 'react';
import styles from './BusinessDashboard.module.css';

// 🌟 웹 크롤링으로 수집된 것처럼 시뮬레이션한 경쟁사/키워드 데이터 셋
const CRAWLED_DATASET = [
  { id: 1,  keyword: '의정부 애견카페', platform: '네이버', rank: 1, reviews: 1284, rating: 4.8, price: '8,000원', competitor: '숲속댕냥 정원', crawledAt: '2026-07-18 09:12' },
  { id: 2,  keyword: '의정부 애견카페', platform: '카카오', rank: 2, reviews: 980,  rating: 4.6, price: '7,000원', competitor: '댕댕브런치',     crawledAt: '2026-07-18 09:12' },
  { id: 3,  keyword: '양주 애견운동장', platform: '네이버', rank: 1, reviews: 642,  rating: 4.5, price: '무료',   competitor: '하늘달리기',     crawledAt: '2026-07-18 09:14' },
  { id: 4,  keyword: '가평 펫션',      platform: '야놀자', rank: 3, reviews: 412,  rating: 4.9, price: '120,000원', competitor: '댕댕힐링 풀빌라', crawledAt: '2026-07-18 09:15' },
  { id: 5,  keyword: '의정부 애견미용', platform: '네이버', rank: 4, reviews: 233,  rating: 4.3, price: '35,000원', competitor: '댕댕살롱',       crawledAt: '2026-07-18 09:17' },
  { id: 6,  keyword: '의정부 애견카페', platform: '구글',   rank: 5, reviews: 187,  rating: 4.4, price: '8,500원', competitor: '멍멍라운지',     crawledAt: '2026-07-18 09:12' },
  { id: 7,  keyword: '양주 애견운동장', platform: '카카오', rank: 2, reviews: 521,  rating: 4.2, price: '무료',   competitor: '그린필드',       crawledAt: '2026-07-18 09:14' },
  { id: 8,  keyword: '가평 펫션',      platform: '네이버', rank: 1, reviews: 738,  rating: 4.7, price: '110,000원', competitor: '포근 댕댕',     crawledAt: '2026-07-18 09:15' },
  { id: 9,  keyword: '의정부 애견미용', platform: '카카오', rank: 3, reviews: 198,  rating: 4.1, price: '38,000원', competitor: '펫살롱 댕냥',   crawledAt: '2026-07-18 09:17' },
  { id: 10, keyword: '동반 반려용품',  platform: '쿠팡',   rank: 2, reviews: 5421, rating: 4.6, price: '12,900원', competitor: '댕냥몰',        crawledAt: '2026-07-18 09:19' }
];

const PLATFORMS = ['전체', '네이버', '카카오', '구글', '야놀자', '쿠팡'];
const KEYWORDS = ['전체', '의정부 애견카페', '양주 애견운동장', '가평 펫션', '의정부 애견미용', '동반 반려용품'];

const SortArrow = ({ active, dir }) => (
  <span className={styles.sortArrow}>
    {active ? (dir === 'asc' ? '▲' : '▼') : '▾'}
  </span>
);

function BusinessDashboard({ onLogout, companyName }) {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('전체');
  const [keywordFilter, setKeywordFilter] = useState('전체');
  const [sortKey, setSortKey] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    let rows = CRAWLED_DATASET.filter(r => {
      const matchSearch = !search ||
        r.competitor.toLowerCase().includes(search.toLowerCase()) ||
        r.keyword.toLowerCase().includes(search.toLowerCase());
      const matchPlatform = platformFilter === '전체' || r.platform === platformFilter;
      const matchKeyword = keywordFilter === '전체' || r.keyword === keywordFilter;
      return matchSearch && matchPlatform && matchKeyword;
    });

    rows = [...rows].sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === 'reviews' || sortKey === 'rank' || sortKey === 'rating') {
        av = Number(av); bv = Number(bv);
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [search, platformFilter, keywordFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const stats = useMemo(() => {
    const totalReviews = filtered.reduce((s, r) => s + r.reviews, 0);
    const avgRating = filtered.length ? (filtered.reduce((s, r) => s + r.rating, 0) / filtered.length).toFixed(2) : '0.00';
    const topRank = filtered.length ? Math.min(...filtered.map(r => r.rank)) : '-';
    return { count: filtered.length, totalReviews, avgRating, topRank };
  }, [filtered]);

  const handleRefresh = () => {
    setSearch('');
    setPlatformFilter('전체');
    setKeywordFilter('전체');
    setSortKey('rank');
    setSortDir('asc');
    setPage(1);
    alert('크롤링 데이터를 새로고침했습니다.');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* 대시보드 헤더 */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.dashboardTitle}>📊 사업자 대시보드</h2>
          <p className={styles.dashboardSubtitle}>
            {companyName ? `${companyName} ` : ''}사업자 전용 경쟁사 분석 리포트
          </p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.refreshBtn} onClick={handleRefresh}>🔄 새로고침</button>
          <button className={styles.logoutBtn} onClick={onLogout}>로그아웃</button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>수집 데이터</span>
          <span className={styles.statValue}>{stats.count}건</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>총 리뷰 수</span>
          <span className={styles.statValue}>{stats.totalReviews.toLocaleString()}건</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>평균 평점</span>
          <span className={styles.statValue}>⭐ {stats.avgRating}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>최고 순위</span>
          <span className={styles.statValue}>{stats.topRank === '-' ? '-' : `${stats.topRank}위`}</span>
        </div>
      </div>

      {/* 검색 및 필터 바 */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="경쟁사명 또는 키워드 검색"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={styles.searchInput}
          />
        </div>
        <select className={styles.selectBox} value={keywordFilter} onChange={(e) => { setKeywordFilter(e.target.value); setPage(1); }}>
          {KEYWORDS.map(k => <option key={k} value={k}>{k === '전체' ? '키워드 전체' : k}</option>)}
        </select>
        <select className={styles.selectBox} value={platformFilter} onChange={(e) => { setPlatformFilter(e.target.value); setPage(1); }}>
          {PLATFORMS.map(p => <option key={p} value={p}>{p === '전체' ? '플랫폼 전체' : p}</option>)}
        </select>
      </div>

      {/* 데이터 테이블 */}
      <div className={styles.tableWrap}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th onClick={() => handleSort('keyword')}>키워드 <SortArrow active={sortKey === 'keyword'} dir={sortDir} /></th>
              <th onClick={() => handleSort('platform')}>플랫폼 <SortArrow active={sortKey === 'platform'} dir={sortDir} /></th>
              <th onClick={() => handleSort('rank')}>순위 <SortArrow active={sortKey === 'rank'} dir={sortDir} /></th>
              <th onClick={() => handleSort('competitor')}>경쟁사 <SortArrow active={sortKey === 'competitor'} dir={sortDir} /></th>
              <th onClick={() => handleSort('reviews')}>리뷰 수 <SortArrow active={sortKey === 'reviews'} dir={sortDir} /></th>
              <th onClick={() => handleSort('rating')}>평점 <SortArrow active={sortKey === 'rating'} dir={sortDir} /></th>
              <th onClick={() => handleSort('price')}>가격 <SortArrow active={sortKey === 'price'} dir={sortDir} /></th>
              <th>수집 일시</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyRow}>조건에 맞는 크롤링 데이터가 없습니다.</td>
              </tr>
            ) : (
              pageRows.map(row => (
                <tr key={row.id}>
                  <td className={styles.cellKeyword}>{row.keyword}</td>
                  <td><span className={`${styles.platformBadge} ${styles[`p_${row.platform}`] || styles.p_default}`}>{row.platform}</span></td>
                  <td><span className={styles.rankBadge}>{row.rank}위</span></td>
                  <td className={styles.cellCompetitor}>{row.competitor}</td>
                  <td>{row.reviews.toLocaleString()}</td>
                  <td><span className={styles.ratingText}>⭐ {row.rating}</span></td>
                  <td className={styles.cellPrice}>{row.price}</td>
                  <td className={styles.cellDate}>{row.crawledAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>이전</button>
        <span className={styles.pageIndicator}>{currentPage} / {totalPages}</span>
        <button className={styles.pageBtn} disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>다음</button>
      </div>
    </div>
  );
}

export default BusinessDashboard;
