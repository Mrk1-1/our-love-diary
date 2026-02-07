import { motion } from 'framer-motion';
import { useFloatingHearts } from '@/hooks/useFloatingHearts';

interface FloatingParticlesProps {
  count?: number;
  types?: ('heart' | 'petal' | 'sparkle' | 'butterfly' | 'flower')[];
}

const FloatingParticles = ({ count = 25, types = ['heart', 'petal'] }: FloatingParticlesProps) => {
  const particles = useFloatingHearts({ count, types });

  const renderParticle = (type: 'heart' | 'petal' | 'sparkle' | 'butterfly' | 'flower') => {
    switch (type) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'petal':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <ellipse cx="12" cy="12" rx="6" ry="10" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-sparkle">
            <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
          </svg>
        );
      case 'butterfly':
        return (
          <span className="text-xl">🦋</span>
        );
      case 'flower':
        return (
          <span className="text-xl">🌸</span>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            rotate: particle.rotation,
          }}
          initial={false}
        >
          {renderParticle(particle.type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
