import { ThinkSection }   from './components/ThinkSection';
import { AboutSection }   from './components/AboutSection';
import { BuildSection }   from './components/BuildSection';
import { ConnectSection } from './components/ConnectSection';
import { ParallaxBackground } from './components/ParallaxBackground';
import './index.css';

function App() {
  return (
    <main style={{ position: 'relative' }}>
      <ParallaxBackground />
      <ThinkSection />
      <AboutSection />
      <BuildSection />
      <ConnectSection />
    </main>
  );
}

export default App;
