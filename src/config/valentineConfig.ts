// Valentine's Week Content Configuration
// Easily customize all messages, poems, and content here

export interface DayContent {
  date: string;
  name: string;
  emoji: string;
  message: string;
  theme: 'rose' | 'chocolate' | 'teddy' | 'promise' | 'hug' | 'kiss' | 'valentine' | 'proposal';
  gradient: string;
}

export interface Poem {
  title: string;
  lines: string[];
}

export interface Song {
  title: string;
  artist: string;
  reason: string;
  spotifyLink?: string;
}

export const valentineConfig = {
  landingPage: {
    greeting: "Hi my Vaishnavi 💕",
    subtitle: "This little world is just for you.",
    ctaText: "Enter Our World →"
  },

  days: [
    {
      date: "2026-02-07",
      name: "Rose Day",
      emoji: "🌹",
      message: "This rose is not just a flower,\nit's every time you made my heart smile 🌹",
      theme: "rose" as const,
      gradient: "from-pink-200 via-rose-300 to-pink-400"
    },
    {
      date: "2026-02-08",
      name: "Chocolate Day",
      emoji: "🍫",
      message: "Life is sweet…\nbut somehow you make it sweeter 🍫💖",
      theme: "chocolate" as const,
      gradient: "from-amber-100 via-rose-200 to-pink-300"
    },
    {
      date: "2026-02-09",
      name: "Teddy Day",
      emoji: "🧸",
      message: "This bear will hug you when I can't,\nbut nothing hugs like I do 🧸💕",
      theme: "teddy" as const,
      gradient: "from-orange-100 via-amber-200 to-rose-200"
    },
    {
      date: "2026-02-10",
      name: "Promise Day",
      emoji: "💫",
      message: "I promise to choose you,\nevery single day,\neven on the hard ones 💫",
      theme: "promise" as const,
      gradient: "from-violet-200 via-purple-300 to-indigo-400"
    },
    {
      date: "2026-02-11",
      name: "Hug Day",
      emoji: "🤗",
      message: "If I could, I'd pause the world\nand stay here hugging you forever 🤗",
      theme: "hug" as const,
      gradient: "from-purple-200 via-pink-300 to-rose-300"
    },
    {
      date: "2026-02-12",
      name: "Kiss Day",
      emoji: "😘",
      message: "This kiss carries everything\nI'm too shy to say out loud 😘",
      theme: "kiss" as const,
      gradient: "from-pink-300 via-rose-400 to-red-400"
    },
    {
      date: "2026-02-13",
      name: "Valentine's Day",
      emoji: "💝",
      message: "Today and every day,\nyou are my favorite person in the world 💝",
      theme: "valentine" as const,
      gradient: "from-rose-300 via-pink-400 to-purple-500"
    },
    {
      date: "2026-02-14",
      name: "Date Proposal",
      emoji: "💖",
      message: "Will you go on a date with me? 💖",
      theme: "proposal" as const,
      gradient: "from-indigo-400 via-purple-500 to-pink-500"
    }
  ] as DayContent[],

  poems: [
    {
      title: "You",
      lines: [
        "In a world of endless noise,",
        "Your voice is my favorite sound.",
        "In a crowd of a thousand faces,",
        "Yours is the only one I seek.",
        "",
        "You are my morning sun,",
        "My evening star,",
        "My reason to believe",
        "That love is real."
      ]
    },
    {
      title: "Forever",
      lines: [
        "I don't know what forever means,",
        "But when I look at you,",
        "I think I understand.",
        "",
        "It's the way your laugh",
        "Makes everything brighter.",
        "It's the way your hand in mine",
        "Feels like home."
      ]
    },
    {
      title: "My Heart",
      lines: [
        "Before you, my heart was quiet,",
        "A room with closed curtains.",
        "Then you walked in,",
        "And opened every window.",
        "",
        "Now the light pours in,",
        "And I finally understand",
        "What it means to feel alive."
      ]
    }
  ] as Poem[],

  songs: [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      reason: "Because when I hear this song, I can only think of dancing with you in our kitchen."
    },
    {
      title: "Can't Help Falling in Love",
      artist: "Elvis Presley",
      reason: "The classic. Because falling for you was the easiest thing I ever did."
    },
    {
      title: "All of Me",
      artist: "John Legend",
      reason: "Every word of this song is exactly how I feel about you."
    }
  ] as Song[],

  missYouMessages: [
    "Thinking of you right now too 💗",
    "Distance means nothing when you mean everything",
    "Missing you is my heart's way of reminding me how much you mean to me",
    "You're my favorite thought today",
    "Just wanted to remind you: you're amazing ✨",
    "I'm sending you a virtual hug right now 🤗",
    "Even miles apart, you're still my everything",
    "Can't wait to see your smile again",
    "You make my heart skip a beat, even from far away",
    "Every moment without you feels incomplete",
    "You're the first thing I think about when I wake up 💕",
    "Counting down the moments until I see you again",
    "Your love gives me strength",
    "I carry you with me everywhere I go",
    "No one compares to you, ever",
    "You're my forever person 💖",
    "The best part of my day is knowing you exist",
    "I'm so grateful the universe brought us together",
    "You make ordinary moments extraordinary",
    "My heart belongs to you, always",
    "I fall in love with you more every single day",
    "You're my happy place 🏠",
    "Life is beautiful because of you",
    "Thank you for being you",
    "You're the answer to every wish I've ever made",
    "I love the way you love me",
    "Together is my favorite place to be",
    "You complete me in ways words can't describe",
    "My soul recognized you before my eyes did",
    "You're the love story I always dreamed of"
  ],

  whisperNotes: [
    "You're my favorite thought today 💭",
    "Just wanted to remind you: you're amazing ✨",
    "I'm smiling just thinking about you right now",
    "You make everything better",
    "Did I mention I love you today? 💕",
    "You're so special to me",
    "I'm the luckiest person in the world",
    "Thank you for being mine",
    "You light up my world",
    "Every love song makes sense now because of you"
  ],

  hiddenMemories: {
    photos: [] as string[],
    voiceNote: "",
    insideJokes: [
      "Remember when we...",
      "That time you made me laugh so hard...",
      "Our secret language..."
    ]
  },

  noButtonResponses: [
    { pose: "begging", message: "Pleaseee? 🥺" },
    { pose: "moving", message: "You can't escape love!" },
    { pose: "angry", message: "Why would you even try NO? 😤" },
    { pose: "shrinking", message: "Is this really happening?" },
    { pose: "crying", message: "My heart just cracked a little… 😢" },
    { pose: "dramatic", message: "Love is pain. 💔" },
    { pose: "impossible", message: "You know you want to say YES! 💕" }
  ]
};

// Date utility functions
export const isDateUnlocked = (dateStr: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateStr);
  
  // Set both to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  return today >= targetDate;
};

export const isToday = (dateStr: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateStr);
  
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
};

export const getDayNumber = (dateStr: string): number => {
  const date = new Date(dateStr);
  return date.getDate() - 6; // Feb 7 = Day 1, Feb 14 = Day 8
};

// For testing - set to true to unlock all days
export const DEV_MODE = false;
