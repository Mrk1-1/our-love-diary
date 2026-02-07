import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import { valentineConfig, isDateUnlocked, DEV_MODE } from '@/config/valentineConfig';
import { Button } from '@/components/ui/button';
import TypewriterText from '@/components/TypewriterText';
import DollCharacter from '@/components/DollCharacter';

const DayPage = () => {
  const navigate = useNavigate();
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const dayIndex = parseInt(dayNumber || '1') - 1;
  const [showMessage, setShowMessage] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const isValidDay = dayIndex >= 0 && dayIndex < valentineConfig.days.length;
  const dayContent = isValidDay ? valentineConfig.days[dayIndex] : null;
  const isUnlocked = Boolean(dayContent) && (DEV_MODE || isDateUnlocked(dayContent.date));
  const nextDayIndex = dayIndex + 1;
  const nextDayNumber = nextDayIndex < valentineConfig.days.length ? nextDayIndex + 1 : null;
  const isNextDayUnlocked = nextDayIndex < valentineConfig.days.length
    && (DEV_MODE || isDateUnlocked(valentineConfig.days[nextDayIndex].date));
  const prevDay = dayIndex > 0 ? dayIndex : null;

  useEffect(() => {
    if (!isValidDay || !isUnlocked) {
      navigate('/calendar');
    }
  }, [isValidDay, isUnlocked, navigate]);

  if (!dayContent || !isUnlocked) {
    return null;
  }

  const handleInteraction = () => {
    if (interacted) return;
    setInteracted(true);
    setTimeout(() => setShowMessage(true), 500);
  };

  const getItemForDay = () => {
    switch (dayContent.theme) {
      case 'rose': return 'rose';
      case 'chocolate': return 'chocolate';
      case 'teddy': return 'teddy';
      case 'promise': return 'scroll';
      case 'hug': return undefined;
      case 'kiss': return 'heart';
      case 'valentine': return 'heart';
      case 'proposal': return 'sign';
      default: return 'heart';
    }
  };

  const getPose = () => {
    switch (dayContent.theme) {
      case 'hug': return 'hugging';
      case 'proposal': return 'holding';
      default: return 'holding';
    }
  };

  const getGradientClass = () => {
    switch (dayContent.theme) {
      case 'rose': return 'gradient-rose';
      case 'promise':
      case 'proposal': return 'gradient-night';
      default: return 'gradient-romantic';
    }
  };

  return (
    <div className={`min-h-screen ${getGradientClass()} flex flex-col items-center justify-center relative overflow-hidden px-4`}>
      <FloatingParticles 
        count={15} 
        types={dayContent.theme === 'proposal' ? ['sparkle', 'heart'] : ['petal', 'sparkle']} 
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Day badge */}
        <motion.div
          className="bg-card/30 backdrop-blur-sm rounded-full px-4 py-1 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-ui text-sm text-foreground">
            Day {dayIndex + 1} • {dayContent.name} {dayContent.emoji}
          </span>
        </motion.div>

        {/* Doll character */}
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
            pose={getPose()} 
            item={getItemForDay()}
            onClick={handleInteraction}
          />
          
          {/* Tap hint */}
          {!interacted && (
            <motion.p
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-sm font-ui text-muted-foreground whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to interact ✨
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
        className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {prevDay !== null && (
          <Button
            variant="ghost"
            onClick={() => navigate(`/day/${prevDay}`)}
            className="bg-card/50 backdrop-blur-sm hover:bg-card/80"
          >
            ← Day {prevDay}
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => navigate('/calendar')}
          className="bg-card/50 backdrop-blur-sm hover:bg-card/80"
        >
          Calendar
        </Button>
        {nextDayNumber && (
          <Button
            onClick={() => {
              if (isNextDayUnlocked) {
                navigate(`/day/${nextDayNumber}`);
                return;
              }
              navigate('/calendar');
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Day {nextDayNumber} →
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default DayPage;
