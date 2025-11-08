import type { StorybookConfig } from '@storybook/react-vite'
import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },
  async viteFinal(config) {
    // Define process.env para compatibilidade com Next.js Image
    config.define = {
      ...config.define,
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }

    // Alias para mockar next/image no Storybook
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/image': join(__dirname, 'next-image-mock.tsx'),
    }

    return config
  }
};
export default config;