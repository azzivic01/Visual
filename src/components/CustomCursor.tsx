import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TOKENS } from '../tokens.ts';

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

  useEffect(() => {
    // Detecta dispositivo touch / celular
    const checkTouch = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detecta se o elemento sob o mouse é interativo
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, isVisible]);

  // Se for touch ou reduced motion, não renderiza
  if (isTouchDevice || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Ponto central de precisão */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: TOKENS.colors.accent,
          boxShadow: '0 0 10px rgba(200, 130, 82, 0.4)',
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHoveringInteractive ? 0 : 1,
          opacity: isHoveringInteractive ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.1,
        }}
      />

      {/* Anel expandido para microinteração em botões e fotos */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 border border-[#c88252]/60"
        style={{
          backgroundColor: isHoveringInteractive ? 'rgba(200, 130, 82, 0.08)' : 'transparent',
          backdropFilter: isHoveringInteractive ? 'invert(0.1)' : 'none',
        }}
        animate={{
          x: position.x,
          y: position.y,
          width: isHoveringInteractive ? 44 : 26,
          height: isHoveringInteractive ? 44 : 26,
          borderColor: isHoveringInteractive ? TOKENS.colors.accent : 'rgba(242, 239, 233, 0.35)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 260,
          mass: 0.15,
        }}
      />
    </>
  );
}
