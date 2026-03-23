import { motion } from 'framer-motion';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';

export function MediaDetailView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Top Banner / Video Area */}
      <div 
        style={{ 
          width: '100%', 
          height: '45vh', 
          backgroundColor: '#0f172a',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Placeholder for actual video embed */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1600&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }} />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '80px', height: '80px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <PlayCircle size={40} strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* Content Area */}
      <div style={{ padding: '3rem 2.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          
          <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>
              Project Demonstration
            </h4>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              This project is a full-stack platform featuring AI-powered background removal for clothing, 
              interactive canvas manipulation using Konva.js, and a social feed system. 
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem' }}>
              The infrastructure utilizes Render.com for backend hosting, Supabase (PostgreSQL) for the database, 
              and implements robust JWT/bcrypt authentication from scratch.
            </p>
          </div>

          <div style={{ flex: '1 1 30%', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="https://dnd-clothes.example.com" // Placeholder
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                width: '100%', padding: '1rem',
                backgroundColor: '#059669', color: 'white',
                borderRadius: '12px', textDecoration: 'none',
                fontWeight: 600, fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px 0 rgba(5, 150, 105, 0.39)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ExternalLink size={18} /> Visit Live Site
            </a>
            
            <a
              href="https://github.com/djLee77/dnd-clothes"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                width: '100%', padding: '1rem',
                backgroundColor: '#f1f5f9', color: '#0f172a',
                border: '1px solid #e2e8f0',
                borderRadius: '12px', textDecoration: 'none',
                fontWeight: 600, fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            >
              <Github size={18} /> View Source Code
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
