import React, { useEffect, useRef } from 'react';

export function AtmosphereCanvas({ mode = 'sunset' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool based on mode
    const count = mode === 'neon' ? 45 : mode === 'steam' ? 30 : 50;
    const particles = Array.from({ length: count }, () => {
      if (mode === 'steam') {
        // Steam rising from coffee mug (lower center/left)
        return {
          x: width * 0.35 + (Math.random() - 0.5) * 40,
          y: height * 0.72 + Math.random() * 20,
          radius: Math.random() * 3 + 2,
          alpha: Math.random() * 0.4 + 0.1,
          speedY: Math.random() * 0.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.4,
          grow: 0.05,
          color: 'rgba(230, 240, 255,'
        };
      } else if (mode === 'neon') {
        // Rain mist & glowing reflections for neon street
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 12 + 6,
          speedY: Math.random() * 8 + 10,
          speedX: Math.random() * 0.5 - 0.25,
          alpha: Math.random() * 0.3 + 0.1,
          color: Math.random() > 0.4 ? 'rgba(255, 30, 150,' : 'rgba(0, 240, 255,'
        };
      } else {
        // Sunset golden embers and beach dust
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.6 + 0.2,
          speedY: -(Math.random() * 0.5 + 0.2), // float upwards
          speedX: Math.random() * 0.6 + 0.2,   // drift right with sea breeze
          pulse: Math.random() * 0.02,
          color: Math.random() > 0.5 ? 'rgba(255, 180, 50,' : 'rgba(255, 90, 130,'
        };
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (mode === 'neon') {
          // Rain streaks with neon tint
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
          ctx.strokeStyle = `${p.color}${p.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        } else if (mode === 'steam') {
          // Soft puff expanding and fading upward
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();

          p.y -= p.speedY;
          p.x += p.speedX;
          p.radius += p.grow;
          p.alpha -= 0.003;

          if (p.alpha <= 0 || p.y < height * 0.5) {
            p.x = width * 0.35 + (Math.random() - 0.5) * 40;
            p.y = height * 0.72;
            p.radius = Math.random() * 3 + 2;
            p.alpha = Math.random() * 0.4 + 0.2;
          }
        } else {
          // Sunset floating glowing embers
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color + '0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;

          p.y += p.speedY;
          p.x += p.speedX;
          p.alpha += Math.sin(Date.now() * 0.003) * 0.01;

          if (p.y < 0) p.y = height;
          if (p.x > width) p.x = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
