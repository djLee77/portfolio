import { motion } from 'framer-motion';

export function ApsDetailView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem', maxWidth: '800px' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
          Overview
        </h4>
        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1.05rem' }}>
          This section is a placeholder for the future interactive node-graph visualization. 
          It will demonstrate the complex scheduling algorithms, worker placement constraints, 
          and domain modeling rules used in the APS engine.
        </p>
      </div>

      {/* Placeholder Canvas for Nodes/Graphs */}
      <div 
        style={{ 
          flex: 1, 
          borderRadius: '16px', 
          backgroundColor: '#ffffff',
          border: '1px dashed #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ textAlign: 'center', zIndex: 10 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
          <p style={{ fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>
            INTERACTIVE GRAPH ENGINE<br/>
            <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>(To be implemented)</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
