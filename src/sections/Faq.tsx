import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface FaqProps {
  faq: SiteContent['faq'];
}

export default function Faq({ faq }: FaqProps) {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id || null);

  if (!faq.enabled || faq.items.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="duvidas"
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Perguntas frequentes"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        
        {/* Cabeçalho com Número Grande Decorativo */}
        <div className="relative max-w-[680px] mb-16">
          {faq.sectionNumber && (
            <span
              aria-hidden="true"
              style={{ fontFamily: TOKENS.fonts.serif }}
              className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[7rem] md:text-[10rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none -z-10"
            >
              {faq.sectionNumber}
            </span>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
            <span
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
            >
              {faq.kicker}
            </span>
          </div>
          <h2
            style={{
              fontFamily: TOKENS.fonts.sans,
              fontSize: 'clamp(1.75rem, 3.2vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
            className="text-[#f2efe9] font-normal mb-4"
          >
            {faq.title}
          </h2>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
            {faq.description}
          </p>
        </div>

        {/* Acordeão Acessível */}
        <div className="divide-y divide-[#1f2024]/80 border-y border-[#1f2024]/80">
          {faq.items.map((item, index) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${item.id}`;
            const headerId = `faq-header-${item.id}`;

            return (
              <div key={item.id} className="py-2">
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full py-6 flex items-center justify-between gap-6 text-left group transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
                  >
                    <div className="flex items-center gap-6">
                      <span
                        style={{ fontFamily: TOKENS.fonts.mono }}
                        className="text-xs text-[#52535a] group-hover:text-[#c8a261] transition-colors tabular-nums"
                      >
                        0{index + 1}
                      </span>
                      <span
                        style={{ fontFamily: TOKENS.fonts.sans }}
                        className={`text-base sm:text-lg font-medium transition-colors ${
                          isOpen ? 'text-[#f2efe9]' : 'text-[#d6d4ce] group-hover:text-white'
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[#2b2d34] flex items-center justify-center text-[#8e8b82] group-hover:border-[#8e8b82] group-hover:text-[#f2efe9] transition-colors shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: TOKENS.animation.ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12 pr-4 sm:pr-12 text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
