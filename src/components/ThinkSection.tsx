import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const lines = [
  'BUILD',
  'BREAK',
  'LEARN',
  'REPEAT',
];

// ── 도미노 좌우(Y축) 첫 번째 상태(철학) Variants ──────────────────────────
const introLetter: Variants = {
  hidden: { opacity: 0, rotateY: -90, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: { 
      delay: i * 0.035 + 0.1, 
      type: 'spring', damping: 14, stiffness: 80 
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    rotateY: 90, 
    x: 10,
    transition: { delay: i * 0.015, duration: 0.25 }, 
  }),
};

// ── 도미노 좌우(Y축) 두 번째 상태(인사말) Variants ──────────────────────────
const greetingLetter: Variants = {
  hidden: { opacity: 0, rotateY: -90, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: { 
      delay: i * 0.015, 
      type: 'spring', damping: 14, stiffness: 80 
    },
  }),
};

// ── 한 글자씩 쪼개고 Variant를 따로 받는 글로벌 인덱스 헬퍼 ──────────────────
const renderLetters = (text: string, startIndex: number, variant: Variants) =>
  text.split('').map((char, index) => (
    <motion.span
      key={index}
      custom={startIndex + index} 
      variants={variant}
      style={{ 
        display: 'inline-block', 
        whiteSpace: 'pre',
        transformOrigin: 'left center', 
      }}
    >
      {char}
    </motion.span>
  ));

// 공통 베이스 스타일 타입
const baseType = {
  fontWeight: 800,
  fontFamily: 'Space Grotesk, sans-serif',
  color: 'var(--text-primary)' as string,
  lineHeight: 1.18,
  margin: 0,
};

