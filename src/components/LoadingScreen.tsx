
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from '../utils/audioUtils';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

interface SnakeSegment {
  x: number;
  y: number;
}

interface Food {
  x: number;
  y: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showPressEnter, setShowPressEnter] = useState(false);
  const [gameText, setGameText] = useState("LOADING SYSTEM...");
  
  // Snake game constants - adjusted for better fit
  const GRID_SIZE = 20;
  const CELL_SIZE = 10;
  const GAME_WIDTH = 280;
  const GAME_HEIGHT = 200;
  const GRID_WIDTH = Math.floor(GAME_WIDTH / CELL_SIZE);
  const GRID_HEIGHT = Math.floor(GAME_HEIGHT / CELL_SIZE);
  
  // Snake game state
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
  ]);
  const [food, setFood] = useState<Food>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<'RIGHT' | 'LEFT' | 'UP' | 'DOWN'>('RIGHT');
  const [nextDirection, setNextDirection] = useState<'RIGHT' | 'LEFT' | 'UP' | 'DOWN'>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  
  // Game loop reference
  const gameLoopRef = useRef<number | null>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate random food position
  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1;
    const y = Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1;
    // Check if food spawns on snake
    const isOnSnake = snake.some(segment => segment.x === x && segment.y === y);
    if (isOnSnake) {
      return generateFood();
    }
    return { x, y };
  }, [snake]);
  
  // Loading progress simulation
  useEffect(() => {
    if (progress >= 100) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, 5 * (1 - prev / 100));
        const newProgress = Math.min(100, prev + increment);
        
        if (newProgress === 100) {
          setLoadingComplete(true);
          setTimeout(() => {
            setGameText("SYSTEM READY");
            setShowPressEnter(true);
            try {
              playSound('success');
            } catch (e) {
              console.log('Sound not available');
            }
          }, 500);
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  // Handle keyboard input for the game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      // Enter key when loading is complete
      if (e.key === 'Enter' && loadingComplete && showPressEnter) {
        setShowPressEnter(false);
        try {
          playSound('select');
        } catch (e) {
          console.log('Sound not available');
        }
        onLoadComplete();
        return;
      }
      
      // Game controls
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') {
            setNextDirection('UP');
          }
          break;
        case 'ArrowDown':
          if (direction !== 'UP') {
            setNextDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') {
            setNextDirection('LEFT');
          }
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') {
            setNextDirection('RIGHT');
          }
          break;
        case ' ':
          // Space to restart game or pause/unpause
          if (gameOver) {
            resetGame();
          } else {
            setGamePaused(prev => !prev);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, loadingComplete, showPressEnter, onLoadComplete, gameOver]);
  
  // Reset game
  const resetGame = useCallback(() => {
    setSnake([
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ]);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setGamePaused(false);
  }, [generateFood]);
  
  // Game loop
  useEffect(() => {
    if (gameOver || gamePaused) return;
    
    const moveSnake = () => {
      setDirection(nextDirection);
      
      setSnake(prevSnake => {
        // Create a new head based on current direction
        const head = { ...prevSnake[0] };
        
        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }
        
        // Check if snake hits wall
        if (
          head.x < 0 || 
          head.x >= GRID_WIDTH || 
          head.y < 0 || 
          head.y >= GRID_HEIGHT
        ) {
          setGameOver(true);
          try {
            playSound('gameOver');
          } catch (e) {
            console.log('Sound not available');
          }
          return prevSnake;
        }
        
        // Check if snake hits itself
        if (prevSnake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          try {
            playSound('gameOver');
          } catch (e) {
            console.log('Sound not available');
          }
          return prevSnake;
        }
        
        // Create new snake array with the new head
        const newSnake = [head, ...prevSnake];
        
        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
          // Snake grows by not removing the tail
          setFood(generateFood());
          setScore(prev => prev + 1);
          try {
            playSound('collect');
          } catch (e) {
            console.log('Sound not available');
          }
        } else {
          // Remove tail if snake didn't eat
          newSnake.pop();
        }
        
        return newSnake;
      });
    };
    
    const gameSpeed = 140 - Math.min(100, score * 2); // Game speeds up as score increases
    gameLoopRef.current = window.setTimeout(moveSnake, gameSpeed);
    
    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, [food, generateFood, nextDirection, score, gameOver, gamePaused]);
  
  // Draw game
  useEffect(() => {
    const canvas = gameCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw grid dots (for retro effect)
    ctx.fillStyle = '#306230';
    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        if ((x + y) % 2 === 0) {
          ctx.fillRect(x * CELL_SIZE + CELL_SIZE/2 - 1, y * CELL_SIZE + CELL_SIZE/2 - 1, 2, 2);
        }
      }
    }
    
    // Draw food
    ctx.fillStyle = '#e0f8d0';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    
    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake head
        ctx.fillStyle = '#e0f8d0';
      } else {
        // Snake body
        ctx.fillStyle = '#9bbc0f';
      }
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    
    // Draw game over text
    if (gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.7)';
      ctx.fillRect(50, 80, 200, 70);
      ctx.strokeStyle = '#9bbc0f';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 80, 200, 70);
      
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.fillStyle = '#e0f8d0';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', GAME_WIDTH / 2, 115);
      
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillText('PRESS SPACE', GAME_WIDTH / 2, 140);
    }
    
    // Draw paused text
    if (gamePaused && !gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.7)';
      ctx.fillRect(50, 80, 200, 70);
      ctx.strokeStyle = '#9bbc0f';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 80, 200, 70);
      
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.fillStyle = '#e0f8d0';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', GAME_WIDTH / 2, 115);
      
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillText('PRESS SPACE', GAME_WIDTH / 2, 140);
    }
  }, [snake, food, CELL_SIZE, GAME_WIDTH, GAME_HEIGHT, GRID_WIDTH, GRID_HEIGHT, gameOver, gamePaused]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-green-500 z-50 overflow-hidden">
      {/* Gameboy-inspired background */}
      <div className="absolute inset-0 bg-[#001800] opacity-70 z-0"></div>
      
      {/* Retro scanlines */}
      <div className="absolute inset-0 bg-scanline z-10"></div>
      
      {/* Pixel grid */}
      <div className="absolute inset-0 z-20 opacity-10" 
           style={{
             backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}>
      </div>
      
      {/* Gameboy-inspired frame - smaller and consistent with gameboy */}
      <div className="relative z-30 w-full max-w-[350px] p-4 rounded-lg border-8 border-[#8bac0f] bg-[#0f380f] shadow-[0_0_30px_rgba(139,172,15,0.3)]">
        <div className="mb-2 text-center bg-[#306230] py-1 rounded border-2 border-[#8bac0f]">
          <h2 className="text-lg font-pixel text-[#e0f8d0]">TANISHQ OS v1.0.4</h2>
          <div className="inline-block px-2 border border-[#8bac0f] bg-[#0f380f] rounded text-[#9bbc0f]">
            <span className="text-xs font-pixel tracking-wider">{gameText}</span>
          </div>
        </div>
        
        {/* Game screen area - consistent size */}
        <div className="relative bg-[#0f380f] border-4 border-[#9bbc0f] rounded overflow-hidden mb-2 flex justify-center items-center">
          <canvas 
            ref={gameCanvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="pixelated"
          />
          
          {/* Game controls info - simplified */}
          <div className="absolute bottom-1 left-1 text-[7px] text-[#9bbc0f] font-pixel">
            ↑↓←→: move | SPACE: {gameOver ? "restart" : "pause"}
          </div>
          
          {/* Game score */}
          <div className="absolute top-1 left-1 text-[8px] text-[#e0f8d0] font-pixel">
            SCORE: {score}
          </div>
        </div>
        
        {/* Loading bar - more compact */}
        {!loadingComplete && (
          <div className="bg-[#306230] p-1 border border-[#8bac0f] rounded mb-2">
            <div 
              className="h-2 bg-gradient-to-r from-[#8bac0f] to-[#e0f8d0] relative overflow-hidden transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-pattern-diagonal opacity-20"></div>
            </div>
          </div>
        )}
        
        {/* System info and loading status - simplified */}
        <div className="flex justify-between items-center">
          <div className="text-[8px] font-pixel text-[#9bbc0f]">
            {progress < 100 ? `${Math.floor(progress)}%` : 'READY'}
          </div>
          
          {/* Press ENTER notification - more compact */}
          {showPressEnter && (
            <div className="bg-[#306230] px-2 py-0.5 border border-[#8bac0f] rounded animate-pulse-light">
              <span className="text-sm font-pixel text-[#e0f8d0]">PRESS ENTER TO CONTINUE</span>
            </div>
          )}
          
          <div className="text-xs font-pixel text-[#9bbc0f]">
            {score > 0 && `HI-SCORE: ${score}`}
          </div>
        </div>
      </div>
      
      {/* Copyright footer */}
      <div className="absolute bottom-4 text-xs font-pixel text-[#8bac0f]/70 z-30">
        © 2024 TANISHQ NIMJE · SYSTEM v1.0.4
      </div>
    </div>
  );
};

export default LoadingScreen;
