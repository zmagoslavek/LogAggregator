import React, { useEffect, useRef } from 'react';

export function BackgroundGradient() {
  const gradientRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      if (gradientRef.current) {
        gradientRef.current.style.background = `radial-gradient(at ${x * 100}% ${y * 100}%, #EE82EA, #aaeeee)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="background-gradient" ref={gradientRef}></div>;
}

export default BackgroundGradient;
