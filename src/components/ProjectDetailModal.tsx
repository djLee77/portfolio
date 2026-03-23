import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    num: string;
    title: string;
    tag: string;
    desc: string;
    accent: string;
    visual: React.ReactNode;
  } | null;
  children: React.ReactNode;
}

export function ProjectDetailModal({ isOpen, onClose, project, children }: ProjectDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            // Glass background
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          onClick={onClose}
        >
          {/* Main Modal expanding from the sliding card */}
          <motion.div
            layoutId={project ? `project-card-${project.num}` : undefined}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              width: '94vw',
              maxWidth: '1600px',
              height: '92vh',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 40px 100px -10px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              border: '1px solid rgba(0,0,0,0.05)',
              zIndex: 10,
              perspective: '2000px', // For 3D hinges
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The actual modal content (fades and scales in behind the doors) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '24px' }}
            >
              {/* Header Area */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '2.5rem 3.5rem',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  backgroundColor: '#ffffff',
                  zIndex: 10,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      letterSpacing: '0.2em',
                      color: project.accent,
                      textTransform: 'uppercase',
                      fontWeight: 800,
                      marginBottom: '0.75rem',
                      display: 'block',
                    }}
                  >
                    Project {project.num}
                  </span>
                  <h3
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#1e293b',
                      margin: 0,
                      lineHeight: 1.2,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    background: 'rgba(0,0,0,0.04)',
                    border: 'none',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.08)';
                    e.currentTarget.style.color = '#1e293b';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Body Area */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0',
                  backgroundColor: '#f8fafc',
                  position: 'relative',
                }}
              >
                {children}
              </div>
            </motion.div>

            {/* Transformer Doors (4-way split of the visual) */}
            {project.visual && (
              <>
                <motion.div
                  initial={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                  animate={{ rotateX: 110, rotateY: -110, opacity: 0 }}
                  exit={{ rotateX: 0, rotateY: 0, opacity: 1, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    borderRadius: '24px'
                  }}
                >
                  {/* @ts-ignore */}
                  <div style={{...project.visual.props.style, borderRadius: '24px'}}>{project.visual.props.children}</div>
                </motion.div>
                
                <motion.div
                  initial={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                  animate={{ rotateX: 110, rotateY: 110, opacity: 0 }}
                  exit={{ rotateX: 0, rotateY: 0, opacity: 1, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
                    transformOrigin: 'top right',
                    pointerEvents: 'none',
                    borderRadius: '24px'
                  }}
                >
                  {/* @ts-ignore */}
                  <div style={{...project.visual.props.style, borderRadius: '24px'}}>{project.visual.props.children}</div>
                </motion.div>

                <motion.div
                  initial={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                  animate={{ rotateX: -110, rotateY: -110, opacity: 0 }}
                  exit={{ rotateX: 0, rotateY: 0, opacity: 1, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
                    transformOrigin: 'bottom left',
                    pointerEvents: 'none',
                    borderRadius: '24px'
                  }}
                >
                  {/* @ts-ignore */}
                  <div style={{...project.visual.props.style, borderRadius: '24px'}}>{project.visual.props.children}</div>
                </motion.div>

                <motion.div
                  initial={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                  animate={{ rotateX: -110, rotateY: 110, opacity: 0 }}
                  exit={{ rotateX: 0, rotateY: 0, opacity: 1, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
                    transformOrigin: 'bottom right',
                    pointerEvents: 'none',
                    borderRadius: '24px'
                  }}
                >
                  {/* @ts-ignore */}
                  <div style={{...project.visual.props.style, borderRadius: '24px'}}>{project.visual.props.children}</div>
                </motion.div>
              </>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
