import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        bg-white/[0.03] 
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        ${hover ? 'transition-all duration-500' : ''}
        ${className}
      `}
      whileHover={hover ? {
        scale: 1.02,
        borderColor: 'rgba(0, 212, 255, 0.3)',
        boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)',
      } : {}}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
