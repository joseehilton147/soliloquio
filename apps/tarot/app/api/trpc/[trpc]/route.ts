/**
 * tRPC Route Handler - Tarot App
 * Importa routers do @workspace/api
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createContext } from '@workspace/api/server'
import { NextResponse } from 'next/server'

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
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
