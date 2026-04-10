import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  type = 'chars', // 'chars' | 'words'
  once = true,
}) => {
  const items = type === 'chars' ? text.split('') : text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: item === ' ' ? 'pre' : 'normal' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && index < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
