import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export function HeroSection({ scrollYProgress }: Props) {
  const y = useTransform(scrollYProgress, [0, 0.2], ['0%', '120%']);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 16]);
  const filterValue = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{ y, opacity, filter: filterValue, textAlign: 'center' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}
        >
          CREATIVE<br />DEVELOPER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.25em',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore the universe
        </motion.p>

        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--accent)',
          }}
        >
          <ArrowDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