export function ThinkSection() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // 1.2초에 오차 없이 동시에 다중 플립 폭발 트리거
    const timer = setTimeout(() => setIsFlipped(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  let accumulatedIntro = 0; 
  let accumulatedGreeting = 0;

  return (
    <section
      style={{
        height: '100vh',
        position: 'relative',
        background: 'var(--bg-color)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 6vw',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '0.95rem',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            fontWeight: 800,
            display: 'block',
            marginBottom: 'clamp(2rem, 4.5vh, 3.5rem)',
          }}
        >
          01 — Think
        </motion.span>

        {/* ③ 마스터 래퍼 */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isFlipped ? '15vw' : '0vw' }}
          transition={{ type: 'spring', damping: 16, stiffness: 80 }}
          style={{
            position: 'relative',
            width: '100%',          
            perspective: '1200px',  
          }}
        >
          {/* ④ 가상의 벽 창문 (Virtual Masking Window) */}
          <div
            style={{
              position: 'absolute',
              top: '-20vh',
              bottom: '-20vh',
              right: '98%',
              width: '55vw',
              overflow: 'hidden',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            {/* ⑤ 캐릭터 마스크 팝업 */}
            <motion.img
              src="/character.png"
              alt="My Character"
              initial={{ x: '90%', rotate: 18, opacity: 0 }}
              animate={{ 
                x: isFlipped ? '35%' : '90%', 
                rotate: isFlipped ? -5 : 18, 
                opacity: isFlipped ? 1 : 0 
              }}
              transition={{ type: 'spring', damping: 13, stiffness: 65 }}
              style={{
                position: 'absolute',
                bottom: '10vh',
                right: 0,
                height: '45vh',
                width: 'auto',
                objectFit: 'contain',
                objectPosition: 'bottom right',
                transformOrigin: 'bottom right',
                filter: 'drop-shadow(-15px 15px 25px rgba(0,0,0,0.18))',
              }}
            />
          </div>

          {/* ⑥ 다중 동시 트랜지션 구역 (CSS Grid 겹침 기법으로 Layout Jitter 절대 원천 차단) */}
          <div style={{ display: 'grid', width: '100%' }}>

            {/* ── 상태 A: 철학 4줄 ── */}
            <motion.div
              initial="visible"
              animate={isFlipped ? "exit" : "visible"}
              style={{
                gridArea: '1 / 1', // 1번 행 1번 열 셀에 영구 고정 배치
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.5rem, 1.8vh, 1.4rem)',
                pointerEvents: isFlipped ? 'none' : 'auto',
              }}
            >
              {lines.map((text, i) => {
                const startIdx = accumulatedIntro;
                accumulatedIntro += text.length;
                return (
                  <motion.p
                    key={i}
                    style={{
                      fontSize:
                        i === 0
                          ? 'clamp(5.5rem, 12vw, 10.5rem)'
                          : i === 1
                          ? 'clamp(3.5rem, 8vw, 7.5rem)'
                          : 'clamp(2.5rem, 6vw, 5.8rem)',
                      ...baseType,
                      letterSpacing: i === 0 ? '-0.05em' : '-0.04em',
                    }}
                  >
                    {renderLetters(text, startIdx, introLetter)}
                  </motion.p>
                );
              })}
            </motion.div>

            {/* ── 상태 B: 인사말 ── */}
            <motion.div
              initial="hidden"
              animate={isFlipped ? "visible" : "hidden"}
              style={{
                gridArea: '1 / 1', // 똑같이 1번 행 1번 열 셀에 포개어 강제 밀착 (높이 점프 방지)
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                pointerEvents: isFlipped ? 'auto' : 'none',
              }}
            >
              <motion.p
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                  ...baseType,
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {(() => {
                  const startIdx = accumulatedGreeting;
                  accumulatedGreeting += '안녕하세요, '.length;
                  return renderLetters('안녕하세요, ', startIdx, greetingLetter);
                })()}
              </motion.p>

              <motion.p
                style={{
                  fontSize: 'clamp(3rem, 7.5vw, 8rem)',
                  ...baseType,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.15,
                }}
              >
                {(() => {
                  const startIdx = accumulatedGreeting;
                  accumulatedGreeting += '아이디어를 코드로, '.length;
                  return renderLetters('아이디어를 코드로, ', startIdx, greetingLetter);
                })()}
              </motion.p>

              <motion.p
                style={{
                  fontSize: 'clamp(3rem, 7.5vw, 8rem)',
                  ...baseType,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.15,
                }}
              >
                {(() => {
                  const startIdx = accumulatedGreeting;
                  accumulatedGreeting += '코드를 경험으로 바꾸는'.length;
                  return renderLetters('코드를 경험으로 바꾸는', startIdx, greetingLetter);
                })()}
              </motion.p>

              <motion.p
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  ...baseType,
                  color: 'var(--accent)',
                  letterSpacing: '-0.03em',
                  marginTop: 'clamp(1rem, 3vh, 2rem)',
                }}
              >
                {(() => {
                  const startIdx = accumulatedGreeting;
                  accumulatedGreeting += '풀스택 개발자 이대준입니다.'.length;
                  return renderLetters('풀스택 개발자 이대준입니다.', startIdx, greetingLetter);
                })()}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.8rem',
                  marginTop: 'clamp(1.5rem, 4vh, 3.5rem)',
                  width: '95%',
                  pointerEvents: isFlipped ? 'auto' : 'none',
                }}
              >
                {[
                  { name: 'TypeScript', color: '#3178C6' },
                  { name: 'React', color: '#61DAFB' },
                  { name: 'Zustand', color: '#4A3629' },
                  { name: 'Tailwind CSS', color: '#06B6D4' },
                  { name: 'Node.js', color: '#339933' },
                  { name: 'Java Spring', color: '#6DB33F' },
                  { name: 'C#', color: '#9B4F96' },
                  { name: 'MS SQL', color: '#CC292B' },
                  { name: 'CI/CD Pipeline', color: '#ea580c' }
                ].map((skill, idx) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.9 }}
                    transition={{ delay: 1.1 + idx * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3, 
                      backgroundColor: 'rgba(255,255,255,1)',
                      boxShadow: `0 8px 20px ${skill.color}25`
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 1.25rem',
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      color: '#334155',
                      fontSize: '1rem',
                      fontWeight: 600,
                      fontFamily: 'Space Grotesk, sans-serif',
                      boxShadow: `0 4px 12px ${skill.color}10, 0 1px 2px rgba(0,0,0,0.02)`,
                      cursor: 'default',
                      border: `1px solid ${skill.color}25`,
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <span style={{ color: skill.color, fontSize: '0.75rem' }}>●</span>
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '6vw',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            letterSpacing: '0.2em',
            fontWeight: 700,
          }}
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
          SCROLL
        </motion.div>
      </div>
    </section>
  );
}
