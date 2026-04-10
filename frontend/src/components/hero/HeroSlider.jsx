import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { genresApi } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const HeroSlider = () => {
  const [genres, setGenres] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genresApi.getAll();
        setGenres(response.data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        // Fallback genres
        setGenres([
          { id: '1', name: 'D r u m  &  B a s s', tagline: 'Feel the breakbeat energy', hero_image: '/assets/onedeck.jpeg', color: '#ff6b35' },
          { id: '2', name: 'H    o u s e', tagline: 'Where the groove never stops', hero_image: '/assets/1.jpeg', color: '#f59e0b' },
          { id: '3', name: 'A f r o', tagline: 'Rhythms from the motherland', hero_image: '/assets/2.jpeg', color: '#10b981' },
          { id: '4', name: 'T r a n c e', tagline: 'Lose yourself in the sound', hero_image: '/assets/3.jpeg', color: '#8b5cf6' },
          { id: '5', name: 'T e c h n o', tagline: 'The pulse of the underground', hero_image: '/assets/4.jpeg', color: '#06b6d4' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % genres.length);
  }, [genres.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + genres.length) % genres.length);
  }, [genres.length]);

  // Auto-advance slides
  useEffect(() => {
    if (genres.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [genres.length, nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentGenre = genres[currentIndex];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-dark-900">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        {currentGenre && (
          <motion.div
            key={currentGenre.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentGenre.hero_image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Color Overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${currentGenre.color}40 0%, transparent 50%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {currentGenre && (
            <motion.div
              key={currentGenre.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Genre Name */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-4 font-rave text-shadow-glow"
                style={{ color: currentGenre.color }}
              >
                {currentGenre.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                {currentGenre.tagline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href="#contact"
                  className="px-8 py-4 bg-primary-500 text-black font-bold rounded-full hover:bg-primary-400 transition-colors btn-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.a>
                <motion.a
                  href="#music"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Listen
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DJ Name - Always Visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            SANCTUS Portfolio
          </p>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {genres.length > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={32} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={32} />
          </motion.button>
        </>
      )}

      {/* Slide Indicators */}
      {genres.length > 1 && (
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {genres.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary-500'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
