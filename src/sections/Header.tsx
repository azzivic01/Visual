import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { TOKENS } from '../tokens.ts';
import type { SiteContent } from '../content.ts';

interface HeaderProps {
  brand: SiteContent['brand'];
  header: SiteContent['header'];
  onSoundClick?: () => void;
  isSoundActive?: boolean;
}

export default function Header({ brand, header, onSoundClick, isSoundActive }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  if (!header.enabled) return null;

  return (
    <>
      <header
        style={{
          fontFamily: TOKENS.fonts.sans,
          backgroundColor: isScrolled ? 'rgba(12, 13, 15, 0.88)' : 'transparent',
          borderBottomColor: isScrolled ? 'rgba(33, 35, 40, 0.8)' : 'transparent',
        }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 backdrop-blur-md border-b px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between"
        aria-label="Cabeçalho principal"
      >
        {/* Marca à esquerda */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-base sm:text-lg font-medium tracking-tight text-[#f2efe9] hover:text-[#c8a261] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
          >
            {brand.name}
          </a>
          {brand.kicker && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#52535a]" aria-hidden="true" />
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="hidden sm:inline-block text-[10px] uppercase tracking-[0.24em] text-[#8e8b82] tabular-nums"
              >
                {brand.kicker}
              </span>
            </>
          )}
        </div>

        {/* Menu Mínimo Desktop */}
        <nav aria-label="Navegação primária" className="hidden md:flex items-center gap-8">
          {header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="text-[11px] uppercase tracking-[0.2em] text-[#8e8b82] hover:text-[#f2efe9] transition-colors duration-200 relative group py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
            >
              <span>{item.label}</span>
              <span
                className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a261] transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        {/* Controles: Botão de Som + Ação Primária + Menu Mobile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Botão de Som */}
          {header.sound && onSoundClick && (
            <button
              type="button"
              onClick={onSoundClick}
              aria-pressed={isSoundActive}
              aria-label={isSoundActive ? header.sound.labelOn : header.sound.labelOff}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2b2d34] hover:border-[#8e8b82] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0f]"
            >
              {isSoundActive ? (
                <Volume2 className="w-3.5 h-3.5 text-[#c8a261] animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#8e8b82] group-hover:text-[#f2efe9] transition-colors" />
              )}
              <span
                style={{ fontFamily: TOKENS.fonts.mono }}
                className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#8e8b82] group-hover:text-[#f2efe9] transition-colors"
              >
                {isSoundActive ? header.sound.labelOn : header.sound.labelOff}
              </span>
            </button>
          )}

          {/* Botão Principal Desktop */}
          <a
            href={header.primaryAction.href}
            style={{
              backgroundColor: TOKENS.colors.text,
              color: TOKENS.colors.bg,
              fontFamily: TOKENS.fonts.sans,
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0f]"
          >
            <span>{header.primaryAction.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Toggle Menu Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden p-2 text-[#8e8b82] hover:text-[#f2efe9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Menu Tela Cheia Mobile */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navegação"
          className="fixed inset-0 z-50 bg-[#0c0d0f]/98 backdrop-blur-xl flex flex-col justify-between p-8 md:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#212328] pb-6">
            <span className="text-lg font-medium text-[#f2efe9]">{brand.name}</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-[#8e8b82] hover:text-[#f2efe9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f2efe9]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {header.nav.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-[#e8e6e3] hover:text-[#c8a261] transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span
                  style={{ fontFamily: TOKENS.fonts.mono }}
                  className="text-xs text-[#52535a] group-hover:text-[#c8a261] tabular-nums"
                >
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#212328] flex flex-col gap-4">
            <a
              href={header.primaryAction.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                backgroundColor: TOKENS.colors.text,
                color: TOKENS.colors.bg,
                fontFamily: TOKENS.fonts.sans,
              }}
              className="w-full py-4 text-center rounded text-xs font-medium uppercase tracking-[0.16em] flex items-center justify-center gap-2"
            >
              <span>{header.primaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <p
              style={{ fontFamily: TOKENS.fonts.mono }}
              className="text-[10px] uppercase tracking-widest text-[#52535a] text-center"
            >
              {brand.tagline}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
