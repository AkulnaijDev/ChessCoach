// src/components/Snowfall.tsx
import { useEffect, useRef, useState } from 'react';

const pieces = [
    'src/assets/pawn.svg',
    'src/assets/bishop.svg',
    'src/assets/knight.svg',
    'src/assets/rook.svg',
    'src/assets/queen.svg',
    'src/assets/king.svg',

    'src/assets/black_pawn.svg',
    'src/assets/black_bishop.svg',
    'src/assets/black_knight.svg',
    'src/assets/black_rook.svg',
    'src/assets/black_queen.svg',
    'src/assets/black_king.svg'
];

interface SnowfallProps {
  enabled: boolean;
}

const Snowfall = ({ enabled }: SnowfallProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
    const animationId = useRef<number | null>(null);
const intervalId = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);
  const activePieces = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Handle visibility change
    const handleVisibilityChange = () => {
      setVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !visible || !containerRef.current) {
      // cleanup if disabled or not visible
      activePieces.current.forEach((p) => p.remove());
      activePieces.current = [];
      if (intervalId.current) clearInterval(intervalId.current);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      return;
    }

    const maxPieces = 50;

    const createPiece = () => {
      const img = document.createElement('img');
      img.src = pieces[Math.floor(Math.random() * pieces.length)];
      img.style.position = 'absolute';
      img.style.zIndex= "1";
      img.style.top = '-50px';
      img.style.left = `${Math.random() * 100}%`;
      img.style.width = `${20 + Math.random() * 50}px`;
      img.style.opacity = '0.7';
      img.style.transform = `rotate(${Math.random() * 360}deg)`;
      img.style.pointerEvents = 'none';
      containerRef.current?.appendChild(img);
      activePieces.current.push(img);

      let y = -50;
      const speed = 0.5 + Math.random() * 1.5;

      const animate = () => {
        y += speed;
        img.style.top = `${y}px`;
        if (y < window.innerHeight + 50) {
          animationId.current = requestAnimationFrame(animate);
        } else {
          if (containerRef.current && img.parentElement === containerRef.current) {
            containerRef.current.removeChild(img);
          }
          const idx = activePieces.current.indexOf(img);
          if (idx > -1) activePieces.current.splice(idx, 1);
        }
      };

      animationId.current = requestAnimationFrame(animate);
    };

    intervalId.current = setInterval(() => {
      if (activePieces.current.length < maxPieces) {
        createPiece();
      }
    }, 300);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      activePieces.current.forEach((p) => p.remove());
      activePieces.current = [];
    };
  }, [enabled, visible]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
};

export default Snowfall;
