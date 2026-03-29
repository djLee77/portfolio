import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { LinkedListGraph } from './LinkedListGraph';
import { EngineGraph } from './EngineGraph';
import { WorkflowGraph } from './WorkflowGraph';

const projects = [
  {
    num: '01',
    tag: 'C# · TypeScript · React.js · Cytoscape.js',
    company: 'VMS Solutions',
    period: '2026.01 — 현재',
    title: '신화인터텍 시스템\n 마이그레이션',
    overview: '필름 생산/운송 계획 수립 자동화 시스템 마이그레이션. Agile/Sprint 기반으로 프로젝트를 진행하며, ERP 연동 워크플로우 설계부터 레거시 화면 전환, 시뮬레이션 엔진 재설계까지 전반을 담당.',
    accent: '#3182f6',
    role: '시뮬레이션 엔진 개발 · 웹 풀스택 개발 · 워크플로우 설계',
    tech: ['C#', 'TypeScript', 'React.js', 'Cytoscape.js', 'MariaDB', 'Gitea', 'Nexus', 'CI/CD'],
    achievements: [
      'ERP 인터페이스 연동 워크플로우 설계 및 구축',
      'JSP 기반 레거시 화면을 React.js + Java REST API + ORM 구조로 마이그레이션',
      '시뮬레이션 엔진 마이그레이션 및 튜닝, 비즈니스 로직 재설계'
    ],
  },
  {
    num: '02',
    tag: 'C# · TypeScript · React.js · CI/CD',
    company: 'VMS Solutions',
    period: '2025.06 — 2025.12',
    title: '한화에어로스페이스\n엔진조립 SF계획시스템',
    overview: '항공기 엔진 조립 공정의 생산계획 자동화 시스템 신규 구축. 폐쇄망 환경에서 프론트엔드 개발, 시뮬레이션 엔진 설계·구현·검증, CI/CD 인프라 구축을 전담.',
    accent: '#3182f6',
    role: '시뮬레이션 엔진 개발 · 웹 개발 · 환경 구축',
    tech: ['C#', 'TypeScript', 'React.js', 'Cytoscape.js', 'MariaDB', 'Gitea', 'Nexus', 'CI/CD'],
    achievements: [
      '작업자 숙련도·피로도·근무 스케줄(휴무/식사/휴식)·Main/Sub 유형을 반영한 배치 최적화 알고리즘 설계 및 구현',
      '여러가지 규칙(설비 제약 · 자재 제약 · 작업자 제약 · 작업 우선순위)을 반영한 스케줄링 엔진',
      'Cytoscape.js를 활용한 BOP 공정 흐름 인터랙티브 시각화 — 그래프 기반 공정 시각화 화면',
      '폐쇄망 환경에서의 Gitea · Nexus 기반 형상관리 및 외부망 없이 배포·공유 환경 자체 구성'
    ],
  },
  {
    num: '03',
    tag: 'C# · 도메인 모델링 · 최적화',
    company: 'VMS Solutions',
    period: '2024.10 — 2025.05',
    title: '한국콜마\nAPS 엔진 고도화',
    overview: '화장품 제조사 한국콜마의 APS 엔진 고도화 프로젝트. Agile/Sprint 기반으로 시뮬레이션 엔진 설계·구현·검증을 담당하며, 현업 인터뷰를 통해 요구사항 정의 및 검증 프로세스를 직접 수행.',
    accent: '#3182f6',
    role: '시뮬레이션 엔진 반자동화 기능 · 자재가용성 점검 기능 개발',
    tech: ['C#', '도메인 모델링', '최적화'],
    achievements: [
      '사용자 확정 계획 반영 로직 구현으로 스케줄링 반자동화',
      '자재가용성 점검 기능 개발로 제조 계획 준수율 99% 이상 달성',
      '자료구조를 활용한 엔진 실행시간 최적화 → 엔진 실행 시간 60% 단축',
      '현업 인터뷰를 통한 요구사항 정의 및 검증 프로세스 직접 수행'
    ],
  },
];

