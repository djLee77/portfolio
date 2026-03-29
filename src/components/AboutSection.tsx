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
        About Me
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem' }}>
        
        {/* Intro */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, delay: 0.2 }}
           // 텍스트 가독성을 유지하면서 구역을 더 넓게 쓰기 위해 최대 너비 제한 완화 (660px -> 800px)
           style={{ maxWidth: '1000px' }} 
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <div style={{ width: '4px', height: '1.5rem', background: 'var(--accent)', borderRadius: '2px' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>Introduction</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>
              세상의 모든 사물을 Object로 모델링하여 코드로 표현할 수 있다는 말에 이끌려 개발을 시작했습니다. 그 말이 마음에 닿았던 이유는 단순한 기술적 흥미 때문이 아니라, 현실의 복잡한 문제를 구조적으로 풀어낼 수 있다는 가능성 때문이었습니다. 지금도 개발을 시작할 때 가장 먼저 고민하는 것은 아키텍처입니다. 머리는 판단하고 손은 실행하듯, 각 구성 요소가 자신의 책임에 집중하는 유기적이고 명확한 구조를 지향합니다.
            </p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>
              일하는 방식에 있어서는 효율을 가장 중요하게 생각합니다. 깊은 사고가 필요한 문제 앞에서 집중력이 흐트러졌다고 느끼면 눈치 보지 않고 정시에 퇴근하고, 반대로 좋은 아이디어가 떠오르는 새벽에는 조용한 사무실을 찾아 혼자 문제를 들여다보며 생각을 정리하기도 했습니다. 주어진 시간을 채우는 것보다, 내가 가장 선명하게 사고할 수 있는 상태에서 일하는 것이 더 나은 결과를 만든다고 믿기 때문입니다.
            </p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>
              가장 보람을 느꼈던 순간은 내가 만든 것이 현장에서 실제로 잘 쓰이고 있을 때입니다. 한국콜마 프로젝트에서 자재 가용성 점검 기능을 개발했을 때, 현업 담당자들의 업무 시간이 절반으로 줄었다는 피드백을 받았습니다. 엔진 수행 시간을 60% 단축했을 때 현업 분들이 보여준 반응은, 어떤 수치나 성과보다도 선명하게 기억에 남아 있습니다.
            </p>
          </div>
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
           <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #f1f5f9', marginBottom: '2.5rem' }}>
             <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
             <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>2023-2024</p>
             <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>교내 코딩테스트 동아리 창설 및 운영</p>
             <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>학우들을 위한 정기적인 알고리즘 스터디 및 문제 풀이 리뷰 세션을 주도하며 동반 성장의 문화를 만들었습니다.</p>
           </div>
           
           {/* Activity Item 3 */}
           <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #f1f5f9' }}>
             <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
             <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>2022-2024</p>
             <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Baekjoon Online Judge</p>
             <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>알고리즘 문제 꾸준한 풀이 (solved.ac: eowns1111)</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
