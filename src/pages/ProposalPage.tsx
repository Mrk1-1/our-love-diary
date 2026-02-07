import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import { valentineConfig } from '@/config/valentineConfig';
import { Button } from '@/components/ui/button';
import DollCharacter from '@/components/DollCharacter';

const ProposalPage = () => {
  const navigate = useNavigate();
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({ x: 0, y: 0, scale: 1 });
  const [showConfetti, setShowConfetti] = useState(false);

  const dayContent = valentineConfig.days[7]; // Day 8 - Proposal

  const getDollPose = (): 'standing' | 'holding' | 'running' | 'hugging' | 'begging' | 'crying' | 'happy' => {
    if (yesClicked) return 'happy';
    if (noClickCount >= 5) return 'crying';
    if (noClickCount >= 3) return 'begging';
    return 'holding';
  };

  const getNoMessage = () => {
    const responses = valentineConfig.noButtonResponses;
    if (noClickCount < responses.length) {
      return responses[noClickCount].message;
    }
    return responses[responses.length - 1].message;
  };

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Move button randomly after 2nd click
    if (newCount >= 2) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 100;
      const scale = Math.max(0.5, 1 - newCount * 0.1);
      setNoButtonStyle({ x, y, scale });
    }
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setShowConfetti(true);
  };

  // Generate confetti hearts
  const confettiHearts = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    size: 20 + Math.random() * 30,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="min-h-screen gradient-night flex flex-col items-center justify-center relative overflow-hidden px-4">
      <FloatingParticles count={30} types={['sparkle', 'heart']} />

      {/* Confetti hearts */}
      {showConfetti && confettiHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed text-4xl pointer-events-none z-50"
          style={{ 
            left: `${heart.x}%`, 
            top: '-10%',
            fontSize: heart.size,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            y: '120vh', 
            rotate: heart.rotation + 360,
            opacity: [1, 1, 0.5, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'easeIn',
          }}
        >
          {['💖', '💕', '💗', '❤️', '💝'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* Fairy lights effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-sparkle"
            style={{
              left: `${5 + (i % 10) * 10}%`,
              top: `${10 + Math.floor(i / 10) * 5}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Day badge */}
        <motion.div
          className="bg-romantic/30 backdrop-blur-sm rounded-full px-4 py-1 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-ui text-sm text-deep-foreground">
            Day 8 • The Big Question 💖
          </span>
        </motion.div>

        {/* Doll character */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <DollCharacter pose={getDollPose()} item={yesClicked ? 'heart' : 'sign'} />
        </motion.div>

        {/* Message */}
        <motion.div
          className="max-w-md text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {yesClicked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="font-handwritten text-4xl md:text-5xl text-sparkle mb-4">
                Yay! 🎉💕
              </h2>
              <p className="font-handwritten text-2xl text-deep-foreground">
                Best decision ever! I can't wait to make memories with you 💝
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="font-handwritten text-3xl md:text-4xl text-deep-foreground mb-4">
                {dayContent.message}
              </h2>
              {noClickCount > 0 && (
                <motion.p
                  key={noClickCount}
                  className="font-ui text-lg text-accent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getNoMessage()}
                </motion.p>
              )}
            </>
          )}
        </motion.div>

        {/* Yes/No buttons */}
        {!yesClicked && (
          <div className="flex gap-4 items-center relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={handleYesClick}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-8 py-6 rounded-full shadow-romantic animate-gentle-pulse"
              >
                Yes! 💖
              </Button>
            </motion.div>

            <motion.div
              animate={{
                x: noButtonStyle.x,
                y: noButtonStyle.y,
                scale: noButtonStyle.scale,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                variant="ghost"
                onClick={handleNoClick}
                className="bg-muted/50 hover:bg-muted/70 text-muted-foreground text-lg px-6 py-5 rounded-full"
                style={{ fontSize: `${Math.max(12, 16 - noClickCount * 2)}px` }}
              >
                No...
              </Button>
            </motion.div>
          </div>
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
          onClick={() => navigate('/day/7')}
          className="bg-card/30 backdrop-blur-sm hover:bg-card/50 text-deep-foreground"
        >
          ← Day 7
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/calendar')}
          className="bg-card/30 backdrop-blur-sm hover:bg-card/50 text-deep-foreground"
        >
          Calendar
        </Button>
      </motion.div>
    </div>
  );
};

export default ProposalPage;
