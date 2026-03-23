import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section style={{ background: 'var(--bg-color)', position: 'relative', padding: '10rem 6vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '0.95rem', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '1.2rem' }}
      >
        02 — About
      </motion.p>
      
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '6rem', wordBreak: 'keep-all' }}
      >
        효율성, 정확성, 확장성.<br/>
        완성된 소프트웨어를 고집합니다.
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem' }}>
        
        {/* Intro */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <div style={{ width: '4px', height: '1.5rem', background: 'var(--accent)', borderRadius: '2px' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>Introduction</h3>
          </div>
          
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
            팀원과의 협업을 중시하며, 코드 리뷰와 피드백을 적극적으로 수용하여 문제를 명확하게 해결하는 태도를 가졌습니다. 원활한 커뮤니케이션을 바탕으로 비즈니스 목표를 빠르고 정확하게 달성하는 것을 최우선으로 생각합니다.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>
            단순히 화면을 그려내는 것을 넘어, 사용자의 압도적인 편의성과 대용량 데이터 처리에도 흔들리지 않는 애플리케이션의 성능 최적화를 위한 최적의 컴포넌트 구조를 설계합니다. 끊임없이 고민하고 발전하는 엔지니어가 되겠습니다.
          </p>
        </motion.div>

        {/* Education & Activities */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, delay: 0.3 }}
        >
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
             <div style={{ width: '4px', height: '1.5rem', background: 'var(--accent)', borderRadius: '2px' }} />
             <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>Education & Activities</h3>
           </div>
           
           {/* Edu Item */}
           <div style={{ marginBottom: '3rem', padding: '1.5rem', background: '#f9fafb', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
             <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>2022.02 졸업</p>
             <p style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>인하공업전문대학</p>
             <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', fontWeight: 500 }}>컴퓨터정보공학과 전공심화과정 학사</p>
           </div>

           {/* Activity Item 1 */}
           <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #f1f5f9', marginBottom: '2.5rem' }}>
             <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
             <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>2025.12</p>
             <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>GDG Incheon DevFest 2025</p>
             <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Google Antigravity 신기술 체험 및 사내 20명 도입 주도</p>
           </div>
           
           {/* Activity Item 2 */}
           <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #f1f5f9' }}>
             <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
             <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Ongoing</p>
             <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Baekjoon Online Judge</p>
             <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>알고리즘 문제 풀이 (solved.ac: eowns1111)</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
