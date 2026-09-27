import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'image' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"]');
      const isDragTarget = target.closest('[data-cursor="drag"]');
      const isImageTarget = target.closest('[data-cursor="view"]');

      if (isDragTarget) {
        setCursorType('drag');
        setCursorLabel('DRAG');
      } else if (isImageTarget) {
        setCursorType('image');
        setCursorLabel('VIEW');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Magnetic Ring / Capsule */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-all duration-200"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'drag' || cursorType === 'image' ? 76 : cursorType === 'pointer' ? 44 : 26,
          height: cursorType === 'drag' || cursorType === 'image' ? 76 : cursorType === 'pointer' ? 44 : 26,
          backgroundColor:
            cursorType === 'drag' || cursorType === 'image'
              ? 'rgba(226, 59, 85, 0.95)'
              : cursorType === 'pointer'
              ? 'rgba(226, 59, 85, 0.16)'
              : 'transparent',
          borderColor: cursorType === 'default' ? 'rgba(226, 59, 85, 0.5)' : 'rgba(226, 59, 85, 0.9)',
          borderWidth: cursorType === 'default' ? 1.5 : 1,
        }}
      >
        {cursorLabel ? (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#FFF0F3] font-sans select-none">
            {cursorLabel}
          </span>
        ) : null}
      </motion.div>

      {/* Center Small Dot */}
      {cursorType === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E23B55] pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  );
};
