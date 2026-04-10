import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/sanctus.dj', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@sanctusdj', icon: Youtube },
  { name: 'Email', href: 'mailto:bookings.sanctus@gmail.com', icon: Mail },
  { name: 'Phone', href: 'tel:+919602091364', icon: Phone },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-black text-white uppercase tracking-wider font-rave mb-2">
              SANCTUS
            </h3>
            <p className="text-gray-500 text-sm">
              Jaipur-based DJ reshaping the soundscape
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-gray-400 hover:text-primary-500 hover:bg-primary-500/10 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-gray-600 text-sm">
              &copy; {currentYear}{' '}
              <span className="font-rave text-gray-500">SANCTUS</span>. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
