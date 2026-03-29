import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  // 오로라 덩어리의 미세한 스크롤 운동
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);
  const orbRotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbRotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // 고급스러운 유리 패널(Glass Pane)의 부유(Floating) 패럴랙스 운동
  const glassY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const glassY3 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  
  const glassRotate2 = useTransform(scrollYProgress, [0, 1], [10, -30]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* 1. 베이스 컬러 강제 부여 */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg-color)' }} />

      {/* 2. 거대한 플로팅 오로라 블러 1 (보라색) */}
      <motion.div
        style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0) 70%)',
          filter: 'blur(80px)', y: orbY1, rotate: orbRotate1
        }}
      />

      {/* 3. 거대한 플로팅 오로라 블러 2 (파란색) */}
      <motion.div
        style={{
          position: 'absolute', bottom: '20%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0) 70%)',
          filter: 'blur(100px)', y: orbY2, rotate: orbRotate2
        }}
      />

      {/* ======== NEW: 프리미엄 플로팅 유리 덩어리 (Glassmorphism Panes) ======== */}
      {/* 오로라 빛을 오묘하게 굴절시키고 럭셔리한 화이트 테두리 반사광을 뿜어냅니다 */}
      
      {/* 좌상단 거대 유리 덩어리 -> 시작부터 거대하게 배경을 장식하다가 Contact 섹션에서 중앙으로 장엄하게 안착! */}
      <motion.div
        style={{
          position: 'absolute', 
          top: '50%', left: '50%', 
          // 폼을 넉넉하게 감싸면서, 배경 화면에서도 웅장하고 거대해 보이도록 Base 크기를 최대치로 한 번에 세팅합니다.
          width: 'clamp(500px, 85vw, 1400px)', 
          height: 'clamp(1150px, 115vh, 1500px)',
          // 고급스러운 재질감 유지
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06), inset 0 0 30px rgba(255,255,255,0.6)',
          borderRadius: '40px',
          // 초기부터 크기를 줄이지(Scale down) 않고 원본의 거대함을 그대로 유지! (0.95 -> 1.05) 
          // 초기 오프셋(-75%, -65%)을 주어 화면 왼쪽 상단을 거대한 유리벽으로 웅장하게 덮게 합니다.
          x: useTransform(scrollYProgress, [0, 0.85, 1], ['-75%', '-75%', '-50%']),
          y: useTransform(scrollYProgress, [0, 0.85, 1], ['-65%', '-65%', '-50%']),
          // 0~0.85 구간: 우측 카드와 비슷한 속도로 부드럽게 회전(-45도 -> 0도)
          // 0.85~1.0 구간: 직사각형 기준 시각적 한 바퀴(180도 뒤집기)만 깔끔하게 돌며 중앙 안착
          rotate: useTransform(scrollYProgress, [0, 0.85, 1], [-45, 0, 180]),
          scale: useTransform(scrollYProgress, [0, 0.85, 1], [0.95, 0.95, 1.05])
        }}
      />

      {/* 우하단 긴 유리 조각 */}
      <motion.div
        style={{
          position: 'absolute', bottom: '5%', right: '10%', width: '25vw', height: '60vw',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.4)',
          borderRadius: '30px',
          y: glassY2, rotate: glassRotate2
        }}
      />

      {/* 우상단 정원형 포인트 유리 조각 */}
      <motion.div
        style={{
          position: 'absolute', top: '5%', right: '25%', width: '15vw', height: '15vw',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: 'inset 0 0 15px rgba(255,255,255,0.5)',
          borderRadius: '50%',
          y: glassY3
        }}
      />

      {/* ================================================================= */}

      {/* 6. SVG 텍스처 노이즈 필름 (아날로그 질감) */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light'
        }}
      />
    </div>
  );
}
