import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Heart } from 'lucide-react';
import { valentineConfig, isDateUnlocked, isToday, getDayNumber, DEV_MODE } from '@/config/valentineConfig';
import FloatingParticles from '@/components/FloatingParticles';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [hoveredLocked, setHoveredLocked] = useState<string | null>(null);

  const handleDayClick = (day: typeof valentineConfig.days[0], index: number) => {
    const unlocked = DEV_MODE || isDateUnlocked(day.date);
    if (unlocked) {
      navigate(`/day/${index + 1}`);
    }
  };

  return (
    <div className="min-h-screen gradient-sunset py-8 px-4 relative overflow-hidden">
      <FloatingParticles count={20} types={['butterfly', 'flower', 'sparkle']} />

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="font-handwritten text-4xl md:text-5xl text-foreground mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Our Valentine's Week 💕
        </motion.h1>
        <p className="text-muted-foreground font-ui">
          Each day unlocks a special surprise just for you
        </p>
      </motion.div>

      {/* Calendar Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {valentineConfig.days.map((day, index) => {
          const unlocked = DEV_MODE || isDateUnlocked(day.date);
          const today = isToday(day.date);
          const dayNumber = getDayNumber(day.date);

          return (
            <Tooltip key={day.date}>
              <TooltipTrigger asChild>
                <motion.div
                  className={`
                    relative rounded-2xl p-4 cursor-pointer transition-all duration-300
                    ${unlocked 
                      ? 'bg-card/80 backdrop-blur-sm shadow-card hover:shadow-romantic' 
                      : 'bg-muted/50 backdrop-blur-sm'
                    }
                    ${today ? 'ring-2 ring-accent animate-glow-pulse' : ''}
                  `}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={unlocked ? { scale: 1.05, y: -5 } : { scale: 1.02 }}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                  onClick={() => handleDayClick(day, index)}
                  onMouseEnter={() => !unlocked && setHoveredLocked(day.date)}
                  onMouseLeave={() => setHoveredLocked(null)}
                >
                  {/* Day number badge */}
                  <div className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${unlocked ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {dayNumber}
                  </div>

                  {/* Icon */}
                  <div className="text-center mb-3">
                    {unlocked ? (
                      <motion.div
                        className="text-4xl"
                        animate={today ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {day.emoji}
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>

                  {/* Day name */}
                  <h3 className={`
                    font-handwritten text-xl text-center
                    ${unlocked ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {day.name}
                  </h3>

                  {/* Date */}
                  <p className={`
                    text-xs text-center mt-1 font-ui
                    ${unlocked ? 'text-muted-foreground' : 'text-muted-foreground/50'}
                  `}>
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>

                  {/* Today indicator */}
                  {today && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs font-ui text-accent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Heart className="w-3 h-3 fill-accent" />
                      Today
                    </motion.div>
                  )}

                  {/* Unlock glow effect for unlocked days */}
                  {unlocked && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                  )}
                </motion.div>
              </TooltipTrigger>
              {!unlocked && (
                <TooltipContent 
                  side="top" 
                  className="bg-romantic text-romantic-foreground font-ui text-sm"
                >
                  <p>Patience… love tastes sweeter when waited 💌</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>

      {/* Poems Link */}
      <motion.button
        className="mt-6 mx-auto block bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card text-foreground hover:bg-card font-ui transition-all hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => navigate('/poems')}
      >
        📖 Read Poems Written For You
      </motion.button>

      {/* Back button */}
      <motion.button
        className="mt-4 mx-auto block text-muted-foreground hover:text-foreground font-ui transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
      >
        ← Back to entrance
      </motion.button>

      {/* Bottom decoration */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-2xl"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🦋
      </motion.div>
    </div>
  );
};

export default CalendarPage;
