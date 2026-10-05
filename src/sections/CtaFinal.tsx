import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface CtaFinalProps {
  ctaFinal: SiteContent['ctaFinal'];
}

export default function CtaFinal({ ctaFinal }: CtaFinalProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!ctaFinal.enabled) return null;

  return (
    <section
      id="contato"
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-28 lg:py-36 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Chamada final para contato"
    >
      <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">
        
        {/* Frase Monumental com Palavra em Destaque */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: TOKENS.animation.ease }}
          style={{
            fontFamily: TOKENS.fonts.sans,
            fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            textWrap: 'balance',
          }}
          className="text-[#f2efe9] font-normal max-w-[900px] select-none"
        >
          {ctaFinal.statement.leading}{' '}
          <span
            style={{
              fontFamily: TOKENS.fonts.serif,
              color: TOKENS.colors.accent,
            }}
            className="italic font-normal"
          >
            {ctaFinal.statement.highlight}
          </span>{' '}
          {ctaFinal.statement.trailing}
        </motion.h2>

        {/* Descrição */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: TOKENS.animation.ease }}
          className="mt-6 text-sm sm:text-base text-[#8e8b82] font-light max-w-[520px] leading-relaxed"
        >
          {ctaFinal.description}
        </motion.p>

        {/* Botão de Ação */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: TOKENS.animation.ease }}
          className="mt-10"
        >
          <a
            href={ctaFinal.primaryAction.href}
            style={{
              backgroundColor: TOKENS.colors.text,
              color: TOKENS.colors.bg,
              fontFamily: TOKENS.fonts.sans,
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:tracking-[0.24em] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe9]"
          >
            <span>{ctaFinal.primaryAction.label}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Nota Secundária */}
        {ctaFinal.secondaryNote && (
          <p
            style={{ fontFamily: TOKENS.fonts.mono }}
            className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[#63615b]"
          >
            {ctaFinal.secondaryNote}
          </p>
        )}

      </div>
    </section>
  );
}
