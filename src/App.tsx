/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { siteContent } from './content.ts';
import CustomCursor from './components/CustomCursor.tsx';
import Header from './sections/Header.tsx';
import Intro from './sections/Intro.tsx';
import Hero from './sections/Hero.tsx';
import Capitulos from './sections/Capitulos.tsx';
import Servicos from './sections/Servicos.tsx';
import Galeria from './sections/Galeria.tsx';
import Visite from './sections/Visite.tsx';
import Faq from './sections/Faq.tsx';
import CtaFinal from './sections/CtaFinal.tsx';
import Rodape from './sections/Rodape.tsx';

export default function App() {
  // Estado e síntese do som ambiente via Web Audio API (sem arquivos externos obrigatórios)
  const [isSoundActive, setIsSoundActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    // Se o cliente forneceu um audioSrc opcional em content.ts, prioriza o áudio real com fade
    if (siteContent.header.sound.audioSrc) {
      if (!audioElementRef.current) {
        const audio = new Audio(siteContent.header.sound.audioSrc);
        audio.loop = true;
        audio.volume = 0;
        audioElementRef.current = audio;
      }

      const audio = audioElementRef.current;
      if (!isSoundActive) {
        audio.play().then(() => {
          let vol = 0;
          const fadeInterval = setInterval(() => {
            vol = Math.min(0.2, vol + 0.02);
            audio.volume = vol;
            if (vol >= 0.2) clearInterval(fadeInterval);
          }, 100);
          setIsSoundActive(true);
        }).catch(() => {});
      } else {
        let vol = audio.volume;
        const fadeInterval = setInterval(() => {
          vol = Math.max(0, vol - 0.02);
          audio.volume = vol;
          if (vol <= 0) {
            clearInterval(fadeInterval);
            audio.pause();
            setIsSoundActive(false);
          }
        }, 100);
      }
      return;
    }

    // Caso padrão: síntese pura com Web Audio API
    if (!isSoundActive) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioContextRef.current || new AudioCtx();
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        // Fade in suave de 1.0s até volume suave (0.035)
        masterGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.0);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Filtro passa-baixa para criar ressonância mineral sutil
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);
        filter.connect(masterGain);

        // Harmônicos suaves de baixa frequência (110Hz e 165Hz)
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
        setIsSoundActive(true);
      } catch (err) {
        console.warn('Web Audio não suportado no ambiente atual', err);
      }
    } else {
      // Fade out suave de 1.0s ao desligar
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
              // já finalizado
            }
          });
          oscillatorsRef.current = [];
          setIsSoundActive(false);
        }, 1050);
      }
    }
  };

  // Feedback auditivo sutil ao abrir item da galeria (caso som esteja ligado)
  const handleGalleryClick = () => {
    if (!isSoundActive || !audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);

      clickGain.gain.setValueAtTime(0.02, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(clickGain);
      clickGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // silencioso
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
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0c0d0f] text-[#f2efe9] antialiased selection:bg-[#f2efe9] selection:text-[#0c0d0f] overflow-x-hidden relative">
      {/* Cursor Personalizado (Apenas Desktop, Desativado em Touch e Reduced-Motion) */}
      <CustomCursor />

      {/* Faixa de Luz Diagonal de Janela (Ideia Visual Central: luz suave atravessando o fundo escuro) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute -top-60 -left-60 w-[150vw] h-[170vh] opacity-[0.038] rotate-[26deg] bg-gradient-to-r from-transparent via-[#f2efe9] to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 1. Header Fixo com Navegação e Som */}
      <Header
        brand={siteContent.brand}
        header={siteContent.header}
        onSoundClick={toggleSound}
        isSoundActive={isSoundActive}
      />

      {/* 2. Intro Cinematográfica Curta (1.5s, pulada nas visitas seguintes) */}
      <Intro
        brand={siteContent.brand}
        intro={siteContent.intro}
      />

      {/* Conteúdo Principal da Landing Page */}
      <main className="relative z-10">
        {/* 3. Hero com Imagem em Arco e Título que Encolhe para o Header */}
        <Hero brandName={siteContent.brand.name} hero={siteContent.hero} />

        {/* 4. Capítulos com Imagem Pinada e Contador Tabular 01/03 */}
        <Capitulos capitulos={siteContent.capitulos} />

        {/* 5. Serviços em Lista Editorial com Revelação no Hover */}
        <Servicos servicos={siteContent.servicos} />

        {/* 6. Galeria Editorial com Paralaxe Suave e Lightbox Esc */}
        <Galeria galeria={siteContent.galeria} onImageClick={handleGalleryClick} />

        {/* 7. Visite com Horário, Endereço e WhatsApp Real */}
        <Visite visite={siteContent.visite} />

        {/* 8. FAQ com Acordeão Acessível */}
        <Faq faq={siteContent.faq} />

        {/* 9. CTA Final com Frase Monumental */}
        <CtaFinal ctaFinal={siteContent.ctaFinal} />
      </main>

      {/* 10. Rodapé com a Marca Gigante Cortada pela Borda */}
      <Rodape brand={siteContent.brand} rodape={siteContent.rodape} />
    </div>
  );
}
