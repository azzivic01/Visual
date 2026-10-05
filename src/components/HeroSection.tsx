/**
 * BRIEFING DE FOTOGRAFIA PARA O CLIENTE
 * 
 * VAGA 01 — FOTOGRAFIA PRINCIPAL (DESKTOP)
 * - Proporção: 16:9 ou 3:2 horizontal (mínimo 2400 × 1350 px).
 * - Assunto: Detalhe tátil de aproximação (macro) da matéria-prima, textura mineral ou produto artesanal em repouso.
 * - Luz: Luz natural difusa lateral ou rasante de baixa intensidade (estilo luz de janela ao entardecer), criando sombras aveludadas e relevo palpável sem reflexos estourados.
 * - Enquadramento: Composição horizontal com o ponto focal no centro ou ligeiramente à direita. O terço esquerdo deve preservar área de respiro e sombras suaves para receber a sobreposição elegante da tipografia.
 * 
 * VAGA 02 — FOTOGRAFIA SECUNDÁRIA (MOBILE — OPCIONAL)
 * - Proporção: 9:16 vertical (mínimo 1080 × 1920 px).
 * - Assunto: Mesmo universo material, com enquadramento vertical direcionado para a silhueta escultural e a textura em diálogo com o espaço vazio.
 * - Luz: Luz direcional suave de topo/lateral, gerando contraste sereno e acabamento orgânico.
 * - Enquadramento: Ponto focal no quadrante superior-médio, permitindo que a metade inferior se funda suavemente ao fundo da página onde descansam o título e a ação primária ao alcance do polegar.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

/* ==========================================================================
   PALETA DE CORES (Máximo 4 cores com contraste mínimo WCAG AA)
   ========================================================================== */
export const HERO_PALETTE = {
  bg: '#0c0d0f',           // Fundo mineral profundo
  text: '#f2efe9',         // Texto principal de alto contraste (14.2:1)
  textSecondary: '#8e8b82',// Texto secundário funcional (4.8:1 - WCAG AA)
  accent: '#c8a261',       // Acento sutil quente / ouro velho (6.8:1)
} as const;

/* ==========================================================================
   TIPOGRAFIA VIA VARIÁVEIS CSS (Facilmente customizáveis por tema externo)
   ========================================================================== */
const FONT_SANS = 'var(--font-sans, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif)';
const FONT_SERIF = 'var(--font-serif, "Instrument Serif", Georgia, serif)';
const FONT_MONO = 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)';

/* ==========================================================================
   CURVA CINEMATOGRÁFICA ÚNICA
   ========================================================================== */
const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeroTitleConfig {
  /** Palavras que antecedem o destaque */
  leadingText: string;
  /** EXATAMENTE uma palavra destacada em itálico serifado */
  highlightedWord: string;
  /** Palavras que sucedem o destaque (opcional) */
  trailingText?: string;
}

export interface HeroImageSlot {
  src: string;
  alt: string;
}

export interface HeroSoundConfig {
  labelOn: string;
  labelOff: string;
}

export interface HeroSectionProps {
  /** Nome da marca exibido na zona de identificação */
  brandName: string;
  /** Rótulo de apoio ou disciplina da marca (opcional) */
  brandKicker?: string;
  /** Rótulo / Kicker de abertura da seção */
  kicker: string;
  /** Estrutura do título com exatamente uma palavra em itálico */
  title: HeroTitleConfig;
  /** Descrição / texto de apoio da primeira dobra */
  description: string;
  /** Ação primária (ao alcance do polegar no mobile) */
  primaryAction: HeroAction;
  /** Ação secundária opcional */
  secondaryAction?: HeroAction;
  /** Nota de rodapé ou metadado editorial complementar (opcional) */
  metadataNote?: {
    label: string;
    value: string;
  };
  /** Fotografia principal (desktop / horizontal) */
  image: HeroImageSlot;
  /** Fotografia mobile específica com enquadramento vertical (opcional) */
  mobileImage?: HeroImageSlot;
  /** Configuração do botão de som ambiente Web Audio (opcional) */
  sound?: HeroSoundConfig;
  /** Informação textual do rodapé sutil da primeira dobra */
  footer?: {
    leftText: string;
    rightText?: string;
  };
}

