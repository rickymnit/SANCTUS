import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  href,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900';
  
  const variants = {
    primary: 'bg-primary-500 text-black hover:bg-primary-400 btn-glow',
    secondary: 'bg-dark-700 text-white border border-dark-600 hover:bg-dark-600 hover:border-primary-500/50',
    outline: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-black',
    ghost: 'bg-transparent text-gray-300 hover:text-primary-500 hover:bg-primary-500/10',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const Component = motion[href ? 'a' : 'button'];

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
