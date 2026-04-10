import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const mixes = [
  {
    id: 1,
    title: 'Bolly Tech / Afro-House',
    description: 'Bollywood energy meets Afro-House grooves',
    duration: '1:12:00',
    image: '/assets/mix-bolly-afrohouse.jpeg',
    url: 'https://youtu.be/-X48UMxQw9c',
    color: '#a3e635',
  },
  {
    id: 2,
    title: 'Afro / Latin-House',
    description: 'Latin rhythms with modern House beats',
    duration: '58:00',
    image: '/assets/mix-afro-latinhouse.jpeg',
    url: 'https://youtu.be/b2X7h0o_HPM',
    color: '#f97316',
  },
  {
    id: 3,
    title: 'Liquid DnB / Jungle',
    description: 'Smooth Drum & Bass with soulful melodies',
    duration: '1:05:00',
    image: '/assets/mix-liquid-dnb.jpeg',
    url: 'https://youtu.be/pRS0Du1DF1M',
    color: '#00d4ff',
  },
];

const SoundSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section id="sound" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Sound
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Curated mixes and sets for every vibe
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 px-6 md:px-12 w-max"
            style={{ x }}
          >
            {mixes.map((mix, index) => (
              <motion.div
                key={mix.id}
                className="flex-shrink-0 w-[350px] md:w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <a
                  href={mix.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <GlassCard className="overflow-hidden">
                    {/* Image container */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={mix.image}
                        alt={mix.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                      
                      {/* Play button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: mix.color }}
                        >
                          <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                        </div>
                      </motion.div>

                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {mix.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {mix.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-4">
                        {mix.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm" style={{ color: mix.color }}>
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://www.instagram.com/sanctus.x3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
              boxShadow: '0 4px 30px rgba(253, 29, 29, 0.3)',
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            View All Reels @sanctus.x3
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SoundSection;
