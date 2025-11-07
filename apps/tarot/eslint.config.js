import { nextJsConfig } from "@workspace/eslint-config/next-js"

/**
 * Configuração ESLint para o app Tarot (Next.js).
 *
 * Herda todas as regras da configuração Next.js compartilhada que inclui:
 * - Regras base (formatação, TypeScript, imports)
 * - React 19 + React Hooks
 * - Next.js recomendações + Core Web Vitals
 * - Acessibilidade (jsx-a11y)
 * - Anti-patterns React (you-might-not-need-an-effect)
 * - Tailwind CSS class ordering
 *
 * @type {import("eslint").Linter.Config}
 */
export default [
	...nextJsConfig,

	{
		// Configurações específicas do app Tarot (se necessário)
		rules: {
			// Adicione overrides específicos aqui se necessário
		},
	},
]
