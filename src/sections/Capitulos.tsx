import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface CapitulosProps {
  capitulos: SiteContent['capitulos'];
}

export default function Capitulos({ capitulos }: CapitulosProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  if (!capitulos.enabled || capitulos.items.length === 0) return null;

  const currentItem = capitulos.items[activeChapter] || capitulos.items[0];

  return (
    <section
      id="capitulos"
      ref={sectionRef}
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Capítulos de processo"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Cabeçalho de Seção com Número Grande Decorativo */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f2024]/60 gap-4">
          {capitulos.sectionNumber && (
            <span
              aria-hidden="true"
              style={{ fontFamily: TOKENS.fonts.serif }}
              className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[7rem] md:text-[10rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none -z-10"
            >
              {capitulos.sectionNumber}
            </span>
          )}

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
              >
                {capitulos.kicker}
              </span>
            </div>
            <h2
              style={{
                fontFamily: TOKENS.fonts.sans,
                fontSize: 'clamp(1.75rem, 3.2vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
              className="text-[#f2efe9] font-normal"
            >
              {capitulos.title}
            </h2>
          </div>

          {/* Contador Tabular */}
          <div className="flex items-center gap-4">
            <span
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="text-xs tracking-[0.2em] text-[#8e8b82] uppercase tabular-nums"
            >
              Capítulo {currentItem.index}
            </span>
          </div>
        </div>

        {/* Grade Pinada: Imagem Fixa e Texto Interativo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Lado Esquerdo: Capítulos de Texto */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
            {capitulos.items.map((item, index) => {
              const isActive = index === activeChapter;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveChapter(index)}
                  onFocus={() => setActiveChapter(index)}
                  className={`text-left p-6 sm:p-8 rounded transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9] ${
                    isActive
                      ? 'bg-[#131418] border-[#2c2e36]'
                      : 'bg-transparent border-transparent hover:border-[#1f2024] opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{ fontFamily: TOKENS.fonts.mono }}
                      className={`text-[11px] tracking-[0.2em] uppercase tabular-nums ${
                        isActive ? 'text-[#c8a261]' : 'text-[#8e8b82]'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      style={{ fontFamily: TOKENS.fonts.mono }}
                      className="text-[10px] uppercase tracking-widest text-[#52535a]"
                    >
                      {item.subtitle}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: TOKENS.fonts.sans,
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      lineHeight: 1.15,
                    }}
                    className="text-[#f2efe9] font-medium mb-3"
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
                    {item.description}
                  </p>

                  {/* Indicador de progresso do capítulo ativo */}
                  {isActive && (
                    <motion.div
                      layoutId="chapterIndicator"
                      className="w-8 h-[2px] bg-[#c8a261] mt-5"
                      transition={{ duration: 0.4, ease: TOKENS.animation.ease }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Lado Direito: Imagem Pinada (Sticky) */}
          <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="relative w-full h-[52vh] sm:h-[60vh] max-h-[640px] rounded-[2px] overflow-hidden bg-[#141517] border border-[#212328]">
              {capitulos.items.map((item, index) => {
                const isActive = index === activeChapter;

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.04,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.65,
                      ease: TOKENS.animation.ease,
                    }}
                    className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      loading="lazy"
                      width={1600}
                      height={1200}
                      className="w-full h-full object-cover object-center contrast-[1.05] brightness-[0.95]"
                    />

                    {/* Vinheta e Traço de Contorno */}
                    <div
                      className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0d0f]/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] font-mono text-[#8e8b82] uppercase tracking-widest backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded border border-white/10">
                      <span className="text-[#f2efe9]">{item.title}</span>
                      <span className="tabular-nums text-[#c8a261]">{item.index}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
