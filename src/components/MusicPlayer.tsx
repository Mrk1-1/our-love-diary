import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, X } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Custom song for Vaishnavi
  const musicUrl = "/audio/Vaishnavi-for-you.mp3";

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Load saved preferences
    const savedVolume = localStorage.getItem('musicVolume');
    const savedMuted = localStorage.getItem('musicMuted');
    
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      if (audioRef.current) audioRef.current.volume = vol;
    }
    if (savedMuted === 'true') {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.muted = true;
    }

    // Auto-play the music
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser blocked autoplay, wait for user interaction
            const handleInteraction = () => {
              if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                  .then(() => setIsPlaying(true))
                  .catch(console.error);
              }
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('touchstart', handleInteraction);
            };
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction);
          });
      }
    };
    
    playMusic();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    localStorage.setItem('musicMuted', (!isMuted).toString());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    localStorage.setItem('musicVolume', newVolume.toString());
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Volume hint tooltip */}
      {!isExpanded && (
        <motion.div
          className="absolute -top-8 right-0 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-border whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">🎵 Tap to adjust volume</p>
        </motion.div>
      )}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 bg-card/95 backdrop-blur-lg rounded-2xl p-4 shadow-card border border-border min-w-[240px]"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
            
            <p className="text-sm text-foreground font-handwritten text-center mb-3">
              I picked this song thinking of you ❤️
            </p>
            
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                {isMuted ? (
                  <VolumeX size={18} className="text-muted-foreground" />
                ) : (
                  <Volume2 size={18} className="text-primary" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
              />
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Our Song 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button - Vinyl Record */}
      <motion.button
        onClick={() => {
          if (!isExpanded) {
            setIsExpanded(true);
          }
          togglePlay();
        }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-romantic flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Vinyl Record Visual */}
        <motion.div
          className="absolute inset-1 rounded-full bg-foreground/90"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            duration: 3, 
            repeat: isPlaying ? Infinity : 0, 
            ease: "linear" 
          }}
        >
          {/* Record grooves */}
          <div className="absolute inset-2 rounded-full border border-foreground/30" />
          <div className="absolute inset-4 rounded-full border border-foreground/30" />
          <div className="absolute inset-6 rounded-full bg-primary" />
        </motion.div>
        
        {/* Center Icon */}
        <Music size={16} className="relative z-10 text-primary-foreground" />
        
        {/* Playing indicator */}
        {isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-highlight"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default MusicPlayer;
