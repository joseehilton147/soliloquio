import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
	transpilePackages: ['@workspace/ui', '@workspace/core', '@workspace/api'],
	// NOTA Workers: serverExternalPackages abaixo vale para build Node (dev/CI).
	// No Worker (workerd, via `opennextjs-cloudflare build`) não há TCP nem FS
	// gravável — ver app/api/trpc/[trpc]/route.ts (Prisma TCP direto) e
	// app/api/upload/route.ts (node:fs) para os pontos de quebra documentados.
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
