import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Sound', href: '#sound' },
  { name: 'Book', href: '#book' },
];

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScrollProgress();
  const isScrolled = scrollY > 100;

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className={`
            flex items-center gap-1 px-2 py-2 rounded-full
            transition-all duration-500
            ${isScrolled 
              ? 'bg-black/60 backdrop-blur-xl border border-white/10' 
              : 'bg-transparent'
            }
          `}
          animate={{
            boxShadow: isScrolled 
              ? '0 4px 30px rgba(0, 0, 0, 0.3)' 
              : '0 0 0 rgba(0, 0, 0, 0)',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="px-4 py-2 text-white font-rave text-xl tracking-wider"
            whileHover={{ scale: 1.05 }}
          >
            SANCTÜS
          </motion.a>

          {/* Divider */}
          <div className="w-px h-6 bg-white/20 mx-2" />

          {/* Links */}
          {navLinks.slice(1).map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
              <motion.span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400"
                whileHover={{ width: '60%' }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            p-3 rounded-full
            ${isScrolled || isOpen
              ? 'bg-black/60 backdrop-blur-xl border border-white/10' 
              : 'bg-transparent'
            }
          `}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu items */}
            <motion.div
              className="absolute top-24 left-6 right-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-3xl font-bold text-white py-3 border-b border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
