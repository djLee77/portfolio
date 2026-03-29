import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

const entries = [
  {
    period: '2022\nEdu.',
    shortPeriod: '2022 졸업',
    role: '컴퓨터정보공학과 학사',
    company: '인하공업전문대학',
    location: '전공심화과정',
    skills: ['CS 기초', '자료구조', '소프트웨어 공학', '웹 프로그래밍'],
    highlights: [
      '컴퓨터정보공학과 전문학사 및 전공심화과정 이수',
    ],
  },
  {
    period: '2024\n—',
    shortPeriod: '2024.01 — 현재',
    role: '선임 · 프론트엔드 & 풀스택',
    company: 'VMS Solutions',
    location: '경기 · 용인',
    skills: ['TypeScript', 'React', 'Java', 'C#', 'MS SQL', 'Gitea', 'Nexus'],
    highlights: [
      'React + TypeScript 기반 대형 제조사 생산계획(APS) SPA 전체 설계 및 개발',
      'Cytoscape.js 기반 BOP 공정 흐름 인터랙티브 시각화 — 복잡한 공정 데이터를 UI로 직관화',
      '완전 폐쇄망 환경에서 Gitea · Nexus 기반 형상관리 및 CI/CD 자동화 직접 구축',
      'C# 공정 시뮬레이션 엔진 개발 — 작업자 배치 최적화, 스케줄링 알고리즘 설계',
    ],
  },
  {
    period: '2024\nKolmar',
    shortPeriod: '2024.03 — 2024.08',
    role: 'APS 엔진 고도화',
    company: '한국콜마',
    location: '프로젝트',
    skills: ['C#', 'MS SQL Server', '도메인 모델링', '최적화 알고리즘'],
    highlights: [
      '사용자 확정 계획 반영 로직 구현 — 반자동화로 엔진 실행 시간 50% 단축',
      '자재가용성 점검 기능 개발 — 제조 계획 준수율 99% 이상 달성',
      '현업 인터뷰를 통한 요구사항 정의 및 검증 프로세스 직접 수행',
    ],
  },
  {
    period: '2024\nHanwha',
    shortPeriod: '2024.10 — 현재',
    role: '엔진조립 SF계획시스템 구축',
    company: '한화에어로스페이스',
    location: '프로젝트',
    skills: ['C#', 'TypeScript', 'React', 'Cytoscape.js', 'MS SQL Server'],
    highlights: [
      '숙련도·피로도·근무 스케줄·작업유형 등 5가지 이질적 제약 조건을 단일 스케줄링 엔진에 통합 설계',
      'Cytoscape.js 활용 BOP 공정 흐름 시각화 — 드래그 기반 공정 편집 UI 구현',
      '폐쇄망에서 Gitea · Nexus 기반 npm 패키지 배포·공유 환경 자체 구성, 빌드 자동화',
    ],
  },
];

// 뷰포트 중앙에 올 때 activeIndex를 갱신하는 항목 컴포넌트
function EntryCard({
  entry,
  index,
  onActive,
}: {
  entry: (typeof entries)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // 양쪽 여백을 동일하게 -45% 주어, 화면 정중앙 10% 영역을 지날 때 칼같이 타이밍이 맞도록 수정
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0.28,
        transition: 'opacity 0.45s ease',
        paddingBottom: '35vh', // 스크롤 시 항목이 한 번에 너무 많이 넘어가지 않도록 간격 대폭 확보
      }}
    >
      {/* 회사 + 직함 */}
      <div style={{ marginBottom: '2rem' }}>
        <p
          style={{
            fontSize: '0.95rem',
            letterSpacing: '0.22em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '0.8rem',
          }}
        >
          {entry.company} · {entry.location}
        </p>
        <h3
          style={{
            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
          }}
        >
          {entry.role}
        </h3>
      </div>

      {/* 성과 리스트 */}
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem', // 성과 리스트 줄간격 확장하여 글자수 많아보이게
          marginBottom: '3rem',
        }}
      >
        {entry.highlights.map((h, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.45, delay: j * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              fontSize: '1.15rem',
              fontWeight: 500,
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
                marginTop: '0.65em',
                opacity: 0.8,
              }}
            />
            {h}
          </motion.li>
        ))}
      </ul>

      {/* 스킬 태그 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
        {entry.skills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: '0.4rem 1.1rem',
              borderRadius: '30px',
              background: 'var(--accent-soft)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResumeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 좌측 진행 바: 스크롤에 따라 아래로 채워짐
  const progressBarH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section style={{ background: 'var(--bg-color)' }}>
      {/* 섹션 헤더 */}
      <div style={{ padding: '7rem 6vw 5rem' }}>
        <p
          style={{
            fontSize: '0.95rem',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '1.2rem',
          }}
        >
          01.5 — Resume
        </p>
        <h2
          style={{
            fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
          }}
        >
          Career<br />Timeline.
        </h2>
      </div>

      {/* ── 그리드: 좌(1.2fr 고정 연도) + 우(2fr 스크롤 내역) ── */}
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(350px, 1.2fr) 2fr',
          gap: '4vw',
          padding: '0 6vw',
          alignItems: 'start',
        }}
      >
        {/* ── 좌측: sticky 연도 패널 ── */}
        <div
          style={{
            position: 'sticky',
            top: '20vh',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '4rem',
          }}
        >
          {/* 스크롤 진행 바 */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '10%',
              width: '2px',
              height: '80%',
              background: 'var(--accent-soft)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: progressBarH,
                background: 'var(--accent)',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* 연도 — AnimatePresence로 부드럽게 교체 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit={{    opacity: 0, y: -18, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontSize: '0.95rem',
                  letterSpacing: '0.22em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  marginBottom: '1rem',
                }}
              >
                {entries[activeIndex].company}
              </p>
              <h3
                style={{
                  fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1.0,
                  whiteSpace: 'pre-line',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {entries[activeIndex].period}
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* 인덱스 도트 */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '2rem',
            }}
          >
            {entries.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '4px',
                  background:
                    i === activeIndex
                      ? 'var(--accent)'
                      : 'var(--accent-border)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── 우측: 순차 스크롤 커리어 내역 ── */}
        <div style={{ paddingTop: '10vh', paddingBottom: '20vh' }}>
          {entries.map((entry, i) => (
            <EntryCard
              key={i}
              entry={entry}
              index={i}
              onActive={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
