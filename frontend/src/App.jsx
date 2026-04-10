import CursorGlow from './components/effects/CursorGlow';
import ParticleField from './components/effects/ParticleField';
import FloatingNav from './components/navigation/FloatingNav';
import HeroCinematic from './components/sections/HeroCinematic';
import GenreExperience from './components/sections/GenreExperience';
import LiveEnergy from './components/sections/LiveEnergy';
import SoundSection from './components/sections/SoundSection';
import BookingSection from './components/sections/BookingSection';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Global effects */}
      <CursorGlow />
      <ParticleField particleCount={40} />
      
      {/* Navigation */}
      <FloatingNav />
      
      {/* Main content */}
      <main>
        <HeroCinematic />
        <GenreExperience />
        <LiveEnergy />
        <SoundSection />
        <BookingSection />
      </main>
      
      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-rave tracking-wider">
            SANCTÜS
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} <span className="font-rave">SANCTÜS</span>. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/sanctus.dj" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
              Instagram
            </a>
            <a href="https://youtube.com/@sanctusdj" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
