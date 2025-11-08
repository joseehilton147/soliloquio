import type { Preview } from '@storybook/react'
import '@workspace/ui/globals.css'

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
      ],
    },
  },
  tags: ['autodocs'],
}

export default preview
