import { motion } from 'framer-motion';

interface DollCharacterProps {
  pose: 'standing' | 'holding' | 'running' | 'hugging' | 'begging' | 'crying' | 'happy';
  item?: 'rose' | 'chocolate' | 'teddy' | 'scroll' | 'heart' | 'sign';
  onClick?: () => void;
  className?: string;
}

const DollCharacter = ({ pose, item, onClick, className = '' }: DollCharacterProps) => {
  // Simple cute doll character using emoji and CSS
  const getDollContent = () => {
    switch (pose) {
      case 'holding':
        return (
          <div className="relative">
            {/* Body */}
            <motion.div
              className="text-6xl md:text-8xl cursor-pointer"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onClick={onClick}
            >
              👧
            </motion.div>
            {/* Item */}
            {item && (
              <motion.div
                className="absolute -right-4 top-8 text-4xl md:text-5xl cursor-pointer"
                animate={{ 
                  rotate: [-5, 5, -5],
                  y: [0, -3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                onClick={onClick}
              >
                {item === 'rose' && '🌹'}
                {item === 'chocolate' && '🍫'}
                {item === 'teddy' && '🧸'}
                {item === 'scroll' && '📜'}
                {item === 'heart' && '💝'}
                {item === 'sign' && '💌'}
              </motion.div>
            )}
          </div>
        );
      
      case 'running':
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ 
              x: [0, 5, 0, -5, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🏃‍♀️
          </motion.div>
        );
      
      case 'hugging':
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🤗
          </motion.div>
        );
      
      case 'begging':
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🥺
          </motion.div>
        );
      
      case 'crying':
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            😢
          </motion.div>
        );
      
      case 'happy':
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🥰
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            👧
          </motion.div>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Subtle glow behind character */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
      
      {/* Character */}
      <div className="relative">
        {getDollContent()}
      </div>
      
      {/* Blush effect */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-4 flex justify-between pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-3 h-3 rounded-full bg-pink-300/50 blur-sm" />
        <div className="w-3 h-3 rounded-full bg-pink-300/50 blur-sm" />
      </motion.div>
    </div>
  );
};

export default DollCharacter;
