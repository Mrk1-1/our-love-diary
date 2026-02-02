import { useState, useEffect, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'heart' | 'petal' | 'sparkle';
}

interface UseFloatingHeartsProps {
  count?: number;
  types?: ('heart' | 'petal' | 'sparkle')[];
}

export const useFloatingHearts = ({ 
  count = 20, 
  types = ['heart', 'petal'] 
}: UseFloatingHeartsProps = {}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const containerRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const createParticle = useCallback((id: number): Particle => {
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100, // Start below viewport
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.5 + 0.2),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.3,
      type,
    };
  }, [types]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: count }, (_, i) => ({
      ...createParticle(i),
      y: Math.random() * 100, // Spread across viewport initially
    }));
    setParticles(initialParticles);

    // Animation loop
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => {
          let newY = particle.y + particle.speedY;
          let newX = particle.x + particle.speedX;
          
          // Reset particle when it goes off screen
          if (newY < -10) {
            return {
              ...createParticle(particle.id),
              y: 110,
            };
          }
          
          // Wrap horizontally
          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: particle.rotation + particle.rotationSpeed,
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, createParticle]);

  return particles;
};

// Burst effect hook for click interactions
export const useHeartBurst = () => {
  const [bursts, setBursts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    particles: Array<{ angle: number; distance: number; size: number }>;
  }>>([]);

  const createBurst = useCallback((x: number, y: number) => {
    const id = Date.now();
    const particleCount = 12;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (360 / particleCount) * i + Math.random() * 30,
      distance: Math.random() * 50 + 30,
      size: Math.random() * 15 + 10,
    }));

    setBursts(prev => [...prev, { id, x, y, particles }]);

    // Remove burst after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id));
    }, 1000);
  }, []);

  return { bursts, createBurst };
};
