import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'Project Alpha',
    tag: 'Full-Stack Web App',
    description:
      'A next-generation dashboard built with React and real-time data streaming. Features live analytics, dark-mode glassmorphism UI, and sub-second update latency.',
    accent: '#c084fc',
  },
  {
    title: 'Project Beta',
    tag: 'AI / LLM Integration',
    description:
      'Conversational AI interface powered by Claude API. Context-aware memory, streaming responses, and a custom prompt orchestration layer for enterprise workflows.',
    accent: '#38bdf8',
  },
  {
    title: 'Project Gamma',
    tag: '3D / WebGL Experience',
    description:
      'Immersive 3D product showcase using Three.js and GLSL shaders. Achieves 60fps on mobile with LOD techniques and instanced rendering for 10k+ objects.',
    accent: '#34d399',
  },
];

export function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 3장 카드 → 2/3 이동 (마지막 카드까지 완전히 보이도록)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  return (
    <section
      ref={containerRef}
      style={{ height: '300vh', position: 'relative', zIndex: 2 }}
    >
      {/* Sticky Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Section Label */}
        <div style={{ padding: '0 10vw', marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            Selected Work
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Projects
          </h2>
        </div>

        {/* Horizontal Sliding Track */}
        <motion.div
          style={{
            display: 'flex',
            gap: '2rem',
            paddingLeft: '10vw',
            paddingRight: '10vw',
            width: '300vw',
            x,
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="glass-panel"
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                width: 'calc(80vw)',
                flexShrink: 0,
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '55vh',
                borderTop: `2px solid ${project.accent}33`,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: project.accent,
                    fontWeight: 500,
                  }}
                >
                  {project.tag}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 700,
                    marginTop: '0.75rem',
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'var(--text-secondary)',
                    maxWidth: '520px',
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Bottom row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '2rem',
                }}
              >
                <motion.button
                  whileHover={{
                    boxShadow: `0 0 20px ${project.accent}55`,
                    scale: 1.04,
                  }}
                  style={{
                    padding: '0.6rem 1.6rem',
                    borderRadius: '30px',
                    border: `1px solid ${project.accent}66`,
                    background: `${project.accent}11`,
                    color: project.accent,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  View Project →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'rgba(192,132,252,0.4)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
