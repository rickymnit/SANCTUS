import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const CursorGlow = () => {
  const { mousePosition } = useMousePosition();

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Secondary smaller glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.3,
        }}
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

export default CursorGlow;
