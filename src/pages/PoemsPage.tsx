import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '@/components/FloatingParticles';

interface Poem {
  title: string;
  lines: string[];
}

const poems: Poem[] = [
  {
    title: "Forever Mine",
    lines: [
      "Just as the moon needs the night to shine,",
      "My head rests naturally in your lap divine.",
      "My heart wanders searching endlessly for you",
      "Will you be mine, forever true?",
      "",
      "Your eyes are my world, your breath my song,",
      "You are the king of my life, all along.",
      "In the gentle night, your arms embrace me tight,",
      "My love stands eternal with you in sight... ✨"
    ]
  },
  {
    title: "Sky to Star",
    lines: [
      "Stay forever, sky to star,",
      "No distance feels too far.",
      "Wherever life may roam or scar,",
      "My heart will find where you are... ❤️"
    ]
  },
  {
    title: "Silent Passing",
    lines: [
      "I see you walking down the hall,",
      "A smile that lightens up the day,",
      "I watch your shadow on the wall,",
      "But cannot find the words to say.",
      "",
      "You pass me by, a fleeting dream,",
      "My heart beats fast, a quiet plea,",
      "We're in the same world, it would seem,",
      "Yet you are miles away from me."
    ]
  },
  {
    title: "The Midnight Hour",
    lines: [
      "The hours crawl when I'm alone,",
      "Your face is painted on the night,",
      "A silent love I've never shown,",
      "That burns within me, soft and bright.",
      "",
      "I think of you till dawn breaks through,",
      "And wonder if you ever knew,",
      "That in the quiet, I am yours,",
      "Locked behind my silent doors."
    ]
  },
  {
    title: "The Unspoken Word",
    lines: [
      "I have so many words to say,",
      "Caught down deep, frozen in my heart,",
      "I want to turn and say hello,",
      "But shyness tears my hope apart.",
      "",
      "I stand there next to you,",
      "Silent for another day,",
      "Watching your smile from afar,",
      "While you slowly walk away."
    ]
  },
  {
    title: "The Shadow",
    lines: [
      "You are the shadow that I chase,",
      "Even when the sun is bright,",
      "I scan the crowd to find your face,",
      "And haunt myself with you all night.",
      "",
      "I know I cannot tell you,",
      "Of the love that I hold true,",
      "But in my heart, you'll always be,",
      "My one and only muse. 💜"
    ]
  },
  {
    title: "If Only You Knew",
    lines: [
      "I watched you walk through storms and sun,",
      "Still you would smile when day was done.",
      "I never spoke in human tongue,",
      "But loved you fiercely all along.",
      "",
      "If only you knew how my heart beats,",
      "Every time our eyes would meet,",
      "In silence, my love is complete,",
      "Forever yours, my heart's retreat. 💕"
    ]
  }
];

const PoemsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const nextPage = () => {
    if (currentPage < poems.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={20} types={['butterfly', 'flower', 'sparkle']} />
      
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/calendar')}
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-card border border-border hover:bg-card transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={24} className="text-foreground" />
      </motion.button>

      {/* Title */}
      <motion.div
        className="pt-8 pb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-handwritten text-foreground">
          Poems For You 💌
        </h1>
        <p className="text-muted-foreground mt-2">
          Page {currentPage + 1} of {poems.length}
        </p>
      </motion.div>

      {/* Notebook Container */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="relative max-w-2xl w-full perspective-1000">
          {/* Navigation Arrows */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 rounded-full bg-card shadow-card border border-border transition-all ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 hover:scale-110'
            }`}
          >
            <ChevronLeft size={28} className="text-foreground" />
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === poems.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 rounded-full bg-card shadow-card border border-border transition-all ${
              currentPage === poems.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 hover:scale-110'
            }`}
          >
            <ChevronRight size={28} className="text-foreground" />
          </button>

          {/* Notebook Page */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateY: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="relative bg-card rounded-2xl shadow-romantic p-8 md:p-12 border border-border"
              style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(to bottom, hsl(var(--card)), hsl(var(--muted) / 0.3))',
              }}
            >
              {/* Paper lines effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-primary/10"
                    style={{ top: `${(i + 1) * 6.5}%` }}
                  />
                ))}
                {/* Red margin line */}
                <div className="absolute left-12 top-0 bottom-0 border-l-2 border-highlight/20" />
              </div>

              {/* Poem Content */}
              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-handwritten text-foreground mb-8 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Heart className="text-highlight fill-highlight" size={24} />
                  {poems[currentPage].title}
                </motion.h2>

                <div className="space-y-3">
                  {poems[currentPage].lines.map((line, index) => (
                    <motion.p
                      key={index}
                      className={`text-lg md:text-xl font-handwritten leading-relaxed ${
                        line === '' ? 'h-4' : 'text-foreground/90'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Author signature */}
                <motion.div
                  className="mt-8 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-lg font-handwritten text-muted-foreground italic">
                    ~ With all my love 💕
                  </p>
                </motion.div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 text-2xl opacity-50">🦋</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-50">🌸</div>
            </motion.div>
          </AnimatePresence>

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {poems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentPage ? 1 : -1);
                  setCurrentPage(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemsPage;
