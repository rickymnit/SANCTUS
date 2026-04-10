import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const genres = [
  {
    id: 'drum-bass',
    name: 'Drum n Bass',
    tagline: 'Feel the Breakbeat Energy',
    description: 'High-energy breaks and deep basslines that drive the dancefloor into a frenzy. From liquid smoothness to neurofunk aggression.',
    color: '#00d4ff',
    image: '/assets/onedeck.jpeg',
  },
  {
    id: 'house',
    name: 'House',
    tagline: 'Where the Groove Never Stops',
    description: 'Four-on-the-floor grooves with soulful melodies and infectious rhythms. The foundation of dance music culture.',
    color: '#8b5cf6',
    image: '/assets/1.jpeg',
  },
  {
    id: 'afro',
    name: 'Afro',
    tagline: 'Rhythms from the Motherland',
    description: 'Infectious African rhythms blended with modern electronic production. A celebration of roots and future.',
    color: '#a3e635',
    image: '/assets/2.jpeg',
  },
  {
    id: 'trance',
    name: 'Trance',
    tagline: 'Lose Yourself in the Sound',
    description: 'Euphoric melodies and driving beats that take you on a journey. Emotional peaks and transcendent moments.',
    color: '#ec4899',
    image: '/assets/3.jpeg',
  },
  {
    id: 'techno',
    name: 'Techno',
    tagline: 'The Pulse of the Underground',
    description: 'Raw, industrial, and hypnotic beats for the true heads. Dark rooms, strobe lights, and endless dancing.',
    color: '#f97316',
    image: '/assets/4.jpeg',
  },
];

const GenrePanel = ({ genre, index }) => {
  const panelRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div
      ref={panelRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: useTransform(() => y.get() * 0.5),
          scale: 1.1,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${genre.image})`,
          }}
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${genre.color}20 0%, transparent 50%, #0a0a0a 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* Genre number */}
        <motion.span
          className="text-8xl md:text-9xl font-black opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ color: genre.color }}
        >
          0{index + 1}
        </motion.span>

        {/* Genre name */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
          style={{ color: genre.color }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {genre.name}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {genre.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {genre.description}
        </motion.p>

        {/* Accent line */}
        <motion.div
          className="w-24 h-1 mx-auto mt-8 rounded-full"
          style={{ backgroundColor: genre.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Side color accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{
          background: `linear-gradient(to bottom, transparent, ${genre.color}, transparent)`,
        }}
      />
    </div>
  );
};

const GenreExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="experience" ref={containerRef} className="relative">
      {/* Section header - not sticky, just a normal header */}
      <div className="py-24 flex items-center justify-center bg-[#0a0a0a]">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Experience
          </h2>
          <p className="text-white/50 text-lg">
            Scroll to explore the genres
          </p>
        </motion.div>
      </div>

      {/* Genre panels */}
      <div className="relative">
        {genres.map((genre, index) => (
          <GenrePanel key={genre.id} genre={genre} index={index} />
        ))}
      </div>
    </section>
  );
};

export default GenreExperience;
