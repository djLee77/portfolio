import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, BookOpen, ArrowRight, Mail } from 'lucide-react';

const MARQUEE_TEXT = "LET'S BUILD TOGETHER \u2022 LET'S BUILD TOGETHER \u2022 LET'S BUILD TOGETHER \u2022 ";

// 수정: document.body.style 침범 완전 제거
// → useScroll + useTransform으로 컨테이너 backgroundColor를 직접 애니메이팅
export function ConnectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  // 섹션 하단에서 뷰포트 중앙까지 진입하는 구간 동안 배경 전환
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 30%'],
  });

  const bg        = useTransform(scrollYProgress, [0, 1], ['#ffffff', '#111111']);
  const textColor = useTransform(scrollYProgress, [0, 1], ['#1e293b', '#ffffff']);
  const subColor  = useTransform(scrollYProgress, [0, 1], ['rgba(30,41,59,0.45)', 'rgba(255,255,255,0.45)']);

  return (
    <motion.section
      ref={sectionRef}
      style={{
        background: bg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 상단 카피 */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        viewport={{ once: true }}
        style={{ padding: '6rem 6vw 0' }}
      >
        <motion.p
          style={{
            fontSize: '0.95rem',
            letterSpacing: '0.3em',
            color: subColor,
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '2.5rem',
          }}
        >
          03 — Connect
        </motion.p>

        <motion.h2
          style={{
            fontSize: 'clamp(4.5rem, 9vw, 8.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '1.5rem',
            color: textColor,
          }}
        >
          함께 빌드할<br />준비가 됐나요?
        </motion.h2>

        <motion.p
          style={{
            fontSize: '1.2rem',
            color: subColor,
            maxWidth: '560px',
            lineHeight: 1.8,
            marginBottom: '4rem',
          }}
        >
          새로운 기회, 협업 제안, 흥미로운 아이디어를 환영합니다.
          지금 바로 연락주세요.
        </motion.p>

        {/* 소셜 링크 */}
        <div
          style={{ display: 'flex', gap: '0.75rem', marginBottom: '5rem', flexWrap: 'wrap' }}
        >
          {[
            { icon: Github,   label: 'GitHub',  href: 'https://github.com/djLee77' },
            { icon: BookOpen,  label: 'Blog',    href: 'https://dnd0707.tistory.com' },
            { icon: Mail,      label: 'Email',   href: 'mailto:dkdnl232@gmail.com' },
          ].map(({ icon: Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, background: 'rgba(255,255,255,0.12)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 1.8rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.16)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Icon size={18} strokeWidth={2.0} />
              {label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── 무한 마키 ── */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '1.6rem 0',
          marginBottom: '4rem',
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap' }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 800,
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.15)',
                display: 'inline-block',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── 이메일 폼 ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
        viewport={{ once: true }}
        style={{
          padding: '0 8vw 6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '520px',
        }}
      >
        <label
          style={{
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          이메일을 남겨두세요
        </label>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '0.9rem 1.4rem',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'Outfit, sans-serif',
              minWidth: 0,
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05, background: '#e2e8f0' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              padding: '0.9rem 1.4rem',
              borderRadius: '50px',
              border: 'none',
              background: '#ffffff',
              color: '#111',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Outfit, sans-serif',
              flexShrink: 0,
            }}
          >
            Send
            <ArrowRight size={15} />
          </motion.button>
        </div>
      </motion.div>

      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '8vw',
          fontSize: '0.72rem',
          color: 'rgba(248,247,244,0.18)',
          letterSpacing: '0.1em',
        }}
      >
        © 2026 이대준
      </p>
    </motion.section>
  );
}
