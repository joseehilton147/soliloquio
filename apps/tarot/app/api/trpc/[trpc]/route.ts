/**
 * tRPC Route Handler - Tarot App
 * Importa routers do @workspace/api
 *
 * NOTA Workers (Cloudflare): este handler usa o adapter fetch do tRPC, que já
 * é edge-compatível — nada a mudar aqui. O ponto de quebra em Workers está uma
 * camada abaixo: @workspace/database instancia PrismaClient com conexão TCP
 * direta (datasource postgresql:// + directUrl no schema.prisma). O runtime
 * workerd NÃO oferece sockets TCP de saída, então qualquer query Prisma falha
 * em produção Workers até a migração para driver HTTP (ex.: Prisma Accelerate
 * ou adaptador serverless sobre a DATABASE_URL pooled). A troca é no
 * datasource/driver, não neste handler.
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createContext } from '@workspace/api/server'
import { NextResponse } from 'next/server'

const handler = (request: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req: request,
		router: appRouter,
		createContext,
	})

export { handler as GET, handler as POST }

// Handler para CORS preflight
export function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	})
}
