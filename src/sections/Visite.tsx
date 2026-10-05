import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageSquare, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface VisiteProps {
  visite: SiteContent['visite'];
}

export default function Visite({ visite }: VisiteProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!visite.enabled) return null;

  return (
    <section
      id="visite"
      style={{
        backgroundColor: TOKENS.colors.bg,
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-t border-[#1f2024]/70 overflow-hidden"
      aria-label="Informações de visita e contato"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Cabeçalho com Número Grande Decorativo */}
        <div className="relative max-w-[720px] mb-16">
          {visite.sectionNumber && (
            <span
              aria-hidden="true"
              style={{ fontFamily: TOKENS.fonts.serif }}
              className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[7rem] md:text-[10rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none -z-10"
            >
              {visite.sectionNumber}
            </span>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2.5 h-[1px] bg-[#c88252]" aria-hidden="true" />
            <span
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="text-[11px] uppercase tracking-[0.28em] text-[#8e8b82] tabular-nums"
            >
              {visite.kicker}
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
            {visite.title}
          </h2>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#8e8b82] font-light">
            {visite.description}
          </p>
        </div>

        {/* Grade de 3 Colunas: Horário, Localização e WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#1f2024]/60">
          
          {/* Card 1: Horário */}
          <div className="space-y-4 p-6 sm:p-8 rounded bg-[#111215] border border-[#212328]">
            <div className="w-9 h-9 rounded-full bg-[#18191d] flex items-center justify-center text-[#c8a261]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[10px] uppercase tracking-[0.24em] text-[#6e7078] block mb-1"
              >
                {visite.schedule.label}
              </span>
              <p className="text-base text-[#f2efe9] font-medium">
                {visite.schedule.value}
              </p>
            </div>
            <p className="text-xs text-[#8e8b82] font-light leading-relaxed pt-2 border-t border-[#1b1c20]">
              {visite.schedule.note}
            </p>
          </div>

          {/* Card 2: Localização */}
          <div className="space-y-4 p-6 sm:p-8 rounded bg-[#111215] border border-[#212328]">
            <div className="w-9 h-9 rounded-full bg-[#18191d] flex items-center justify-center text-[#c8a261]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[10px] uppercase tracking-[0.24em] text-[#6e7078] block mb-1"
              >
                {visite.location.label}
              </span>
              <p className="text-base text-[#f2efe9] font-medium">
                {visite.location.value}
              </p>
            </div>
            <p className="text-xs text-[#8e8b82] font-light leading-relaxed pt-2 border-t border-[#1b1c20]">
              {visite.location.note}
            </p>
          </div>

          {/* Card 3: WhatsApp Action */}
          <div className="space-y-4 p-6 sm:p-8 rounded bg-[#15171b] border border-[#2c2f38] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1d2026] flex items-center justify-center text-[#c8a261]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily: TOKENS.fonts.mono }}
                  className="text-[10px] uppercase tracking-[0.24em] text-[#c8a261] block mb-1"
                >
                  Canal Direto
                </span>
                <p className="text-sm text-[#f2efe9] font-light">
                  {visite.whatsappAction.note}
                </p>
              </div>
            </div>

            <a
              href={visite.whatsappAction.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: TOKENS.colors.text,
                color: TOKENS.colors.bg,
                fontFamily: TOKENS.fonts.sans,
              }}
              className="w-full py-3.5 px-4 rounded text-xs font-medium uppercase tracking-[0.16em] flex items-center justify-center gap-2 hover:bg-white active:scale-[0.98] transition-all duration-200 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe9]"
            >
              <span>{visite.whatsappAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
