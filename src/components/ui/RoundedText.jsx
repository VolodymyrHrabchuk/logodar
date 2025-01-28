"use client";

import { useEffect, useRef } from "react";

export default function CircularText({ onClick }) {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const loadAndDraw = async () => {
      try {
        const fontSize = 20;
        const separatorFontSize = fontSize * 1.5;
        await document.fonts.load(`400 ${fontSize}px 'Inter'`);
        await document.fonts.load(`400 ${separatorFontSize}px 'Inter'`);
        await document.fonts.load(`400 ${fontSize}px 'Inter'`);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";

        const text1 = "Натисни і отримай";
        const text2 = "Передбачення";
        const separator = "•";
        const radius = 120;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const drawCircularText = (rotation) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw "Натисни і отримай"
          ctx.font = `${fontSize}px 'Inter', sans-serif`;
          const text1WithSeparator = `${text1} ${separator} `;
          const chars1 = text1WithSeparator.split("");
          const angleStep1 = Math.PI / chars1.length;

          chars1.forEach((char, i) => {
            const charAngle = Math.PI + i * angleStep1 + rotation;
            const x = centerX + Math.cos(charAngle) * radius;
            const y = centerY + Math.sin(charAngle) * radius;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(charAngle + Math.PI / 2);
            if (char === separator) {
              ctx.font = `${separatorFontSize}px 'Inter', sans-serif`;
            }
            ctx.fillText(char, 0, 0);
            ctx.restore();
          });

          // Draw "ПЕРЕДБАЧЕННЯ"
          ctx.font = `400 ${fontSize}px 'Inter', sans-serif`;
          const text2WithSeparator = `${text2} ${separator} `;
          const chars2 = text2WithSeparator.split("");
          const angleStep2 = Math.PI / chars2.length;

          chars2.forEach((char, i) => {
            const charAngle = i * angleStep2 + rotation;
            const x = centerX + Math.cos(charAngle) * radius;
            const y = centerY + Math.sin(charAngle) * radius;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(charAngle + Math.PI / 2);
            if (char === separator) {
              ctx.font = `${separatorFontSize}px 'Inter', sans-serif`;
            }
            ctx.fillText(char, 0, 0);
            ctx.restore();
          });
        };

        const animate = () => {
          rotationRef.current += 0.01;
          drawCircularText(rotationRef.current);
          animationRef.current = requestAnimationFrame(animate);
        };

        animate();
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadAndDraw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className='relative w-[110px] h-[110px] sm:w-[180px] sm:h-[180px] rounded-full border-2 border-black flex items-center justify-center bg-white/30 backdrop-blur-md cursor-pointer'
      onClick={onClick}
    >
      <canvas ref={canvasRef} className='absolute w-full h-full' />
    </div>
  );
}
