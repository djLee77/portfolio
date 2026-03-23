import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  // 너무 과하지 않게, 마우스 휠 스크롤에 맞춰 은은하게 상하/회전 운동을 맵핑
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);
  const orbRotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbRotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* 1. 베이스 컬러 강제 부여 (섹션들이 투명해지므로 최후의 방어선) */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg-color)' }} />

      {/* 2. 패럴랙스 도트 패턴 (개발자다운 깔끔한 점선 모눈종이 패턴) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-50%', // 스크롤 이동 공간 확보
          y: useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
          backgroundSize: '24px 24px',
          backgroundImage: 'radial-gradient(circle, rgba(15, 23, 42, 0.05) 1.5px, transparent 1.5px)',
        }}
      />

      {/* 3. 거대한 플로팅 조명 1 (Toss Blue - 극히 연하게) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%', left: '-10%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(49, 130, 246, 0.06) 0%, rgba(49, 130, 246, 0) 70%)',
          filter: 'blur(80px)',
          y: orbY1,
          rotate: orbRotate1
        }}
      />

      {/* 4. 거대한 플로팅 조명 2 (White / 아주 옅은 Grey) */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%', right: '-10%',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 250, 251, 0.8) 0%, rgba(249, 250, 251, 0) 70%)',
          filter: 'blur(100px)',
          y: orbY2,
          rotate: orbRotate2
        }}
      />

      {/* 5. SVG 텍스처 노이즈 필름 (화면 질감 입히기 - 용량 0의 극강의 최적화 기법) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25, // 너무 과하지 않게 블렌딩
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light'
        }}
      />
    </div>
  );
}
