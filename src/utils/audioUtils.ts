// Collection of game sound effects
const sounds = {
    move: new Audio('/sounds/move.mp3'),
    select: new Audio('/sounds/select.mp3'),
    back: new Audio('/sounds/back.mp3'),
  };
  
  // Set volume levels
  Object.values(sounds).forEach(sound => {
    sound.volume = 0.5;
  });
  
  export const playSound = (soundType: keyof typeof sounds) => {
    // Clone the audio to allow overlapping sounds
    const soundToPlay = sounds[soundType].cloneNode() as HTMLAudioElement;
    soundToPlay.volume = sounds[soundType].volume;
    soundToPlay.play().catch(e => console.error("Audio playback failed:", e));
  };
  