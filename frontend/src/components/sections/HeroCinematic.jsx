import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import NeonButton from '../ui/NeonButton';

const genres = [
  { name: 'Drum & Bass', color: '#00d4ff', delay: 0 },
  { name: 'House', color: '#8b5cf6', delay: 0.1 },
  { name: 'Afro', color: '#a3e635', delay: 0.2 },
  { name: 'Trance', color: '#ec4899', delay: 0.3 },
  { name: 'Techno', color: '#f97316', delay: 0.4 },
];

const HeroCinematic = () => {
  const handleScrollToExperience = () => {
    const element = document.querySelector('#experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #0a0a0a 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24">
        {/* Pre-title */}
        <motion.p
          className="text-white/50 text-sm tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the Sound
        </motion.p>

        {/* Main title */}
        <h1 
          className="text-7xl md:text-7xl lg:text-[12rem] font-rave text-white mb-6 tracking-tighter"
          style={{
            textShadow: '3px 3px 0 #B4D9EF, 3px -3px 0 #B4D9EF',
            letterSpacing: '0.0000000000005em',
          }}
        >
          <AnimatedText 
            text="SANCTÜS" 
            delay={0.4}
            staggerDelay={0.08}
            className="justify-center"
          />
        </h1>

        {/* Glow effect behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[120px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(139, 92, 246, 0.3))',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Jaipur-based DJ reshaping the soundscape with global underground energy
        </motion.p>

        {/* Genre pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {genres.map((genre) => (
            <motion.span
              key={genre.name}
              className="px-5 py-2 rounded-full text-sm font-medium border"
              style={{
                borderColor: `${genre.color}40`,
                color: genre.color,
                background: `${genre.color}10`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + genre.delay }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 20px ${genre.color}40`,
              }}
            >
              {genre.name}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <NeonButton variant="cyan" size="lg" onClick={handleScrollToExperience}>
            Explore Experience
          </NeonButton>
          <NeonButton variant="violet" size="lg" onClick={() => {
            const element = document.querySelector('#book');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}>
            Book Now
          </NeonButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroCinematic;
