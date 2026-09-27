import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[90] pointer-events-none bg-white/[0.04]">
      <div
        className="h-full bg-gradient-to-r from-[#E23B55] via-[#FF8FA3] to-[#E23B55] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(226,59,85,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
