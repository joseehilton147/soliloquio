import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const mysticalTheme = create({
  base: 'dark',

  // Branding
  brandTitle: '🔮 Solilóquio Design System',
  brandUrl: 'https://github.com/joseehilton147/soliloquio',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#a855f7', // Purple místico
  colorSecondary: '#8b5cf6', // Violet

  // UI
  appBg: '#0a0a0d', // Darker background
  appContentBg: '#25252A', // oklch(0.145 0 0) aproximado
  appPreviewBg: '#25252A',
  appBorderColor: 'rgba(168, 85, 247, 0.2)',
  appBorderRadius: 10,

  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#25252A',
  textMutedColor: 'rgba(255, 255, 255, 0.6)',

  // Toolbar default and active colors
  barTextColor: 'rgba(255, 255, 255, 0.8)',
  barSelectedColor: '#a855f7',
  barHoverColor: '#8b5cf6',
  barBg: '#0a0a0d',

  // Form colors
  inputBg: 'rgba(255, 255, 255, 0.05)',
  inputBorder: 'rgba(168, 85, 247, 0.2)',
  inputTextColor: '#ffffff',
  inputBorderRadius: 8,

  // Font
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',
})

addons.setConfig({
  theme: mysticalTheme,
})