export function BuildSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const slideTransition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section style={{ background: 'var(--bg-color)', position: 'relative' }}>
      <div style={{ padding: '7rem 6vw 5rem' }}>
        <p style={{ fontSize: '0.95rem', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '1.2rem' }}>
          03 — Build
        </p>
        <h2 style={{ fontSize: 'clamp(4.5rem, 8vw, 7.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.045em', lineHeight: 1.05 }}>
          Things I've<br />Built.
        </h2>
      </div>

      <div ref={wrapperRef} style={{ display: 'flex', height: '300vh', position: 'relative' }}>
        
        {/* 좌측: 스크롤 텍스트 구역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              animate={{ opacity: activeIndex === i ? 1 : 0.2 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3vw 0 10vw' }}
            >
              <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em', color: project.accent, fontWeight: 700, background: 'rgba(49, 130, 246, 0.1)', padding: '0.45rem 1rem', borderRadius: '8px', display: 'inline-block', marginBottom: '1.2rem', alignSelf: 'flex-start' }}>
                {project.tag}
              </span>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{project.company}</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>|</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{project.period}</span>
              </div>
              <h3 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.6rem', whiteSpace: 'pre-line' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary, #64748b)', maxWidth: '650px' }}>
                {project.overview}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 우측: 3차원 디테일 텍스트 모션 구역 */}
        <div style={{ flex: 1, position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '4vh 8vw 4vh 2vw' }}>
          
          <motion.div 
            style={{ 
              width: '100%', maxWidth: '90%', height: '70vh', borderRadius: '24px', background: '#ffffff', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.03)', 
              overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
              zIndex: 10
            }}
          >
            {/* 상단 컬러 바 */}
            <motion.div
              animate={{ background: `linear-gradient(90deg, ${projects[activeIndex].accent}, ${projects[activeIndex].accent}55)` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '4px', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 50 }}
            />

            <div style={{ position: 'absolute', inset: 0, top: '4px', overflow: 'hidden' }}>
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                const isPast = activeIndex > i;
                const xPos = isActive ? '0%' : (isPast ? '-100%' : '100%');
                const zIndex = isActive ? 10 : 1;

                return (
                  <motion.div
                    key={project.num}
                    animate={{ x: xPos }}
                    transition={slideTransition}
                    style={{ 
                      position: 'absolute', inset: 0, zIndex, 
                      borderRadius: '0 0 24px 24px', overflow: 'hidden',
                      boxShadow: isActive ? '0 0 50px rgba(0,0,0,0.05)' : 'none',
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* 카드 타이틀 헤더 */}
                    <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid #f1f5f9', background: '#ffffff', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 5 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: project.accent, background: `${project.accent}15`, padding: '0.4rem 0.8rem', borderRadius: '12px' }}>
                        {project.num}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
                        {project.title.replace('\n', ' ')}
                      </h4>
                    </div>

                    {/* 카드 내용 바디 */}
                    <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc', padding: '2rem 3rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div>
                          <h5 style={{ fontSize: '0.82rem', color: project.accent, fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>담당 역할</h5>
                          <p style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 600 }}>{project.role}</p>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '0.82rem', color: project.accent, fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>사용 기술</h5>
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            {project.tech.map(t => (
                              <span key={t} style={{ padding: '0.4rem 1.1rem', background: '#e2e8f0', borderRadius: '30px', fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '0.82rem', color: project.accent, fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>프로젝트 개요</h5>
                          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, wordBreak: 'keep-all' }}>{project.overview}</p>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '0.82rem', color: project.accent, fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>주요 성과 및 업무</h5>
                          <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {project.achievements.map((item, idx) => (
                              <li key={idx} style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, wordBreak: 'keep-all' }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {project.num === '03' && (
                          <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.5s ease-in' }}>
                            <LinkedListGraph />
                          </div>
                        )}

                        {project.num === '02' && (
                          <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.5s ease-in' }}>
                            <EngineGraph />
                          </div>
                        )}

                        {project.num === '01' && (
                          <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.5s ease-in' }}>
                            <WorkflowGraph />
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
