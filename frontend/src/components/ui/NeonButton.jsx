import { motion } from 'framer-motion';

const NeonButton = ({ 
  children, 
  variant = 'cyan', 
  size = 'md',
  className = '',
  onClick,
  ...props 
}) => {
  const variants = {
    cyan: {
      border: 'rgba(0, 212, 255, 0.5)',
      glow: 'rgba(0, 212, 255, 0.3)',
      text: '#00d4ff',
    },
    violet: {
      border: 'rgba(139, 92, 246, 0.5)',
      glow: 'rgba(139, 92, 246, 0.3)',
      text: '#8b5cf6',
    },
    green: {
      border: 'rgba(163, 230, 53, 0.5)',
      glow: 'rgba(163, 230, 53, 0.3)',
      text: '#a3e635',
    },
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const theme = variants[variant];

  return (
    <motion.button
      className={`
        relative overflow-hidden
        font-semibold
        rounded-full
        bg-black/50
        transition-colors duration-300
        ${sizes[size]}
        ${className}
      `}
      style={{
        border: `1px solid ${theme.border}`,
        color: theme.text,
      }}
      whileHover={{
        boxShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(135deg, ${theme.glow} 0%, transparent 50%)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default NeonButton;