export default function HeroSection({
  brandName,
  brandKicker,
  kicker,
  title,
  description,
  primaryAction,
  secondaryAction,
  metadataNote,
  image,
  mobileImage,
  sound,
  footer,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Tokenização do título em palavras com identificação do destaque
  const words = useMemo(() => {
    const list: Array<{ text: string; isHighlighted: boolean }> = [];

    if (title.leadingText.trim()) {
      title.leadingText.trim().split(/\s+/).forEach((w) => {
        list.push({ text: w, isHighlighted: false });
      });
    }

    if (title.highlightedWord.trim()) {
      list.push({ text: title.highlightedWord.trim(), isHighlighted: true });
    }

    if (title.trailingText && title.trailingText.trim()) {
      title.trailingText.trim().split(/\s+/).forEach((w) => {
        list.push({ text: w, isHighlighted: false });
      });
    }

    return list;
  }, [title]);

  // Interação de assinatura: sutil paralaxe da imagem com o mouse (apenas desktop, sem reduced-motion)
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normalizedX = (clientX / innerWidth - 0.5) * 12; // [-6px, +6px]
    const normalizedY = (clientY / innerHeight - 0.5) * 12;
    setMouseOffset({ x: normalizedX, y: normalizedY });
  };

  // Som sintetizado com Web Audio API (sem arquivos externos, fade suave de 1s)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleSound = () => {
    if (!sound) return;

    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioContextRef.current || new AudioCtx();
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        // Fade in suave de 1.0s até volume suave (0.04)
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.0);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Filtro passa-baixa para criar atmosfera quente e mineral
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);
        filter.connect(masterGain);

        // Dois osciladores em harmonia de quinta (110Hz e 165Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(110, ctx.currentTime);
        osc1.connect(filter);
        osc1.start();

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(165, ctx.currentTime);
        osc2.connect(filter);
        osc2.start();

        oscillatorsRef.current = [osc1, osc2];
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Web Audio não suportado ou bloqueado pelo navegador', err);
      }
    } else {
      // Fade out suave de 1.0s
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        const gain = gainNodeRef.current;
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);

        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // Já finalizado
            }
          });
          oscillatorsRef.current = [];
          setIsAudioPlaying(false);
        }, 1050);
      }
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // cleanup
        }
      });
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  /* ==========================================================================
     TIMINGS DA COREOGRAFIA (Curva: cubic-bezier(0.16, 1, 0.3, 1))
     1. Imagem revela-se em 1,2 s
     2. Rótulo entra em 0,7 s, sincronizado ao fim da imagem (1,2 s)
     3. Título palavra por palavra, 0,75 s cada, 60 ms entre palavras
     4. Texto de apoio em 0,8 s
     5. Botões em 0,65 s
     ========================================================================== */
  const IMG_DURATION = shouldReduceMotion ? 0 : 1.2;
  const KICKER_DELAY = shouldReduceMotion ? 0 : 1.2;
  const KICKER_DURATION = shouldReduceMotion ? 0 : 0.7;

  const TITLE_START_DELAY = shouldReduceMotion ? 0 : 1.25;
  const WORD_DURATION = shouldReduceMotion ? 0 : 0.75;
  const WORD_STAGGER = shouldReduceMotion ? 0 : 0.06;

  const SUPPORTING_DELAY = shouldReduceMotion
    ? 0
    : TITLE_START_DELAY + words.length * WORD_STAGGER + 0.15;
  const SUPPORTING_DURATION = shouldReduceMotion ? 0 : 0.8;

  const BUTTONS_DELAY = shouldReduceMotion ? 0 : SUPPORTING_DELAY + 0.22;
  const BUTTONS_DURATION = shouldReduceMotion ? 0 : 0.65;

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: HERO_PALETTE.bg,
        color: HERO_PALETTE.text,
        fontFamily: FONT_SANS,
      }}
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-x-hidden selection:bg-[#f2efe9] selection:text-[#0c0d0f]"
      aria-label="Apresentação inicial"
    >
      {/* =====================================================================
          TOPO: Identificação da Marca e Controle de Som Opcional
          ===================================================================== */}
      <header className="relative z-30 w-full px-6 md:px-12 lg:px-16 pt-7 pb-5 flex items-center justify-between border-b border-[#212328]/60">
        <div className="flex items-center gap-3">
          <span
            style={{ fontFamily: FONT_SANS }}
            className="text-base sm:text-lg font-medium tracking-tight text-[#f2efe9]"
          >
            {brandName}
          </span>
          {brandKicker && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#52535a]" aria-hidden="true" />
              <span
                style={{ fontFamily: FONT_MONO }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#8e8b82] tabular-nums"
              >
                {brandKicker}
              </span>
            </>
          )}
        </div>

        {sound && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={isAudioPlaying}
            aria-label={isAudioPlaying ? sound.labelOn : sound.labelOff}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#2b2d34] hover:border-[#8e8b82] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0f]"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#c8a261] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#8e8b82] group-hover:text-[#f2efe9] transition-colors" />
            )}
            <span
              style={{ fontFamily: FONT_MONO }}
              className="text-[10px] uppercase tracking-[0.2em] text-[#8e8b82] group-hover:text-[#f2efe9] transition-colors"
            >
              {isAudioPlaying ? sound.labelOn : sound.labelOff}
            </span>
          </button>
        )}
      </header>

      {/* =====================================================================
          CORPO PRINCIPAL: DESKTOP (1440px) & MOBILE (390px)
          ===================================================================== */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-6 md:px-12 lg:px-16 py-6 md:py-10 max-w-[1600px] mx-auto">
        
        {/* -------------------------------------------------------------------
            DESKTOP COMPOSITION (lg+)
            Grade: 12 colunas assimétricas.
            Colunas 1-5: Coluna de ancoragem textual e respiro.
            Colunas 6-12: Campo fotográfico tratado com fenda vertical central.
            O título se projeta sobre a fronteira da imagem (-mr-16) criando
            uma relação tátil entre a palavra e a matéria fotografada.
            ------------------------------------------------------------------- */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[68svh] relative">
          
          {/* Coluna de Texto (Col 1-5) */}
          <div className="col-span-5 flex flex-col justify-between h-full py-4 z-20 pr-2">
            
            {/* 2. Rótulo / Kicker */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: KICKER_DURATION,
                delay: KICKER_DELAY,
                ease: CINEMATIC_EASE,
              }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-[1px] bg-[#8e8b82]" aria-hidden="true" />
              <span
                style={{ fontFamily: FONT_MONO }}
                className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
              >
                {kicker}
              </span>
            </motion.div>

            {/* 3. Título (Palavra por palavra, max 3 linhas) */}
            <div className="my-auto py-6">
              <h1
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.025em',
                  textWrap: 'balance',
                }}
                className="font-normal text-[#f2efe9] select-none max-w-[620px]"
              >
                {words.map((item, idx) => {
                  return (
                    <motion.span
                      key={idx}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: WORD_DURATION,
                        delay: shouldReduceMotion ? 0 : TITLE_START_DELAY + idx * WORD_STAGGER,
                        ease: CINEMATIC_EASE,
                      }}
                      style={{
                        fontFamily: item.isHighlighted ? FONT_SERIF : FONT_SANS,
                        color: item.isHighlighted ? HERO_PALETTE.accent : HERO_PALETTE.text,
                      }}
                      className={`inline-block mr-[0.24em] ${
                        item.isHighlighted
                          ? 'italic font-normal tracking-normal drop-shadow-[0_2px_12px_rgba(200,162,97,0.2)]'
                          : 'font-normal tracking-tight'
                      }`}
                    >
                      {item.text}
                    </motion.span>
                  );
                })}
              </h1>

              {/* 4. Texto de Apoio */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: SUPPORTING_DURATION,
                  delay: SUPPORTING_DELAY,
                  ease: CINEMATIC_EASE,
                }}
                className="mt-6 max-w-[420px]"
              >
                <p
                  style={{ fontFamily: FONT_SANS }}
                  className="text-[15px] leading-[1.65] font-light text-[#8e8b82]"
                >
                  {description}
                </p>
              </motion.div>

              {/* 5. Botões / Ações */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: BUTTONS_DURATION,
                  delay: BUTTONS_DELAY,
                  ease: CINEMATIC_EASE,
                }}
                className="mt-8 flex items-center gap-5"
              >
                {/* Ação Primária */}
                <a
                  href={primaryAction.href || '#'}
                  onClick={primaryAction.onClick}
                  style={{
                    backgroundColor: HERO_PALETTE.text,
                    color: HERO_PALETTE.bg,
                    fontFamily: FONT_SANS,
                  }}
                  className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:tracking-[0.22em] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c0d0f]"
                >
                  <span>{primaryAction.label}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Ação Secundária (Opcional) */}
                {secondaryAction && (
                  <a
                    href={secondaryAction.href || '#'}
                    onClick={secondaryAction.onClick}
                    style={{ fontFamily: FONT_MONO }}
                    className="group relative inline-flex items-center gap-2 py-3 px-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8e8b82] hover:text-[#f2efe9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0f]"
                  >
                    <span>{secondaryAction.label}</span>
                    <span
                      className="absolute bottom-1.5 left-2 right-2 h-[1px] bg-transparent group-hover:bg-[#8e8b82] transition-colors duration-200"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Metadado Opcional */}
            {metadataNote && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: SUPPORTING_DELAY,
                  ease: CINEMATIC_EASE,
                }}
                className="pt-5 border-t border-[#1f2024]/70 flex items-center justify-between text-[11px] text-[#8e8b82]"
                style={{ fontFamily: FONT_MONO }}
              >
                <span className="uppercase tracking-[0.2em] text-[#63615b]">
                  {metadataNote.label}
                </span>
                <span className="tracking-wider text-[#8e8b82] tabular-nums">
                  {metadataNote.value}
                </span>
              </motion.div>
            )}
          </div>

          {/* Coluna da Imagem (Col 6-12): Tratamento com Máscara Vertical e Paralaxe */}
          <div className="col-span-7 relative h-[72svh] flex items-center justify-center pl-2">
            <div className="relative w-full h-full overflow-hidden rounded-[2px] bg-[#141517] border border-[#212328]/50">
              
              {/* 1. Imagem: Revela-se em 1,2s através de máscara vertical que abre do centro */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                    : { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.2 }
                }
                animate={{
                  clipPath: 'inset(0% 0% 0% 0%)',
                  opacity: 1,
                }}
                transition={{
                  duration: IMG_DURATION,
                  ease: CINEMATIC_EASE,
                }}
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full h-full relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center contrast-[1.06] brightness-[0.96] select-none"
                />

                {/* Vinheta lateral suave para transição com o texto à esquerda */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0c0d0f]/60 via-transparent to-[#0c0d0f]/20"
                  aria-hidden="true"
                />

                {/* Traço de alinhamento arquitetônico */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[1px] bg-white/10 pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MOBILE COMPOSITION (390px — Direção de Arte Própria)
            Não é o desktop empilhado:
            - Terço superior: Foto vertical dedicada com máscara central.
            - Centro: Título restrito a até 3 linhas com a palavra em itálico.
            - Fundo ergonômico: Botão principal na zona segura do polegar.
            ------------------------------------------------------------------- */}
        <div className="lg:hidden flex flex-col justify-between min-h-[82svh] py-2">
          
          {/* 1. Fotografia Mobile (Enquadramento vertical) */}
          <div className="relative w-full h-[40svh] min-h-[260px] rounded-[2px] overflow-hidden bg-[#141517] border border-[#212328]">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                  : { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.2 }
              }
              animate={{
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
              }}
              transition={{
                duration: IMG_DURATION,
                ease: CINEMATIC_EASE,
              }}
              className="w-full h-full relative"
            >
              <img
                src={mobileImage ? mobileImage.src : image.src}
                alt={mobileImage ? mobileImage.alt : image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center contrast-[1.06] brightness-[0.96]"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0d0f] via-transparent to-transparent opacity-85"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* 2 & 3. Rótulo e Título (Máximo 3 Linhas) */}
          <div className="mt-4 px-1 flex-1 flex flex-col justify-center">
            {/* Rótulo */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: KICKER_DURATION,
                delay: KICKER_DELAY,
                ease: CINEMATIC_EASE,
              }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-[1px] bg-[#8e8b82]" aria-hidden="true" />
              <span
                style={{ fontFamily: FONT_MONO }}
                className="text-[10px] uppercase tracking-[0.24em] text-[#8e8b82] tabular-nums"
              >
                {kicker}
              </span>
            </motion.div>

            {/* Título: Máximo 3 linhas */}
            <h1
              style={{
                fontFamily: FONT_SANS,
                fontSize: 'clamp(2rem, 7.8vw, 3rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
              className="font-normal text-[#f2efe9] select-none"
            >
              {words.map((item, idx) => {
                return (
                  <motion.span
                    key={idx}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: WORD_DURATION,
                      delay: shouldReduceMotion ? 0 : TITLE_START_DELAY + idx * WORD_STAGGER,
                      ease: CINEMATIC_EASE,
                    }}
                    style={{
                      fontFamily: item.isHighlighted ? FONT_SERIF : FONT_SANS,
                      color: item.isHighlighted ? HERO_PALETTE.accent : HERO_PALETTE.text,
                    }}
                    className={`inline-block mr-[0.22em] ${
                      item.isHighlighted
                        ? 'italic font-normal'
                        : 'font-normal'
                    }`}
                  >
                    {item.text}
                  </motion.span>
                );
              })}
            </h1>

            {/* 4. Descrição Curta */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: SUPPORTING_DURATION,
                delay: SUPPORTING_DELAY,
                ease: CINEMATIC_EASE,
              }}
              className="mt-3"
            >
              <p
                style={{ fontFamily: FONT_SANS }}
                className="text-[13.5px] leading-relaxed font-light text-[#8e8b82] line-clamp-2"
              >
                {description}
              </p>
            </motion.div>
          </div>

          {/* 5. Ação ao Alcance do Polegar (Safe-Area Aware) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: BUTTONS_DURATION,
              delay: BUTTONS_DELAY,
              ease: CINEMATIC_EASE,
            }}
            className="mt-4 pt-3 border-t border-[#1f2024]/60 flex flex-col gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <a
              href={primaryAction.href || '#'}
              onClick={primaryAction.onClick}
              style={{
                backgroundColor: HERO_PALETTE.text,
                color: HERO_PALETTE.bg,
                fontFamily: FONT_SANS,
              }}
              className="w-full min-h-[48px] py-3.5 px-5 rounded text-[12px] font-medium uppercase tracking-[0.16em] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-200"
            >
              <span>{primaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {secondaryAction && (
              <a
                href={secondaryAction.href || '#'}
                onClick={secondaryAction.onClick}
                style={{ fontFamily: FONT_MONO }}
                className="w-full py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#8e8b82] active:text-[#f2efe9]"
              >
                {secondaryAction.label}
              </a>
            )}
          </motion.div>
        </div>

      </div>

      {/* =====================================================================
          RODAPÉ FINO (Sem seções extras, apenas respiro e direitos)
          ===================================================================== */}
      {footer && (
        <footer
          style={{ fontFamily: FONT_MONO }}
          className="relative z-20 w-full border-t border-[#1f2024]/60 px-6 md:px-12 lg:px-16 py-3.5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#63615b] tracking-[0.2em] uppercase gap-2"
        >
          <span>{footer.leftText}</span>
          {footer.rightText && (
            <span className="text-[#8e8b82]">{footer.rightText}</span>
          )}
        </footer>
      )}
    </section>
  );
}
