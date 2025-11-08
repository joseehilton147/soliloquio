/**
 * Design System - Solilóquio Tarot
 *
 * Inspirado em tradições místicas e espiritualidade
 * Paleta: Purple/Violet/Indigo (Chakra da Coroa + Terceiro Olho)
 *
 * Filosofia: Como a Árvore da Vida Cabalística organiza as Sefirot,
 * este design system organiza as emanações visuais do projeto.
 */

export const designTokens = {
  /**
   * CORES MÍSTICAS
   * Baseadas em OKLCH para percepção visual consistente
   */
  colors: {
    // Cores primárias místicas (Purple/Violet/Indigo)
    mystical: {
      purple: {
        50: 'oklch(0.95 0.02 280)',
        100: 'oklch(0.90 0.04 280)',
        200: 'oklch(0.80 0.08 280)',
        300: 'oklch(0.70 0.12 280)',
        400: 'oklch(0.60 0.18 280)',
        500: 'oklch(0.488 0.243 264.376)', // Purple principal
        600: 'oklch(0.40 0.20 280)',
        700: 'oklch(0.30 0.16 280)',
        800: 'oklch(0.20 0.12 280)',
        900: 'oklch(0.10 0.08 280)',
      },
      violet: {
        50: 'oklch(0.95 0.02 290)',
        100: 'oklch(0.90 0.04 290)',
        200: 'oklch(0.80 0.08 290)',
        300: 'oklch(0.70 0.12 290)',
        400: 'oklch(0.60 0.16 290)',
        500: 'oklch(0.50 0.20 290)', // Violet principal
        600: 'oklch(0.40 0.18 290)',
        700: 'oklch(0.30 0.14 290)',
        800: 'oklch(0.20 0.10 290)',
        900: 'oklch(0.10 0.06 290)',
      },
      indigo: {
        50: 'oklch(0.95 0.02 270)',
        100: 'oklch(0.90 0.04 270)',
        200: 'oklch(0.80 0.08 270)',
        300: 'oklch(0.70 0.12 270)',
        400: 'oklch(0.60 0.16 270)',
        500: 'oklch(0.50 0.20 270)', // Indigo principal
        600: 'oklch(0.40 0.18 270)',
        700: 'oklch(0.30 0.14 270)',
        800: 'oklch(0.20 0.10 270)',
        900: 'oklch(0.10 0.06 270)',
      },
    },

    // Cores semânticas (mapeadas do globals.css)
    semantic: {
      background: 'oklch(0.145 0 0)', // Fundo escuro místico
      foreground: 'oklch(0.985 0 0)', // Texto claro
      card: 'oklch(0.145 0 0)',
      cardForeground: 'oklch(0.985 0 0)',
      popover: 'oklch(0.145 0 0)',
      popoverForeground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.985 0 0)',
      primaryForeground: 'oklch(0.205 0 0)',
      secondary: 'oklch(0.269 0 0)',
      secondaryForeground: 'oklch(0.985 0 0)',
      muted: 'oklch(0.269 0 0)',
      mutedForeground: 'oklch(0.708 0 0)',
      accent: 'oklch(0.269 0 0)',
      accentForeground: 'oklch(0.985 0 0)',
      destructive: 'oklch(0.396 0.141 25.723)',
      destructiveForeground: 'oklch(0.637 0.237 25.331)',
      border: 'oklch(0.269 0 0)',
      input: 'oklch(0.269 0 0)',
      ring: 'oklch(0.556 0 0)',
    },

    // Sidebar (para referência)
    sidebar: {
      background: 'oklch(0.205 0 0)',
      foreground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.488 0.243 264.376)',
      primaryForeground: 'oklch(0.985 0 0)',
      accent: 'oklch(0.269 0 0)',
      accentForeground: 'oklch(0.985 0 0)',
      border: 'oklch(0.269 0 0)',
      ring: 'oklch(0.439 0 0)',
    },
  },

  /**
   * ESPAÇAMENTOS
   * Baseados em escala harmônica (múltiplos de 4px)
   * Inspirados nas proporções áureas e geometria sagrada
   */
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem',       // 384px
  },

  /**
   * BORDER RADIUS
   * Baseados no --radius do globals.css (0.625rem / 10px)
   */
  radius: {
    none: '0',
    sm: 'calc(0.625rem - 4px)',  // 6px
    DEFAULT: 'calc(0.625rem - 2px)',  // 8px
    md: '0.625rem',              // 10px (base)
    lg: '0.75rem',               // 12px
    xl: 'calc(0.625rem + 4px)',  // 14px
    '2xl': '1rem',               // 16px
    '3xl': '1.5rem',             // 24px
    full: '9999px',
  },

  /**
   * TIPOGRAFIA
   * Escala harmônica baseada em ratio 1.25 (Quarta Perfeita)
   */
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      '5xl': ['3rem', { lineHeight: '1' }],           // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      '8xl': ['6rem', { lineHeight: '1' }],           // 96px
      '9xl': ['8rem', { lineHeight: '1' }],           // 128px
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  /**
   * SHADOWS
   * Sombras místicas com purple/violet glow
   */
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    // Sombras místicas com glow
    glowPurple: '0 0 20px rgba(168, 85, 247, 0.5)',
    glowViolet: '0 0 20px rgba(139, 92, 246, 0.5)',
    glowIndigo: '0 0 20px rgba(99, 102, 241, 0.5)',
  },

  /**
   * ANIMATIONS
   * Durações baseadas em múltiplos de 100ms
   */
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  /**
   * BREAKPOINTS
   * Mobile-first responsive design
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-INDEX
   * Camadas de elevação
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
} as const

// Type exports para TypeScript
export type DesignTokens = typeof designTokens
export type MysticalColor = keyof typeof designTokens.colors.mystical
export type SemanticColor = keyof typeof designTokens.colors.semantic
export type Spacing = keyof typeof designTokens.spacing
export type Radius = keyof typeof designTokens.radius
export type FontSize = keyof typeof designTokens.typography.fontSize
