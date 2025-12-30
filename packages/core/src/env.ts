/**
 * Validação de variáveis de ambiente
 * SEMPRE deve dar erro se variável não existir
 */

export function getApiUrl(): string {
	const value = process.env.NEXT_PUBLIC_API_URL
	if (!value) {
		throw new Error(
			'❌ Variável de ambiente "NEXT_PUBLIC_API_URL" não configurada!\n' +
			'Configure em .env.local ou nas variáveis de ambiente do sistema.',
		)
	}
	return value
}

export function getDatabaseUrl(): string {
	const value = process.env.DATABASE_URL
	if (!value) {
		throw new Error(
			'❌ Variável de ambiente "DATABASE_URL" não configurada!\n' +
			'Configure em .env.local ou nas variáveis de ambiente do sistema.',
		)
	}
	return value
}
