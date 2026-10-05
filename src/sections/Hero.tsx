import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface HeroProps {
  brandName: string;
  hero: SiteContent['hero'];
}

export default function Hero({ brandName, hero }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // Scroll mapping para o título gigante que encolhe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.65]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 12;
    const normY = (clientY / innerHeight - 0.5) * 12;
    setMouseOffset({ x: normX, y: normY });
  };

  const words = useMemo(() => {
    const list: Array<{ text: string; isHighlighted: boolean }> = [];
    if (hero.title.leadingText.trim()) {
      hero.title.leadingText.trim().split(/\s+/).forEach((w) => {
        list.push({ text: w, isHighlighted: false });
      });
    }
    if (hero.title.highlightedWord.trim()) {
      list.push({ text: hero.title.highlightedWord.trim(), isHighlighted: true });
    }
    if (hero.title.trailingText && hero.title.trailingText.trim()) {
      hero.title.trailingText.trim().split(/\s+/).forEach((w) => {
        list.push({ text: w, isHighlighted: false });
      });
    }
    return list;
  }, [hero.title]);

  if (!hero.enabled) return null;

  // Timings da coreografia cinematográfica
  const IMG_DURATION = shouldReduceMotion ? 0 : TOKENS.animation.durations.imageReveal;
  const KICKER_DELAY = shouldReduceMotion ? 0 : 1.2;
  const KICKER_DURATION = shouldReduceMotion ? 0 : TOKENS.animation.durations.kicker;
  const TITLE_START_DELAY = shouldReduceMotion ? 0 : 1.25;
  const WORD_DURATION = shouldReduceMotion ? 0 : TOKENS.animation.durations.word;
  const WORD_STAGGER = shouldReduceMotion ? 0 : TOKENS.animation.durations.wordStagger;
  const SUPPORTING_DELAY = shouldReduceMotion ? 0 : TITLE_START_DELAY + words.length * WORD_STAGGER + 0.15;
  const SUPPORTING_DURATION = shouldReduceMotion ? 0 : TOKENS.animation.durations.supporting;
  const BUTTONS_DELAY = shouldReduceMotion ? 0 : SUPPORTING_DELAY + 0.2;
  const BUTTONS_DURATION = shouldReduceMotion ? 0 : TOKENS.animation.durations.buttons;

  return (
    <section
      id="inicio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full min-h-[100svh] flex flex-col justify-center pt-24 pb-14 px-6 md:px-12 lg:px-16 overflow-x-hidden"
      aria-label="Primeira dobra"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* DESKTOP LAYOUT (1440px): Grade de 12 colunas com máscara em arco e título que encolhe */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center min-h-[72svh]">
          
          {/* Coluna Textual (Col 1-5) */}
          <div className="col-span-5 flex flex-col justify-between h-full py-4 z-20 pr-4">
            
            {/* Rótulo superior */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: KICKER_DURATION, delay: KICKER_DELAY, ease: TOKENS.animation.ease }}
              className="flex items-center gap-2.5 mb-2"
            >
              <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
              >
                {hero.kicker}
              </span>
            </motion.div>

            {/* Título Principal com escala e scroll encolhimento para o header */}
            <motion.div
              style={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: titleScale,
                      opacity: titleOpacity,
                      y: titleY,
                      transformOrigin: 'top left',
                    }
              }
              className="my-auto py-4"
            >
              {/* Nome monumental da marca antes do manifesto */}
              <div
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.35em] text-[#6e7078] mb-3 select-none"
              >
                {brandName}
              </div>

              <h1
                style={{
                  fontFamily: TOKENS.fonts.sans,
                  fontSize: 'clamp(2.4rem, 4.6vw, 5rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.025em',
                  textWrap: 'balance',
                }}
                className="font-normal text-[#f2efe9] select-none max-w-[620px]"
              >
                {words.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: WORD_DURATION,
                      delay: shouldReduceMotion ? 0 : TITLE_START_DELAY + idx * WORD_STAGGER,
                      ease: TOKENS.animation.ease,
                    }}
                    style={{
                      fontFamily: item.isHighlighted ? TOKENS.fonts.serif : TOKENS.fonts.sans,
                      color: item.isHighlighted ? TOKENS.colors.accent : TOKENS.colors.text,
                    }}
                    className={`inline-block mr-[0.24em] ${
                      item.isHighlighted
                        ? 'italic font-normal tracking-normal drop-shadow-[0_2px_12px_rgba(200,130,82,0.25)]'
                        : 'font-normal tracking-tight'
                    }`}
                  >
                    {item.text}
                  </motion.span>
                ))}
              </h1>

              {/* Texto de Apoio com Letra Capitular (drop cap de luxo) */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: SUPPORTING_DURATION, delay: SUPPORTING_DELAY, ease: TOKENS.animation.ease }}
                className="mt-6 max-w-[440px]"
              >
                <p className="text-[15px] leading-[1.68] font-light text-[#8e8b82] first-letter:text-4xl first-letter:font-serif first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-[#c88252]">
                  {hero.description}
                </p>
              </motion.div>

              {/* Botões com microinteração de preenchimento e seta que desliza */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: BUTTONS_DURATION, delay: BUTTONS_DELAY, ease: TOKENS.animation.ease }}
                className="mt-8 flex items-center gap-5"
              >
                {/* Botão Primário: preenchimento que cresce do canto + seta deslizante */}
                <a
                  href={hero.primaryAction.href}
                  style={{
                    backgroundColor: TOKENS.colors.text,
                    color: TOKENS.colors.bg,
                    fontFamily: TOKENS.fonts.sans,
                  }}
                  className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded text-[12px] font-medium uppercase tracking-[0.18em] overflow-hidden active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c0d0f]"
                >
                  {/* Preenchimento que cresce do canto */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#c88252] origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#f2efe9]">
                    {hero.primaryAction.label}
                  </span>
                  
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#f2efe9]" />
                </a>

                {/* Botão Secundário: sublinhado que 'desenha' no hover */}
                <a
                  href={hero.secondaryAction.href}
                  style={{ fontFamily: TOKENS.fonts.mono }}
                  className="group relative inline-flex items-center gap-2 py-3 px-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8e8b82] hover:text-[#f2efe9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
                >
                  <span>{hero.secondaryAction.label}</span>
                  <span
                    className="absolute bottom-1.5 left-2 right-2 h-[1px] bg-[#c88252] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    aria-hidden="true"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* Metadado Editorial */}
            {hero.metadataNote && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: SUPPORTING_DELAY, ease: TOKENS.animation.ease }}
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="pt-5 border-t border-[#1f2024]/70 flex items-center justify-between text-[11px] text-[#8e8b82]"
              >
                <span className="uppercase tracking-[0.2em] text-[#63615b]">
                  {hero.metadataNote.label}
                </span>
                <span className="tracking-wider text-[#8e8b82] tabular-nums">
                  {hero.metadataNote.value}
                </span>
              </motion.div>
            )}
          </div>

          {/* Coluna da Imagem (Col 6-12): Máscara em Arco Arquitetônico */}
          <div className="col-span-7 relative h-[74svh] flex items-center justify-center pl-2">
            <div className="relative w-full h-full overflow-hidden rounded-t-[180px] lg:rounded-t-[240px] rounded-b-[4px] bg-[#141517] border border-[#212328]/60 shadow-2xl">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                    : { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.2 }
                }
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                transition={{ duration: IMG_DURATION, ease: TOKENS.animation.ease }}
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full h-full relative"
              >
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={2400}
                  height={1350}
                  className="w-full h-full object-cover object-center contrast-[1.06] brightness-[0.96] select-none"
                />

                {/* Vinheta lateral suave para transição com o texto */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0c0d0f]/50 via-transparent to-[#0c0d0f]/20"
                  aria-hidden="true"
                />

                {/* Moldura da máscara em arco */}
                <div
                  className="absolute inset-0 rounded-t-[180px] lg:rounded-t-[240px] border border-white/10 pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* MOBILE COMPOSITION (390px): Composição própria e ergonômica com máscara em arco */}
        <div className="lg:hidden flex flex-col justify-between min-h-[82svh] py-2">
          {/* Imagem Vertical com Arco Suave */}
          <div className="relative w-full h-[42svh] min-h-[280px] rounded-t-[120px] rounded-b-[2px] overflow-hidden bg-[#141517] border border-[#212328]">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                  : { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.2 }
              }
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ duration: IMG_DURATION, ease: TOKENS.animation.ease }}
              className="w-full h-full relative"
            >
              <img
                src={hero.mobileImage ? hero.mobileImage.src : hero.image.src}
                alt={hero.mobileImage ? hero.mobileImage.alt : hero.image.alt}
                width={1080}
                height={1920}
                className="w-full h-full object-cover object-center contrast-[1.06] brightness-[0.96]"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0d0f] via-transparent to-transparent opacity-80"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* Rótulo e Título (Máximo 3 linhas) */}
          <div className="mt-4 px-1 flex-1 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: KICKER_DURATION, delay: KICKER_DELAY, ease: TOKENS.animation.ease }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-[1px] bg-[#c88252]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[10px] uppercase tracking-[0.24em] text-[#8e8b82] tabular-nums"
              >
                {hero.kicker}
              </span>
            </motion.div>

            <h1
              style={{
                fontFamily: TOKENS.fonts.sans,
                fontSize: 'clamp(2rem, 7.8vw, 3rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
              className="font-normal text-[#f2efe9] select-none"
            >
              {words.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: WORD_DURATION,
                    delay: shouldReduceMotion ? 0 : TITLE_START_DELAY + idx * WORD_STAGGER,
                    ease: TOKENS.animation.ease,
                  }}
                  style={{
                    fontFamily: item.isHighlighted ? TOKENS.fonts.serif : TOKENS.fonts.sans,
                    color: item.isHighlighted ? TOKENS.colors.accent : TOKENS.colors.text,
                  }}
                  className={`inline-block mr-[0.22em] ${
                    item.isHighlighted ? 'italic font-normal' : 'font-normal'
                  }`}
                >
                  {item.text}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: SUPPORTING_DURATION, delay: SUPPORTING_DELAY, ease: TOKENS.animation.ease }}
              className="mt-3"
            >
              <p className="text-[13.5px] leading-relaxed font-light text-[#8e8b82] line-clamp-2 first-letter:text-3xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:text-[#c88252]">
                {hero.description}
              </p>
            </motion.div>
          </div>

          {/* Botões Ergonômicos (Safe Area Aware) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: BUTTONS_DURATION, delay: BUTTONS_DELAY, ease: TOKENS.animation.ease }}
            className="mt-4 pt-3 border-t border-[#1f2024]/60 flex flex-col gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <a
              href={hero.primaryAction.href}
              style={{
                backgroundColor: TOKENS.colors.text,
                color: TOKENS.colors.bg,
                fontFamily: TOKENS.fonts.sans,
              }}
              className="w-full min-h-[48px] py-3.5 px-5 rounded text-[12px] font-medium uppercase tracking-[0.16em] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-200"
            >
              <span>{hero.primaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={hero.secondaryAction.href}
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="w-full py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#8e8b82] active:text-[#f2efe9]"
            >
              {hero.secondaryAction.label}
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
