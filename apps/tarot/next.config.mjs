import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui', '@workspace/core', '@workspace/api'],
	serverExternalPackages: ['@prisma/client', '@workspace/database'],

	// Configure Turbopack aliases (Turbopack is now stable in Next.js 15)
	turbopack: {
		resolveAlias: {
			'@/lib': path.resolve(__dirname, '../../packages/ui/src/lib'),
			'@/components': path.resolve(__dirname, '../../packages/ui/src/components'),
		},
	},

	// Configure Webpack aliases (fallback for non-turbopack builds)
	webpack: (config, { isServer }) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@/lib': path.resolve(__dirname, '../../packages/ui/src/lib'),
			'@/components': path.resolve(__dirname, '../../packages/ui/src/components'),
		}
		return config
	},
}

export default nextConfig
