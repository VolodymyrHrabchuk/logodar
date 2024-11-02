"use client";

import { useEffect, useRef } from "react";

export default function Component() {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0); // Holds the current rotation angle
  const animationRef = useRef(null); // Holds the animation frame ID

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Define canvas size
    const size = 300; // Consider reducing if not necessary
    canvas.width = size;
    canvas.height = size;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // **Ensure the Inter font is loaded before drawing**
    const loadAndDraw = async () => {
      try {
        // Define font sizes
        const mainFontSize = 20; // Increased font size for main text
        const separatorFontSize = mainFontSize * 2; // Double the main font size

        // Preload the font at the maximum required size to prevent reflows
        await document.fonts.load(`400 ${separatorFontSize}px 'Inter'`);
        await document.fonts.load(`400 ${mainFontSize}px 'Inter'`);

        // Set initial text properties
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";

        const text = "BEST SERVICES";
        const radius = 120;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Prepare the repeated text with separators
        const repetition = 2; // Number of repetitions
        const separator = "•"; // Single separator without spaces
        const repeatedText =
          Array(repetition).fill(text).join(` ${separator} `) +
          ` ${separator} `;
        const characters = repeatedText.split("");

        const totalAngle = Math.PI * 2; // Full circle
        const angleStep = totalAngle / characters.length;

        // Function to draw the circular text with a given rotation
        const drawCircularText = (rotation) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before each draw

          characters.forEach((char, i) => {
            // Determine if the current character is a separator
            const isSeparator = char === "•";

            // Set font size based on character type
            ctx.font = isSeparator
              ? `${separatorFontSize}px 'Inter', sans-serif`
              : `${mainFontSize}px 'Inter', sans-serif`;

            // Calculate the angle for the current character with rotation
            const charAngle = -Math.PI / 2 + i * angleStep + rotation; // Start from the top and add rotation

            const x = centerX + Math.cos(charAngle) * radius;
            const y = centerY + Math.sin(charAngle) * radius;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(charAngle + Math.PI / 2); // Rotate to align with the circle
            ctx.fillText(char, 0, 0);
            ctx.restore();
          });
        };

        // Animation loop function
        const animate = () => {
          rotationRef.current += 0.01; // Adjust rotation speed here
          drawCircularText(rotationRef.current);
          animationRef.current = requestAnimationFrame(animate);
        };

        // Start the animation
        animate();
      } catch (error) {
        console.error("Error loading fonts:", error);
        // Optionally, implement fallback mechanisms here
      }
    };

    loadAndDraw();

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className='relative w-[110px] h-[110px] sm:w-[180px] sm:h-[180px] rounded-full border-2 border-black flex items-center justify-center bg-white/30 backdrop-blur-md'>
      <canvas ref={canvasRef} className='absolute w-full h-full' />
    </div>
  );
}
