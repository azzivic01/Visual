import React from 'react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface RodapeProps {
  brand: SiteContent['brand'];
  rodape: SiteContent['rodape'];
}

export default function Rodape({ brand, rodape }: RodapeProps) {
  if (!rodape.enabled) return null;

  return (
    <footer
      style={{
        backgroundColor: '#090a0c',
        color: TOKENS.colors.text,
        fontFamily: TOKENS.fonts.sans,
      }}
      className="relative w-full border-t border-[#1f2024]/70 px-6 md:px-12 lg:px-16 py-12 text-[#8e8b82]"
      aria-label="Rodapé institucional"
    >
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-10">
        
        {/* Linha Superior: Marca e Resumo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1b1c20]">
          <div>
            <span className="text-lg font-medium tracking-tight text-[#f2efe9] block">
              {brand.name}
            </span>
            <p className="text-xs text-[#8e8b82] font-light mt-1 max-w-[440px]">
              {rodape.brandSummary}
            </p>
          </div>

          {/* Links do Rodapé */}
          <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-6 sm:gap-8">
            {rodape.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#8e8b82] hover:text-[#f2efe9] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Linha Inferior: Colofão e Direitos */}
        <div
          style={{ fontFamily: TOKENS.fonts.mono }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#55565e] tracking-[0.2em] uppercase gap-3 relative z-10"
        >
          <span>{rodape.colophonLeft}</span>
          <span>{rodape.colophonRight}</span>
        </div>

      </div>

      {/* Marca em tamanho monumental cortada pela borda inferior (Detalhe de Luxo) */}
      <div
        aria-hidden="true"
        style={{ fontFamily: TOKENS.fonts.serif }}
        className="w-full overflow-hidden select-none pointer-events-none text-center -mb-8 sm:-mb-14 pt-10"
      >
        <span className="inline-block text-[15vw] leading-[0.75] font-normal tracking-tight text-white/[0.04] whitespace-nowrap translate-y-3 sm:translate-y-5">
          {brand.name}
        </span>
      </div>
    </footer>
  );
}
