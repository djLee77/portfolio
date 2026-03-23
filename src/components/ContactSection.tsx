import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const links = [
  { icon: Github,   label: 'GitHub',   href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail,     label: 'Email',    href: '#' },
];

export function ContactSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-60px' }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Get In Touch
        </p>
        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            marginBottom: '1.2rem',
          }}
        >
          Let's Build<br />Something Great
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}
        >
          Open to new opportunities, collaborations, and interesting ideas.
          Don't hesitate to reach out.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {links.map(({ icon: Icon, label, href }, i) => (
          <motion.a
            key={label}
            href={href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 28px rgba(192, 132, 252, 0.45)',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 1.8rem',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <Icon size={18} strokeWidth={1.6} />
            {label}
            <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        style={{
          marginTop: '6rem',
          fontSize: '0.8rem',
          color: 'rgba(148, 163, 184, 0.4)',
          letterSpacing: '0.1em',
        }}
      >
        © 2026 — Crafted with React & Framer Motion
      </motion.p>
    </section>
  );
}
