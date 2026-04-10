import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryApi } from '../../services/api';
import { useInView } from '../../hooks/useInView';
import SectionTitle from '../ui/SectionTitle';
import LoadingSpinner from '../ui/LoadingSpinner';

const GalleryGrid = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesRes, categoriesRes] = await Promise.all([
          galleryApi.getAll(),
          galleryApi.getCategories(),
        ]);
        setImages(imagesRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        // Fallback data
        setImages([
          { id: '1', url: '/assets/profile.jpeg', category: 'live-shows', title: 'Live Performance' },
          { id: '2', url: '/assets/roomSaturation.jpeg', category: 'crowd', title: 'Crowd Energy' },
          { id: '3', url: '/assets/Jalmahal.jpeg', category: 'studio', title: 'Studio Session' },
          { id: '4', url: '/assets/Balcony.jpeg', category: 'live-shows', title: 'Jal Mahal Night' },
        ]);
        setCategories([
          { id: 'live-shows', name: 'Live Shows' },
          { id: 'crowd', name: 'Crowd' },
          { id: 'studio', name: 'Studio' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  if (loading) {
    return (
      <section id="gallery" className="py-20 md:py-32 bg-dark-800">
        <div className="container mx-auto px-6 text-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 md:py-32 bg-dark-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle title="Gallery" subtitle="Capturing moments from the journey" />

        {/* Category Filter */}
        <div ref={ref} className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === 'all'
              ? 'bg-primary-500 text-black'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
          >
            All
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (index + 1) * 0.05 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                ? 'bg-primary-500 text-black'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{image.title}</p>
                    <p className="text-gray-400 text-sm">
                      {categories.find(c => c.id === image.category)?.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 p-3 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 p-3 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filteredImages[currentImageIndex].url}
              alt={filteredImages[currentImageIndex].title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryGrid;
