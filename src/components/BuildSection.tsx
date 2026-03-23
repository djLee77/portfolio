import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ApsDetailView } from './ApsDetailView';
import { MediaDetailView } from './MediaDetailView';
import { X } from 'lucide-react';

const projects = [
  {
    num: '01',
    tag: 'React · TypeScript · Cytoscape.js · C#',
    company: 'VMS Solutions',
    period: '2024.10 — 현재',
    title: '한화에어로\nAPS 시스템',
    desc: '항공기 엔진 조립 공정의 생산계획 수립 자동화 시스템. 작업자 숙련도·피로도·근무스케줄 등 5가지 이질적 제약 조건을 단일 스케줄링 엔진에 통합 설계. Cytoscape.js 기반 BOP 공정 흐름 인터랙티브 시각화.',
    accent: '#3182f6', // Toss Blue
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f2f4f6' }}>
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, position: 'absolute', inset: 0 }} 
          alt="한화에어로스페이스 APS" 
          loading="eager"
        />
      </div>
    ),
  },
  {
    num: '02',
    tag: 'C# · MS SQL · 도메인 모델링',
    company: 'VMS Solutions',
    period: '2024.03 — 2024.08',
    title: '한국콜마\nAPS 고도화',
    desc: '화장품 제조사 APS 엔진 고도화. 사용자 확정 계획 반영 로직으로 엔진 실행 시간 50% 단축. 자재가용성 점검 기능으로 제조 계획 준수율 99% 이상 달성.',
    accent: '#3182f6', // Toss Blue
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f2f4f6' }}>
        <img 
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200&auto=format&fit=crop" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, position: 'absolute', inset: 0 }} 
          alt="한국콜마 APS" 
          loading="eager"
        />
      </div>
    ),
  },
  {
    num: '03',
    tag: 'React · Node.js · PostgreSQL · AI',
    company: '개인 프로젝트',
    period: '2023.09 — 2024.02',
    title: 'D&D\nCloset',
    desc: 'AI 배경 제거로 옷 이미지를 수집하고, 인터랙티브 캔버스에서 코디를 배치·저장·공유하는 풀스택 웹 플랫폼. Konva 기반 드래그 앤 드롭, JWT 인증, Render.com + Supabase 배포.',
    accent: '#3182f6', // Toss Blue
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f2f4f6' }}>
        <img 
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, position: 'absolute', inset: 0 }} 
          alt="D&D Closet" 
          loading="eager"
        />
      </div>
    ),
  },
];

