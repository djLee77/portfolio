import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, Mail } from 'lucide-react';

export function ConnectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '', subject: '', email: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const textColor = '#1e293b';
  const subColor  = 'rgba(30,41,59,0.55)';
  const borderColor = 'rgba(0,0,0,0.15)';

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.4rem',
    background: 'rgba(255,255,255,0.7)',
    border: `1px solid ${borderColor}`,
    borderRadius: '10px',
    color: textColor,
    fontSize: '1.05rem',
    outline: 'none',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s ease',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: textColor,
    marginBottom: '0.6rem',
    display: 'block',
    letterSpacing: '0.02em',
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.1 }} 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 0 6rem',
        position: 'relative',
        zIndex: 50,
        // 솔리드 배경 완전 제거: 뒤의 파라락스 유리 카드가 날아와 진짜 배경이 됨!
        background: 'transparent',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Texts */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          style={{ fontSize: '0.95rem', letterSpacing: '0.3em', color: subColor, textTransform: 'uppercase', fontWeight: 800, marginBottom: '1.5rem' }}
        >
          03 — Connect
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
          style={{ fontSize: 'clamp(4.5rem, 9vw, 7.5rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1.05, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '1.5rem', color: textColor }}
        >
          CONTACT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          style={{ fontSize: '1.15rem', color: subColor, maxWidth: '480px', lineHeight: 1.8, marginBottom: '3rem' }}
        >
          협업 제안과 커피챗을 언제나 환영합니다.<br/>
          최고의 프로덕트를 함께 만들 준비가 되어 있습니다.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: false }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5rem' }}
        >
          {[
            { icon: Github,   label: 'GitHub',  href: 'https://github.com/djLee77' },
            { icon: BookOpen, label: 'Blog',    href: 'https://dnd0707.tistory.com' },
            { icon: Mail,     label: 'Email',   href: 'mailto:dkdnl232@gmail.com' },
          ].map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, background: 'rgba(0,0,0,0.06)' }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1.6rem', borderRadius: '50px', border: `1px solid ${borderColor}`, color: textColor, textDecoration: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <Icon size={18} strokeWidth={2.0} />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form - Solid White Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 90, delay: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '640px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: '#ffffff', // 유리 카드가 뒤로 숨어들기 때문에 폼 뒷배경을 흰색으로 살려 깔끔하게 처리
            padding: '3.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)',
            textAlign: 'left' // Reset align for form labels
          }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={6} style={{...inputStyle, resize: 'vertical'}} />
          </div>

          <motion.button
            whileHover={{ background: 'var(--text-primary)', color: '#fff', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '1.2rem',
              background: 'transparent',
              border: `2px solid var(--text-primary)`,
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: 'pointer',
              marginTop: '1.5rem',
              transition: 'background-color 0.2s',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            SEND
          </motion.button>
        </motion.div>
        
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '6vw',
          fontSize: '0.75rem',
          color: 'rgba(30,41,59,0.4)',
          letterSpacing: '0.1em',
        }}
      >
        © 2026 이대준
      </p>
    </motion.section>
  );
}
