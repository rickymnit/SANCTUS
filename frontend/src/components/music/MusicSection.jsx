import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import SectionTitle from '../ui/SectionTitle';

const mixes = [
  {
    id: 1,
    title: 'Bolly Tech / Afro-House',
    description: 'A fusion of Bollywood energy with Afro-House grooves',
    thumbnail: '/assets/thumbnail1.jpeg',
    youtubeUrl: 'https://youtu.be/-X48UMxQw9c',
    genre: 'Afro House',
    duration: '1:12:00',
  },
  {
    id: 2,
    title: 'Afro / Latin-House',
    description: 'Infectious Latin rhythms meet modern House beats',
    thumbnail: '/assets/thumbnail2.jpeg',
    youtubeUrl: 'https://youtu.be/b2X7h0o_HPM',
    genre: 'Latin House',
    duration: '58:00',
  },
  {
    id: 3,
    title: 'Liquid DnB / Jungle',
    description: 'Smooth Drum & Bass with soulful melodies',
    thumbnail: '/assets/thumbnail3.jpeg',
    youtubeUrl: 'https://youtu.be/pRS0Du1DF1M',
    genre: 'Drum & Bass',
    duration: '1:05:00',
  },
];

const MusicSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="music" className="py-20 md:py-32 bg-dark-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle 
          title="Music" 
          subtitle="Listen to my latest mixes and sets"
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-8 mt-16">
          {mixes.map((mix, index) => (
            <motion.div
              key={mix.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <motion.a
                href={mix.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                whileHover={{ y: -8 }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={mix.thumbnail}
                    alt={mix.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center group-hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play size={28} className="text-black ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white">
                    {mix.duration}
                  </div>

                  {/* Genre Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-primary-500/90 rounded-full text-xs text-black font-semibold">
                    {mix.genre}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">
                    {mix.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {mix.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary-500 text-sm font-medium">
                    <span>Watch on YouTube</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://www.instagram.com/sanctus.x3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            View All Reels @sanctus.x3
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
