/**
 * Validação de variáveis de ambiente
 * SEMPRE deve dar erro se variável não existir
 */

function getEnvVar(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(
      `❌ Variável de ambiente "${key}" não configurada!\n` +
      `Configure em .env.local ou nas variáveis de ambiente do sistema.`
    );
  }

  return value;
}

export function getApiUrl(): string {
  // Sem fallbacks - se não configurou, erro explícito
  return getEnvVar('NEXT_PUBLIC_API_URL');
}

export function getDatabaseUrl(): string {
  return getEnvVar('DATABASE_URL');
}
