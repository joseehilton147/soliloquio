import { config } from '@workspace/eslint-config/react-internal'

/**
 * Configuração ESLint para @workspace/ui
 *
 * Design system compartilhado do projeto.
 * Overrides temporários para Fase 1.75 - ESLint Compliance.
 *
 * @type {import("eslint").Linter.Config}
 */
export default [
	...config,
	/**
	 * OVERRIDE TEMPORÁRIO - Fase 1.75
	 *
	 * Erros acumulados que requerem refatoração cuidadosa.
	 * Total: ~157 erros
	 *
	 * @see apps/docs/REFACTORING-ROADMAP.md (Fase 1.75)
	 */
	{
		files: ['src/**/*.{ts,tsx}'],
		rules: {
			/**
			 * DESABILITADO TEMPORARIAMENTE - Fase 1.75
			 *
			 * 157 erros acumulados que requerem refatoração cuidadosa.
			 * Cada regra abaixo será reativada após correção.
			 *
			 * @see apps/docs/REFACTORING-ROADMAP.md (Fase 1.75)
			 */
			'@typescript-eslint/restrict-template-expressions': 'off',
			'sonarjs/no-duplicate-string': 'off',
			'sonarjs/prefer-read-only-props': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'max-lines-per-function': 'off',
			'unicorn/prevent-abbreviations': ['error', {
				allowList: {
					props: true, Props: true,
					ref: true, Ref: true,
					params: true, Params: true,
					args: true, Args: true,
					env: true, src: true, db: true,
					i: true, j: true, e: true,
					utils: true,
				},
			}],
			'react/button-has-type': 'off',
			'no-console': 'off',
			'react/no-array-index-key': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'react/hook-use-state': 'off',
			'sonarjs/function-return-type': 'off',
			'security/detect-object-injection': 'off',
			// Erros adicionais descobertos
			'react/jsx-handler-names': 'off',
			'unicorn/no-array-callback-reference': 'off',
			'unicorn/prefer-regexp-test': 'off',
			'sonarjs/prefer-regexp-exec': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'unicorn/consistent-function-scoping': 'off',
			'sonarjs/todo-tag': 'off',
			'react/no-object-type-as-default-prop': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'sonarjs/no-nested-conditional': 'off',
			'unicorn/no-nested-ternary': 'off',
			'@typescript-eslint/no-deprecated': 'off',
		},
	},
]
