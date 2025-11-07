import { config as baseConfig } from "@workspace/eslint-config/base"

/**
 * Configuração ESLint para a raiz do monorepo.
 *
 * Este arquivo aplica-se apenas aos arquivos de configuração na raiz.
 * Apps e packages têm suas próprias configurações.
 *
 * @type {import("eslint").Linter.Config}
 */
export default [
	...baseConfig,

	{
		// Ignorar apps e packages (eles têm suas próprias configurações)
		ignores: [
			"apps/**",
			"packages/**",
		],
	},
]
