import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface ServicosProps {
  servicos: SiteContent['servicos'];
}

export default function Servicos({ servicos }: ServicosProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  if (!servicos.enabled || servicos.items.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="servicos"
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Linhas de serviço e criação"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Cabeçalho da Seção com Número Grande Decorativo */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f2024]/60 gap-6">
          {servicos.sectionNumber && (
            <span
              aria-hidden="true"
              style={{ fontFamily: TOKENS.fonts.serif }}
              className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[7rem] md:text-[10rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none -z-10"
            >
              {servicos.sectionNumber}
            </span>
          )}

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
              >
                {servicos.kicker}
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
              {servicos.title}
            </h2>
          </div>

          <p className="max-w-[420px] text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
            {servicos.description}
          </p>
        </div>

        {/* Lista Editorial (Sem cartões) */}
        <div
          onMouseMove={handleMouseMove}
          className="relative divide-y divide-[#1f2024]/70"
        >
          {servicos.items.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative py-8 sm:py-10 transition-colors duration-300 hover:bg-[#121316]/50 flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-4 cursor-pointer"
              >
                {/* Índice e Título */}
                <div className="flex items-start md:items-center gap-6 md:gap-10">
                  <span
                    style={{ fontFamily: TOKENS.fonts.mono }}
                    className="text-xs tracking-[0.24em] text-[#52535a] group-hover:text-[#c8a261] transition-colors tabular-nums pt-1 md:pt-0"
                  >
                    {item.index}
                  </span>

                  <div>
                    <h3
                      style={{
                        fontFamily: TOKENS.fonts.sans,
                        fontSize: 'clamp(1.35rem, 2.2vw, 2rem)',
                        letterSpacing: '-0.02em',
                      }}
                      className="text-[#f2efe9] font-normal group-hover:text-white transition-colors"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#8e8b82] font-light mt-1.5 max-w-[500px]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Categoria e Prazo */}
                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-12 md:text-right pl-12 md:pl-0">
                  <div className="space-y-1">
                    <span
                      style={{ fontFamily: TOKENS.fonts.mono }}
                      className="text-[10px] uppercase tracking-[0.2em] text-[#c8a261] block"
                    >
                      {item.category}
                    </span>
                    <span
                      style={{ fontFamily: TOKENS.fonts.mono }}
                      className="text-[11px] text-[#6e7078] tracking-wider block"
                    >
                      {item.timeframe}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#26282f] flex items-center justify-center text-[#8e8b82] group-hover:text-[#f2efe9] group-hover:border-[#8e8b82] transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Imagem estática apenas no mobile */}
                <div className="md:hidden w-full h-44 rounded overflow-hidden mt-2 bg-[#141517]">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover contrast-[1.05]"
                  />
                </div>
              </div>
            );
          })}

          {/* Revelação Flutuante da Imagem no Desktop via Hover */}
          {!shouldReduceMotion && (
            <AnimatePresence>
              {hoveredIndex !== null && servicos.items[hoveredIndex] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: mousePos.x + 32,
                    y: mousePos.y - 120,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: TOKENS.animation.ease }}
                  className="hidden md:block pointer-events-none absolute z-30 w-72 h-48 rounded overflow-hidden shadow-2xl border border-white/10 bg-[#141517]"
                  style={{ top: 0, left: 0 }}
                >
                  <img
                    src={servicos.items[hoveredIndex].image.src}
                    alt={servicos.items[hoveredIndex].image.alt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover contrast-[1.06] brightness-[0.96]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono uppercase tracking-widest text-[#f2efe9]">
                    {servicos.items[hoveredIndex].title}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>

      </div>
    </section>
  );
}
