import type { Preview } from '@storybook/react'
import { create } from '@storybook/theming/create'
import '@workspace/ui/globals.css'

const mysticalDocsTheme = create({
  base: 'dark',
  brandTitle: '🔮 Solilóquio Design System',
  colorPrimary: '#a855f7',
  colorSecondary: '#8b5cf6',
  appBg: '#0a0a0d',
  appContentBg: '#25252A',
  appBorderColor: 'rgba(168, 85, 247, 0.2)',
  textColor: '#ffffff',
  barTextColor: 'rgba(255, 255, 255, 0.8)',
  barSelectedColor: '#a855f7',
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#25252A', // oklch(0.145 0 0) aproximado
        },
        {
          name: 'darker',
          value: '#0A0A0D',
        },
        {
          name: 'purple-glow',
          value: '#1a0f2e',
        },
      ],
    },
    docs: {
      theme: mysticalDocsTheme,
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default preview