export function BuildSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
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

  // 애니메이션 속도 세팅: Expo Out 커브를 통해 끊김 없이 재빠르게 쾌속 슬라이드 되는 극단적 가속 부여 (사용자 만족 스피드)
  const slideTransition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section style={{ background: 'var(--bg-color)', position: 'relative' }}>
      <div style={{ padding: '7rem 6vw 5rem' }}>
        <p style={{ fontSize: '0.95rem', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '1.2rem' }}>
          02 — Build
        </p>
        <h2 style={{ fontSize: 'clamp(4.5rem, 8vw, 7.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.045em', lineHeight: 1.05 }}>
          Things I've<br />Built.
        </h2>
      </div>

      <div ref={wrapperRef} style={{ display: 'flex', height: '300vh', position: 'relative' }}>
        
        {/* 좌측: 스크롤 텍스트 구역 (빈공간을 줄이고 카드로 밀착) */}
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
                {project.desc}
              </p>
              <motion.button 
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02, backgroundColor: '#1b64da' }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }} 
                style={{ 
                  alignSelf: 'flex-start', marginTop: '2.5rem', padding: '0.9rem 2.2rem', 
                  borderRadius: '12px', border: 'none', 
                  background: project.accent, color: '#ffffff', 
                  fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', 
                  fontFamily: 'inherit', letterSpacing: '-0.01em',
                  boxShadow: '0 4px 14px rgba(49, 130, 246, 0.3)'
                }}
              >
                프로젝트 보기
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* 우측: 3차원 Slicing Tear 모션 구역 (텍스트 영역 넓힘에 따라 비율 조정) */}
        <div style={{ flex: 1, position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '4vh 8vw 4vh 2vw', perspective: '1200px' }}>
          
          {/* 1. Behind Card (Detail Modal) - Slides out to the left when selected */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ x: '0%', opacity: 1, scale: 0.9 }}
                animate={{ x: '-95%', opacity: 1, scale: 1 }}
                exit={{ x: '0%', opacity: 1, scale: 0.9 }}
                transition={{ type: 'spring', damping: 22, stiffness: 110, delay: 0.05 }}
                style={{
                  position: 'absolute',
                  width: '80%',
                  height: '60vh',
                  background: '#ffffff',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 5, // Behind the main card (which will jump to zIndex 10)
                }}
              >
                {/* Header built into the sliding card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#ffffff', zIndex: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedProject.accent, background: `${selectedProject.accent}15`, padding: '0.3rem 0.6rem', borderRadius: '12px' }}>
                      {selectedProject.num}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                      {selectedProject.title.replace('\n', ' ')}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body built into the sliding card */}
                <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc' }}>
                  {selectedProject.num === '01' || selectedProject.num === '02' ? (
                    <ApsDetailView />
                  ) : selectedProject.num === '03' ? (
                    <MediaDetailView />
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. Main Visual Card Container - Pops out in 3D when detail card slides out */}
          <motion.div 
            animate={{ 
              scale: selectedProject ? 1.05 : 1, 
              x: selectedProject ? '12%' : '0%', 
              rotateY: selectedProject ? -8 : 0,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{ 
              width: '80%', height: '60vh', borderRadius: '24px', background: '#ffffff', 
              boxShadow: selectedProject ? '30px 40px 80px rgba(0,0,0,0.08)' : '0 20px 60px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.03)', 
              overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
              zIndex: 10, transformStyle: 'preserve-3d'
            }}
          >
            
            {/* 상단 컬러 바 */}
            <motion.div
              animate={{ background: `linear-gradient(90deg, ${projects[activeIndex].accent}, ${projects[activeIndex].accent}55)` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '4px', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 50 }}
            />

            {/* 고속 가로 슬라이딩 (Horizontal Swipe) 콘텐츠 스왑 영역 */}
            <div style={{ position: 'absolute', inset: 0, top: '4px', overflow: 'hidden' }}>
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                const isPast = activeIndex > i;
                
                // 활성 카드는 정중앙(0%), 과거 카드는 왼쪽(-100%), 미래 카드는 오른쪽(100%)으로 매끄럽게 교차
                const xPos = isActive ? '0%' : (isPast ? '-100%' : '100%');
                
                // 교차할 때 현재 카드가 깔끔하게 위로 올라오도록 zIndex 구성
                const zIndex = isActive ? 10 : 1;

                return (
                  <motion.div
                    key={project.num}
                    animate={{ x: xPos }}
                    transition={slideTransition}
                    style={{ 
                      position: 'absolute', inset: 0, zIndex, 
                      borderRadius: '0 0 24px 24px', 
                      overflow: 'hidden',
                      boxShadow: isActive ? '0 0 50px rgba(0,0,0,0.5)' : 'none' // 들어올 때 강렬한 입체 그림자
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0 }}>{project.visual}</div>
                    
                    {/* 그라데이션 오버레이 */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 40%)', pointerEvents: 'none' }} />
                    
                    {/* 번호 워터마크 */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.2rem',
                        right: '1.6rem',
                        fontSize: '6.5rem',
                        fontWeight: 800,
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1,
                        fontFamily: 'Space Grotesk, sans-serif',
                        letterSpacing: '-0.04em',
                        pointerEvents: 'none',
                      }}
                    >
                      {project.num}
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
