import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import { valentineConfig } from '@/config/valentineConfig';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen gradient-romantic flex items-center justify-center relative overflow-hidden">
      <FloatingParticles count={30} types={['heart', 'petal', 'sparkle']} />
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
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
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative hearts */}
        <motion.div
          className="text-6xl mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>

        {/* Greeting */}
        <motion.h1
          className="font-handwritten text-5xl md:text-6xl text-foreground mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {valentineConfig.landingPage.greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground font-ui mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {valentineConfig.landingPage.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={() => navigate('/calendar')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-ui text-lg px-8 py-6 rounded-full shadow-romantic transition-all duration-300 hover:scale-105 animate-gentle-pulse"
          >
            <span className="mr-2">✨</span>
            {valentineConfig.landingPage.ctaText}
          </Button>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 flex justify-center gap-4 text-3xl"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {['🌹', '💝', '✨'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
