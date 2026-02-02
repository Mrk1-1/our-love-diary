import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText = ({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayedText.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < displayedText.split('\n').length - 1 && <br />}
        </span>
      ))}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-foreground ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default TypewriterText;
