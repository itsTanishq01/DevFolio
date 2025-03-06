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
  try {
    let sound: HTMLAudioElement;

    switch(soundName) {
      case 'success':
        sound = new Audio('/sounds/success.mp3');
        break;
      case 'jump':
        sound = new Audio('/sounds/jump.mp3');
        sound.volume = 0.5;
        break;
      case 'coin':
        sound = new Audio('/sounds/coin.mp3');
        sound.volume = 0.3;
        break;
      default:
        sound = new Audio('/sounds/click.mp3');
    }

    sound.play().catch(err => {
      console.log('Audio playback prevented by browser policy:', err);
    });
  } catch (err) {
    console.log('Error playing sound:', err);
  }
};

// Generate a retro-style beep sound
export const generateRetroBeep = (frequency: number = 440, duration: number = 100, volume: number = 0.1) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      // Clean up
      setTimeout(() => {
        gainNode.disconnect();
        oscillator.disconnect();
      }, 100);
    }, duration);
  } catch (error) {
    console.error('Error generating retro beep:', error);
  }
};

import { useVolume } from '../context/VolumeContext';

export const playLoadingCompleteSound = () => {
  const loadingSound = new Audio('/sounds/loading-complete.mp3');
  loadingSound.volume = localStorage.getItem('volume') 
    ? parseFloat(localStorage.getItem('volume') || '0.5') 
    : 0.5;
  loadingSound.play().catch(err => console.error("Audio playback error:", err));
};