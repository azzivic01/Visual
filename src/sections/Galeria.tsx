import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent, GalleryItem } from '../content.ts';

interface GaleriaProps {
  galeria: SiteContent['galeria'];
  onImageClick?: () => void;
}

export default function Galeria({ galeria, onImageClick }: GaleriaProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);

  // Paralaxe suave controlada pelo scroll na galeria
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Fechar ao pressionar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  // Travar rolagem do body quando o lightbox estiver aberto
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  if (!galeria.enabled || galeria.items.length === 0) return null;

  const handleOpen = (item: GalleryItem) => {
    setSelectedItem(item);
    if (onImageClick) onImageClick();
  };

  return (
    <section
      id="galeria"
      ref={galleryRef}
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Acervo e ensaios visuais"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Cabeçalho com Número Grande Decorativo */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f2024]/60 gap-6">
          {galeria.sectionNumber && (
            <span
              aria-hidden="true"
              style={{ fontFamily: TOKENS.fonts.serif }}
              className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[7rem] md:text-[10rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none -z-10"
            >
              {galeria.sectionNumber}
            </span>
          )}

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
              >
                {galeria.kicker}
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
              {galeria.title}
            </h2>
          </div>

          <p className="max-w-[420px] text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
            {galeria.description}
          </p>
        </div>

        {/* Composição Editorial com Tamanhos Desiguais e Paralaxe Suave */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Item 1: Vertical Proeminente (Col 1-5) com paralaxe */}
          {galeria.items[0] && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: TOKENS.animation.ease }}
              style={shouldReduceMotion ? {} : { y: parallaxY1 }}
              onClick={() => handleOpen(galeria.items[0])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(galeria.items[0])}
              className="md:col-span-5 group relative rounded-[2px] overflow-hidden bg-[#141517] border border-[#212328] min-h-[460px] md:min-h-[580px] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
              aria-label={`Ampliar imagem: ${galeria.items[0].title}`}
            >
              <img
                src={galeria.items[0].image.src}
                alt={galeria.items[0].image.alt}
                loading="lazy"
                width={1200}
                height={1600}
                className="w-full h-full object-cover contrast-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />

              {/* Vinheta leve unificadora */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                aria-hidden="true"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[#f2efe9]">{galeria.items[0].title}</h3>
                  <p className="text-xs text-[#8e8b82] font-light mt-1 max-w-[280px]">
                    {galeria.items[0].caption}
                  </p>
                </div>
                <div className="p-2.5 rounded-full bg-black/50 text-[#f2efe9] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Coluna Direita (Col 6-12): Dois itens com paralaxe contrária */}
          <div className="md:col-span-7 flex flex-col gap-8 justify-between">
            {/* Item 2: Horizontal Panorâmico */}
            {galeria.items[1] && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: TOKENS.animation.ease }}
                style={shouldReduceMotion ? {} : { y: parallaxY2 }}
                onClick={() => handleOpen(galeria.items[1])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(galeria.items[1])}
                className="group relative rounded-[2px] overflow-hidden bg-[#141517] border border-[#212328] h-[260px] md:h-[280px] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
                aria-label={`Ampliar imagem: ${galeria.items[1].title}`}
              >
                <img
                  src={galeria.items[1].image.src}
                  alt={galeria.items[1].image.alt}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover contrast-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-medium text-[#f2efe9]">{galeria.items[1].title}</h3>
                    <p className="text-xs text-[#8e8b82] font-light mt-0.5">{galeria.items[1].caption}</p>
                  </div>
                  <div className="p-2 rounded-full bg-black/50 text-[#f2efe9] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Item 3: Detalhe de Textura Tátil */}
            {galeria.items[2] && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: TOKENS.animation.ease }}
                onClick={() => handleOpen(galeria.items[2])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(galeria.items[2])}
                className="group relative rounded-[2px] overflow-hidden bg-[#141517] border border-[#212328] h-[240px] md:h-[260px] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
                aria-label={`Ampliar imagem: ${galeria.items[2].title}`}
              >
                <img
                  src={galeria.items[2].image.src}
                  alt={galeria.items[2].image.alt}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover contrast-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-medium text-[#f2efe9]">{galeria.items[2].title}</h3>
                    <p className="text-xs text-[#8e8b82] font-light mt-0.5">{galeria.items[2].caption}</p>
                  </div>
                  <div className="p-2 rounded-full bg-black/50 text-[#f2efe9] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>

      {/* Lightbox / Visualizador em Tela Cheia */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/94 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada: ${selectedItem.title}`}
          >
            {/* Barra Superior do Lightbox */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-medium text-[#f2efe9]">{selectedItem.title}</h3>
                <p className="text-xs text-[#8e8b82] mt-0.5">{selectedItem.caption}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={galeria.closeLabel}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagem Central */}
            <div className="my-auto flex items-center justify-center p-2 sm:p-6 max-h-[75vh]">
              <img
                src={selectedItem.image.src}
                alt={selectedItem.image.alt}
                width={1800}
                height={1200}
                className="max-h-[72vh] max-w-full object-contain rounded shadow-2xl"
              />
            </div>

            {/* Rodapé com Dica de Teclado */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#63615b]">
              <span>Pressione ESC para fechar</span>
              <span>{galeria.kicker}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
