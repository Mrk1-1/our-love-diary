import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import { valentineConfig } from '@/config/valentineConfig';
import { Button } from '@/components/ui/button';
import TypewriterText from '@/components/TypewriterText';
import DollCharacter from '@/components/DollCharacter';

interface FallingPetal {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

const RoseDayPage = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [petals, setPetals] = useState<FallingPetal[]>([]);
  const [roseClicked, setRoseClicked] = useState(false);
  
  const dayContent = valentineConfig.days[0];

  const handleRoseClick = useCallback(() => {
    if (roseClicked) return;
    setRoseClicked(true);
    
    // Create falling petals
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
    }));
    
    setPetals(newPetals);
    
    // Show message after petals start falling
    setTimeout(() => setShowMessage(true), 1000);
    
    // Clear petals after animation
    setTimeout(() => setPetals([]), 6000);
  }, [roseClicked]);

  return (
    <div className="min-h-screen gradient-rose flex flex-col items-center justify-center relative overflow-hidden px-4">
      <FloatingParticles count={15} types={['petal', 'sparkle']} />
      
      {/* Falling petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-3xl pointer-events-none z-20"
          style={{ left: `${petal.x}%`, top: '-5%' }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            y: '120vh', 
            rotate: 720,
            x: [0, 30, -20, 40, 0],
            opacity: [1, 1, 0.8, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'easeIn',
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Day badge */}
        <motion.div
          className="bg-accent/20 backdrop-blur-sm rounded-full px-4 py-1 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-ui text-sm text-foreground">
            Day 1 • Rose Day 🌹
          </span>
        </motion.div>

        {/* Doll character with rose */}
        <motion.div
          className="relative mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 1, 
            type: "spring",
            stiffness: 50,
          }}
        >
          <DollCharacter 
            pose="holding" 
            item="rose"
            onClick={handleRoseClick}
          />
          
          {/* Tap hint */}
          {!roseClicked && (
            <motion.p
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-sm font-ui text-muted-foreground whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap the rose ✨
            </motion.p>
          )}
        </motion.div>

        {/* Message with typewriter effect */}
        {showMessage && (
          <motion.div
            className="max-w-md text-center bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-romantic"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypewriterText 
              text={dayContent.message}
              className="font-handwritten text-2xl md:text-3xl text-foreground leading-relaxed"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/calendar')}
          className="bg-card/50 backdrop-blur-sm hover:bg-card/80"
        >
          ← Back
        </Button>
        <Button
          onClick={() => navigate('/day/2')}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Next Day →
        </Button>
      </motion.div>
    </div>
  );
};

export default RoseDayPage;
