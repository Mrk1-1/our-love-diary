import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import { valentineConfig } from '@/config/valentineConfig';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [subtitle] = useState(() => {
    const subtitles = valentineConfig.landingPage.subtitles;
    return subtitles[Math.floor(Math.random() * subtitles.length)];
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const floatingEmojis = ['🦋', '🌸', '💕', '✨', '🌺', '💗', '🌷'];

  return (
    <div className="min-h-screen gradient-romantic flex items-center justify-center relative overflow-hidden">
      <FloatingParticles count={25} types={['butterfly', 'flower', 'sparkle', 'heart']} />
      
      {/* Decorative floating emojis around the edges */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 rounded-full bg-secondary/40 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content card */}
      <motion.div
        className="relative z-10 text-center px-6 py-10 max-w-md mx-4"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Top decoration */}
        <motion.div
          className="flex justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {['🌸', '💕', '🌸'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{ 
                y: [0, -8, 0],
                rotate: i === 1 ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Cute envelope/heart decoration */}
        <motion.div
          className="text-6xl md:text-7xl mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💌
        </motion.div>

        {/* Greeting */}
        <motion.h1
          className="font-handwritten text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {valentineConfig.landingPage.greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-ui mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="h-px w-12 bg-primary/40" />
          <span className="text-xl">🦋</span>
          <div className="h-px w-12 bg-primary/40" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate('/calendar')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-ui text-lg px-8 py-6 rounded-full shadow-romantic transition-all duration-300 hover:scale-105 animate-gentle-pulse"
          >
            <span className="mr-2">✨</span>
            {valentineConfig.landingPage.ctaText}
            <span className="ml-2">✨</span>
          </Button>

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-card backdrop-blur-sm">
            <Instagram className="h-4 w-4 text-primary" />
            <span className="font-ui text-sm text-foreground">My Love For youuu</span>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-10 flex justify-center gap-4 text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {['🌷', '🦋', '💗', '🦋', '🌷'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -8, 0],
                rotate: emoji === '🦋' ? [0, 15, -15, 0] : 0,
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Cute message at bottom */}
        <motion.p
          className="mt-6 text-sm text-muted-foreground/70 font-ui italic"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Made with 💕 just for you
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
