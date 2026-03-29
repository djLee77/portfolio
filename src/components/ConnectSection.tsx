import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, Mail, Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ConnectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '', subject: '', email: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('이름, 이메일, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // EmailJS 환경변수 매핑
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('[안내] .env 파일에 VITE_EMAILJS 환경변수 3개가 설정되지 않아 임시로 전송을 시뮬레이션합니다.');
      // 임시 시뮬레이션 모드 (EmailJS 설정 전에도 버튼 체험 가능하게)
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ name: '', subject: '', email: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }, 1500);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: '이대준', 
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', subject: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      })
      .catch((err: any) => {
        console.error('Email 전송 실패:', err);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const textColor = '#1e293b';
  const subColor  = 'rgba(30,41,59,0.55)';

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
        background: 'transparent',
      }}
    >
      <style>{`
        .contact-input {
          width: 100%;
          padding: 1.1rem 1.4rem;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 14px;
          color: #0f172a;
          font-size: 1rem;
          font-weight: 600;
          font-family: inherit;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }
        .contact-input:focus {
          background: #ffffff;
          border-color: #3182f6;
          box-shadow: 0 4px 20px rgba(49, 130, 246, 0.15);
        }
        .contact-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #475569;
          margin-bottom: 0.6rem;
          display: inline-block;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Texts */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          style={{ fontSize: '0.95rem', letterSpacing: '0.3em', color: subColor, textTransform: 'uppercase', fontWeight: 800, marginBottom: '1.5rem' }}
        >
          04 — Connect
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
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}
        >
          {[
            { icon: Github,   label: 'GitHub',  href: 'https://github.com/djLee77', color: '#1e293b' },
            { icon: BookOpen, label: 'Blog',    href: 'https://dnd0707.tistory.com', color: '#f97316' },
            { icon: Mail,     label: 'Email',   href: 'mailto:dkdnl232@gmail.com', color: '#3182f6' },
          ].map(({ icon: Icon, label, href, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.8rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', background: '#ffffff', color: '#334155', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s ease, border-color 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = `${color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
              }}
            >
              <Icon size={20} strokeWidth={2.5} />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form - Refined Design */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 90, delay: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            background: '#ffffff',
            padding: '4rem',
            borderRadius: '32px',
            boxShadow: '0 30px 80px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <label className="contact-label">이름</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" className="contact-input" />
            </div>
            <div>
              <label className="contact-label">제목</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="프로젝트 협업 문의" className="contact-input" />
            </div>
          </div>
          
          <div>
            <label className="contact-label">이메일 주소</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" className="contact-input" />
          </div>
          
          <div>
            <label className="contact-label">내용</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="프로젝트나 협업 제안, 커피챗 등 자유로운 내용을 남겨주세요." rows={5} className="contact-input" style={{ resize: 'vertical', minHeight: '120px' }} />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            whileHover={!isSubmitting && submitStatus !== 'success' ? { y: -4, boxShadow: '0 20px 40px -10px rgba(49, 130, 246, 0.5)' } : {}}
            whileTap={!isSubmitting && submitStatus !== 'success' ? { scale: 0.97 } : {}}
            style={{
              width: '100%',
              padding: '1.3rem',
              background: submitStatus === 'success' 
                ? '#10b981' // Green
                : submitStatus === 'error'
                ? '#ef4444' // Red
                : 'linear-gradient(135deg, #3182f6 0%, #2563eb 100%)',
              border: 'none',
              borderRadius: '14px',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              marginTop: '1rem',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isSubmitting ? (
              '전송 중...'
            ) : submitStatus === 'success' ? (
              <>전송 완료! <CheckCircle size={20} strokeWidth={2.5} /></>
            ) : submitStatus === 'error' ? (
              <>전송 실패 <XCircle size={20} strokeWidth={2.5} /></>
            ) : (
              <>SEND MESSAGE <Send size={20} strokeWidth={2.5} /></>
            )}
          </motion.button>
        </motion.form>
        
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
