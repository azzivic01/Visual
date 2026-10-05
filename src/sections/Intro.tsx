import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface IntroProps {
  brand: SiteContent['brand'];
  intro: SiteContent['intro'];
  onIntroComplete?: () => void;
}

const SESSION_INTRO_KEY = 'site_intro_viewed_session';

export default function Intro({ brand, intro, onIntroComplete }: IntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Se intro estiver desativada ou com reduced-motion, pula imediatamente
    if (!intro.enabled || shouldReduceMotion) {
      if (onIntroComplete) onIntroComplete();
      return;
    }

    // Verifica se já foi vista nesta sessão
    try {
      const alreadyViewed = sessionStorage.getItem(SESSION_INTRO_KEY);
      if (alreadyViewed === 'true') {
        if (onIntroComplete) onIntroComplete();
        return;
      }
    } catch {
      // fallback gracioso se sessionStorage for restrito
    }

    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem(SESSION_INTRO_KEY, 'true');
      } catch {
        // fallback
      }
      if (onIntroComplete) onIntroComplete();
    }, 1600);

    return () => clearTimeout(timer);
  }, [intro.enabled, shouldReduceMotion, onIntroComplete]);

  if (!isVisible) return null;

  return (
    <motion.aside
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 1.15, ease: TOKENS.animation.ease }}
      className="fixed inset-0 z-50 bg-[#0c0d0f] flex flex-col items-center justify-center p-8 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: TOKENS.animation.ease }}
        className="text-center space-y-3"
      >
        <span
          style={{ fontFamily: TOKENS.fonts.mono }}
          className="text-[10px] uppercase tracking-[0.3em] text-[#8e8b82] block"
        >
          {brand.name}
        </span>
        <p
          style={{ fontFamily: TOKENS.fonts.serif }}
          className="text-2xl sm:text-3xl italic text-[#f2efe9] font-normal"
        >
          {intro.statement}
        </p>
      </motion.div>
    </motion.aside>
  );
}
