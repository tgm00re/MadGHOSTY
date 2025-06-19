// src/components/RunnerGame.jsx
import { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../components/RunnerGameStyles.css'

import playerSrc from '../gallery/game/pj.jpg';
import obstacleSrc from '../gallery/game/jobApplication.png';
import flyingEnemySrc from '../gallery/game/pigglebert-removebg-preview.png';

const playerImg = new Image();
playerImg.src = playerSrc;

const obstacleImg = new Image();
obstacleImg.src = obstacleSrc;

const flyingEnemyImg = new Image();
flyingEnemyImg.src = flyingEnemySrc;


const GRAVITY = 0.6;
const JUMP_STRENGTH = -12;
const INITIAL_OBSTACLE_SPEED = 6;
const INITIAL_OBSTACLE_INTERVAL = 2000;
const DIFFICULTY_INCREASE_RATE = 0.0005; // speed increase per score point

export default function RunnerGame() {
    const canvasRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const player = useRef({ x: 50, y: 150, vy: 0, size: 30 });
    const obstacles = useRef([]);
    const lastTimeRef = useRef(0);
    const lastObstacleTimeRef = useRef(0);



    const handleRestart = () => {
        setIsGameOver(false);
        setScore(0);
        player.current = { x: 50, y: 150, vy: 0, size: 30 };
        obstacles.current = [];
        lastTimeRef.current = 0;
        lastObstacleTimeRef.current = 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleKey = (e) => {
            if (e.code === 'Space' && !isGameOver) {
                if (player.current.y >= canvas.height - player.current.size) {
                    player.current.vy = JUMP_STRENGTH;
                }
            }
        };

        window.addEventListener('keydown', handleKey);

        const spawnObstacle = () => {
            if (isGameOver) return;

            const isFlying = Math.random() < 0.1; // 10% chance flying enemy
            obstacles.current.push({
                x: canvas.width,
                y: isFlying ? canvas.height - 150 : canvas.height - 40,
                width: isFlying ? 30 : 20,
                height: isFlying ? 30 : 40,
                flying: isFlying,
            });
        };

        const checkCollision = (obs) => {
            const p = player.current;
            return (
                p.x < obs.x + obs.width &&
                p.x + p.size > obs.x &&
                p.y < obs.y + obs.height &&
                p.y + p.size > obs.y
            );
        };

        const gameLoop = (timestamp) => {
            if (isGameOver) {
                ctx.fillStyle = 'red';
                ctx.font = '32px sans-serif';
                ctx.fillText('Game Over', 100, 100);
                return;
            }
            lastTimeRef.current = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const obstacleSpeed = INITIAL_OBSTACLE_SPEED + score * DIFFICULTY_INCREASE_RATE;
            const obstacleInterval = Math.max(700, INITIAL_OBSTACLE_INTERVAL - score * 5);

            // Update player
            player.current.vy += GRAVITY;
            player.current.y += player.current.vy;
            if (player.current.y > canvas.height - player.current.size) {
                player.current.y = canvas.height - player.current.size;
                player.current.vy = 0;
            }

            // Draw player
            ctx.drawImage(playerImg, player.current.x, player.current.y, player.current.size, player.current.size);

            // Update & draw obstacles
            obstacles.current.forEach((obs) => {
                obs.x -= obstacleSpeed;
                const img = obs.flying ? flyingEnemyImg : obstacleImg;
                ctx.drawImage(img, obs.x, obs.y, obs.width, obs.height);

                if (checkCollision(obs)) {
                    setIsGameOver(true);
                }
            });

            obstacles.current = obstacles.current.filter((obs) => obs.x + obs.width > 0);

            setScore((prev) => prev + 1);

            if (timestamp - lastObstacleTimeRef.current > obstacleInterval) {
                spawnObstacle();
                lastObstacleTimeRef.current = timestamp;
            }

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKey);
        };
    }, [isGameOver, score]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 className="text-pink">MADI RUN</h2>
            {isGameOver && (
                <Button variant="pink" className="mt-3 pulse" onClick={handleRestart}>
                    🔁 Restart
                </Button>
            )}
            <p className="text-white">Score: {score}</p>
            <canvas
                ref={canvasRef}
                width={600}
                height={300}
                style={{ border: '2px solid hotpink', background: '#1a0a29' }}
            />
        </div>
    );
}
