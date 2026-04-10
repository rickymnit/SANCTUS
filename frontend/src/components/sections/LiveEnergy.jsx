import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryApi } from '../../services/api';
import GlassCard from '../ui/GlassCard';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'live-shows', name: 'Live Shows' },
  { id: 'crowd', name: 'Crowd' },
  { id: 'studio', name: 'Studio' },
];

const LiveEnergy = () => {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await galleryApi.getAll();
        setImages(response.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        // Fallback data
        setImages([
          { id: '1', url: '/assets/1.jpeg', category: 'live-shows', title: 'Live Performance' },
          { id: '2', url: '/assets/2.jpeg', category: 'crowd', title: 'Crowd Energy' },
          { id: '3', url: '/assets/3.jpeg', category: 'studio', title: 'Studio Session' },
          { id: '4', url: '/assets/4.jpeg', category: 'live-shows', title: 'Event Night' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Live Energy
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Capturing the moments that define the experience
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <GlassCard className="w-full h-full" hover={false}>
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{image.title}</p>
                      <p className="text-white/50 text-sm capitalize">{image.category}</p>
                    </div>
                  </div>

                  {/* Glow border on hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 212, 255, 0.2)',
                    }}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full z-10"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image */}
            <motion.img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="relative z-10 max-w-full max-h-[85vh] object-contain rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white font-medium">{selectedImage.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LiveEnergy;
