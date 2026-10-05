/**
 * TOKENS DE DESIGN DO SISTEMA
 * 
 * Paleta restrita a 4 cores essenciais com contraste mínimo WCAG AA (>= 4.5:1).
 * Luz de janela, fundo escuro mineral e acento cobre quente.
 * Tipografia baseada em variáveis CSS customizáveis por cliente.
 * Curva cinematográfica única: cubic-bezier(0.16, 1, 0.3, 1).
 */

export const TOKENS = {
  colors: {
    bg: '#0c0d0f',           // Fundo mineral profundo
    text: '#f2efe9',         // Texto principal de alto contraste (14.2:1)
    textSecondary: '#8e8b82',// Texto de apoio funcional (4.8:1 - WCAG AA)
    accent: '#c88252',       // Acento cobre mineral quente (5.2:1 - WCAG AA)
  },
  fonts: {
    serif: 'var(--font-serif, "Instrument Serif", Georgia, serif)',
    sans: 'var(--font-sans, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif)',
    mono: 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
  },
  animation: {
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    durations: {
      intro: 1.5,
      imageReveal: 1.2,
      kicker: 0.7,
      word: 0.75,
      wordStagger: 0.06,
      supporting: 0.8,
      buttons: 0.65,
      quick: 0.3,
    },
  },
} as const;
