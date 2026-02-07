import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingParticles from '@/components/FloatingParticles';

interface FallingHeart {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  size: number;
  points: number;
}

const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '🦋', '🌸', '✨'];
const GAME_DURATION = 30; // seconds

const LoveGamePage = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'ended'>('ready');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('loveGameHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [catchEffect, setCatchEffect] = useState<{ x: number; y: number; emoji: string } | null>(null);
  const heartIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Spawn hearts
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnHeart = () => {
      const isSpecial = Math.random() > 0.8;
      const newHeart: FallingHeart = {
        id: heartIdRef.current++,
        x: Math.random() * 80 + 10, // 10-90% of width
        emoji: isSpecial ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : '❤️',
        speed: 1.2 + Math.random() * 1.6,
        size: isSpecial ? 56 : 44,
        points: isSpecial ? 5 : 1,
      };
      setHearts(prev => [...prev, newHeart]);
    };

    const interval = setInterval(spawnHeart, 600);
    return () => clearInterval(interval);
  }, [gameState]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Save high score
  useEffect(() => {
    if (gameState === 'ended' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('loveGameHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  // Clean up hearts that fall off screen
  useEffect(() => {
    if (gameState !== 'playing') return;

    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => {
        const element = document.getElementById(`heart-${heart.id}`);
        if (!element) return true;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight + 50;
      }));
    }, 1000);

    return () => clearInterval(cleanup);
  }, [gameState]);

  const catchHeart = useCallback((heart: FallingHeart, e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;
    
    setScore(prev => prev + heart.points);
    setHearts(prev => prev.filter(h => h.id !== heart.id));
    setCatchEffect({ x: clientX, y: clientY, emoji: heart.emoji });
    setTimeout(() => setCatchEffect(null), 500);
  }, []);

  const startGame = () => {
    setScore(0);
    setHearts([]);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    heartIdRef.current = 0;
  };

  const getEndMessage = () => {
    if (score >= 100) return "Amazing! You're a love champion! 💖";
    if (score >= 50) return "Wonderful! Love is in the air! 💕";
    if (score >= 25) return "Sweet! Keep spreading love! 🌸";
    return "Nice try! Love grows with practice! 💗";
  };

  return (
    <div className="min-h-screen gradient-romantic relative overflow-hidden" ref={gameAreaRef}>
      <FloatingParticles count={15} types={['heart', 'sparkle']} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/calendar')}
          className="text-foreground hover:bg-background/20"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>

        {gameState === 'playing' && (
          <div className="flex items-center gap-4">
            <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <Heart size={18} className="text-primary fill-primary" />
              <span className="font-handwritten text-lg">{score}</span>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="font-handwritten text-lg">⏱️ {timeLeft}s</span>
            </div>
          </div>
        )}
      </div>

      {/* Game States */}
      <AnimatePresence mode="wait">
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="text-center px-6 max-w-md">
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💝
              </motion.div>
              <h1 className="font-handwritten text-4xl md:text-5xl text-foreground mb-4">
                Catch the Hearts!
              </h1>
              <p className="text-muted-foreground mb-2">
                Tap the falling hearts to catch them
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Special items (🦋🌸✨) give bonus points!
              </p>
              {highScore > 0 && (
                <p className="text-sm text-primary mb-4">
                  Your best: {highScore} 💕
                </p>
              )}
              <Button
                size="lg"
                onClick={startGame}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-ui px-8 py-6 rounded-full shadow-romantic"
              >
                <Heart className="mr-2" size={20} />
                Start Game
              </Button>
            </div>
          </motion.div>
        )}

        {gameState === 'ended' && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="text-center px-6 max-w-md bg-card/90 backdrop-blur-lg rounded-3xl p-8 shadow-romantic border border-border">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="font-handwritten text-3xl md:text-4xl text-foreground mb-2">
                Game Over!
              </h2>
              <p className="font-handwritten text-5xl text-primary mb-4">
                {score} ❤️
              </p>
              <p className="text-muted-foreground mb-2">{getEndMessage()}</p>
              {score >= highScore && score > 0 && (
                <motion.p
                  className="text-accent font-ui text-sm mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  🏆 New High Score! 🏆
                </motion.p>
              )}
              <div className="flex gap-3 justify-center mt-6">
                <Button
                  onClick={startGame}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/calendar')}
                  className="rounded-full"
                >
                  Back to Calendar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Hearts */}
      {gameState === 'playing' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              id={`heart-${heart.id}`}
              className="absolute cursor-pointer pointer-events-auto select-none"
              style={{
                left: `${heart.x}%`,
                fontSize: heart.size,
              }}
              initial={{ y: -50 }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 10 / heart.speed,
                ease: 'linear',
              }}
              onClick={(e) => catchHeart(heart, e)}
              onTouchStart={(e) => catchHeart(heart, e)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              {heart.emoji}
            </motion.div>
          ))}
        </div>
      )}

      {/* Catch Effect */}
      <AnimatePresence>
        {catchEffect && (
          <motion.div
            className="fixed pointer-events-none z-30 text-2xl"
            style={{ left: catchEffect.x, top: catchEffect.y }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            +{catchEffect.emoji === '❤️' ? '1' : '5'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default LoveGamePage;
