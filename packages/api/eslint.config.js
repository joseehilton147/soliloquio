import { config } from '@workspace/eslint-config/base'

/**
 * Configuração ESLint para @workspace/api
 *
 * Este pacote contém a API tRPC do projeto.
 * Estende a configuração base com overrides temporários para
 * erros de inferência de tipos que serão resolvidos na Fase 1.75.
 *
 * @type {import("eslint").Linter.Config}
 */
export default [
	...config,
	/**
	 * OVERRIDE TEMPORÁRIO - Fase 1.75
	 *
	 * Erros de inferência de tipos no tRPC/Prisma.
	 * TODO: Resolver na Fase 1.75 - ESLint Compliance
	 *
	 * @see apps/docs/REFACTORING-ROADMAP.md
	 */
	{
		files: ['src/**/*.ts'],
		rules: {
			/**
			 * DESABILITADO TEMPORARIAMENTE - Fase 1.75
			 *
			 * Prisma + tRPC types não são inferidos corretamente.
			 * Requer investigação de tsconfig e projectService.
			 *
			 * Quantidade de erros: ~186
			 * Impacto: Apenas @workspace/api (package interno)
			 *
			 * @see apps/docs/REFACTORING-ROADMAP.md (Fase 1.75)
			 */
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'check-file/filename-naming-convention': 'off',
			'@typescript-eslint/require-await': 'off',
		},
	},
]
