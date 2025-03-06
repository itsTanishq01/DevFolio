// Collection of game sound effects
const sounds = {
    move: new Audio('/sounds/move.mp3'),
    select: new Audio('/sounds/select.mp3'),
    back: new Audio('/sounds/back.mp3'),
  };
  
  // Set volume levels (initial volume, overridden by localStorage value in playSound)
  Object.values(sounds).forEach(sound => {
    sound.volume = 0.5;
  });
  
  export const playSound = (soundName: string) => {
    // Get volume from localStorage (or default to 0.5 if not set)
    const volume = parseFloat(localStorage.getItem('retroPortfolioVolume') || '0.5');

    // Check which sounds are available
    const sounds = {
      select: new Audio('/sounds/select.mp3'),
      move: new Audio('/sounds/move.mp3'),
      back: new Audio('/sounds/back.mp3'),
    };

    const sound = sounds[soundName as keyof typeof sounds];
    if (sound) {
      sound.volume = volume;
      sound.play().catch(err => console.error('Error playing sound:', err));
    }
  };