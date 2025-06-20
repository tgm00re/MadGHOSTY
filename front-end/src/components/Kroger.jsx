// src/components/Kroger.jsx
import React, { useState, useRef } from 'react';
import KrogerLogo from '../gallery/kroger/Kroger-logo.jpg'
import Image from 'react-bootstrap/Image';
import VictorySound from '../audio/victory.mp3'
import BooSound from '../audio/booing.mp3'

const KROGER_BLUE = '#00539C';
const KROGER_YELLOW = '#FFB81C';

export default function Kroger() {
  const hateBtnRef = useRef(null);
  const loveBtnRef = useRef(null);
  const containerRef = useRef(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const [hateBtnPos, setHateBtnPos] = useState({ bottom: 20, left: 20 });

  // Play sound (example chime)
  const playSound = () => {
    const audio = new Audio(VictorySound);
    audio.play();
  };

  const playBadSound = () => {
     const audio = new Audio(BooSound);
      audio.play();
  }

  // Confetti effect: simple colored circles that fade out
  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 1500);
  };

  const onLoveClick = () => {
    playSound();
    triggerConfetti();
  };

  const onHateClick = () => {
    playBadSound();
  }

  const moveHateButton = () => {
    const container = containerRef.current;
    const btn = hateBtnRef.current;
    const loveBtn = loveBtnRef.current;
    if (!container || !btn || !loveBtn) return;

    const containerRect = container.getBoundingClientRect();
    const loveRect = loveBtn.getBoundingClientRect();

    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    // Calculate random position within container boundaries
    // Avoid overlapping with love button by a buffer zone (50px)
    let newLeft, newBottom;
    let tries = 0;
    do {
      newLeft = Math.random() * (container.clientWidth - btnWidth - 40) + 20; // 20px margin left/right
      newBottom = Math.random() * (container.clientHeight - btnHeight - 60) + 20; // 20px margin bottom/top
      tries++;
      if (tries > 20) break; // prevent infinite loop
    } while (
      // Check horizontal overlap with love button
      newLeft + btnWidth + 50 > loveRect.left - containerRect.left &&
      newLeft < loveRect.right - containerRect.left + 50 &&
      // Check vertical overlap
      newBottom + btnHeight + 50 > container.clientHeight - (loveRect.bottom - containerRect.top) &&
      newBottom < container.clientHeight - (loveRect.top - containerRect.top) + 50
    );

    setHateBtnPos({ bottom: newBottom, left: newLeft });
  };

  return (
    <div
      ref={containerRef}
      style={{
        color: KROGER_YELLOW,
        height: '400px',
        position: 'relative',
        borderRadius: '12px',
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Logo placeholder */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image src={KrogerLogo} roundedCircle width={250} height={250} />
      </div>

      {/* Hate button */}
      <button
        ref={hateBtnRef}
        style={{
          position: 'absolute',
          bottom: hateBtnPos.bottom,
          left: hateBtnPos.left,
          backgroundColor: KROGER_YELLOW,
          color: KROGER_BLUE,
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'left 0.3s ease, bottom 0.3s ease',
        }}
        onMouseEnter={moveHateButton}
        onClick={onHateClick}
      >
        I HATE KROGER
      </button>

      {/* Love button */}
      <button
        ref={loveBtnRef}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: KROGER_YELLOW,
          color: KROGER_BLUE,
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          overflow: 'visible',
        }}
        onClick={onLoveClick}
      >
        I LOVE KROGER!!!
        {confettiActive && <Confetti parentRef={loveBtnRef} />}
      </button>
    </div>
  );
}

// Simple Confetti component — colorful circles exploding outwards briefly
function Confetti({ parentRef }) {
  const [particles, setParticles] = React.useState([]);
  React.useEffect(() => {
    if (!parentRef.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    const containerRect = parentRef.current.parentElement.getBoundingClientRect();
    const originX = rect.left - containerRect.left + rect.width / 2;
    const originY = rect.top - containerRect.top + rect.height / 2;

    const newParticles = Array.from({ length: 30 }).map(() => ({
      x: originX,
      y: originY,
      size: Math.random() * 6 + 4,
      color: randomColor(),
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 1.5) * 6,
      life: 30,
    }));
    setParticles(newParticles);
  }, [parentRef]);

  React.useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((oldParticles) =>
        oldParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15, // gravity
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <svg
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
      {particles.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.size} fill={p.color} />
      ))}
    </svg>
  );
}

function randomColor() {
  const colors = ['#FFB81C', '#00539C', '#FFE066', '#003C71', '#FFD95A'];
  return colors[Math.floor(Math.random() * colors.length)];
}
