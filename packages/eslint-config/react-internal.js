/**
 * @fileoverview Configuração ESLint para Bibliotecas React - Enterprise Anti AI-Smell
 *
 * Esta configuração estende a base enterprise com regras específicas para:
 * - React 19+ (JSX Transform moderno)
 * - React Hooks (regras recomendadas)
 * - Acessibilidade (WCAG compliance)
 * - Anti-patterns React
 *
 * Diferença da configuração Next.js:
 * - Não inclui regras específicas de Next.js
 * - Ideal para packages/ui e outras bibliotecas React compartilhadas
 *
 * @version 3.0.0
 * @author Solilóquio Team
 * @license MIT
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PLUGINS ADICIONAIS (além da base)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @plugin eslint-plugin-react - Regras React com flat config
 * @plugin eslint-plugin-react-hooks - Regras de hooks
 * @plugin eslint-plugin-jsx-a11y - Acessibilidade em JSX
 * @plugin eslint-plugin-react-you-might-not-need-an-effect - Anti-patterns
 */

import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * Configuração ESLint enterprise para bibliotecas React internas.
 *
 * @description
 * Combina a configuração base enterprise (14 plugins) com 4 plugins adicionais
 * específicos para React. Total: 18 plugins.
 *
 * @example
 * // Em packages/ui/eslint.config.js:
 * import { config } from "@workspace/eslint-config/react-internal"
 * export default config
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * CONFIGURAÇÃO BASE ENTERPRISE (14 PLUGINS)
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	...baseConfig,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * REACT RECOMMENDED
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	pluginReact.configs.flat.recommended,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * JSX ACCESSIBILITY (A11Y)
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	jsxA11y.flatConfigs.recommended,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * LANGUAGE OPTIONS
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * REACT HOOKS + ANTI-PATTERNS
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-you-might-not-need-an-effect': reactYouMightNotNeedAnEffect,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,

			// ═══════════ REACT HOOKS (GALEX PATTERN) ═══════════

			/**
			 * @rule react-hooks/exhaustive-deps
			 * @description Eleva para error (galex pattern)
			 * @reason Deps faltantes causam bugs sutis - seja explícito
			 */
			'react-hooks/exhaustive-deps': 'error',

			// ═══════════ REACT CORE (GALEX PATTERN) ═══════════

			/**
			 * @rule react/button-has-type
			 * @description Força type explícito em buttons
			 * @reason Previne submit acidental (galex pattern)
			 */
			'react/button-has-type': 'error',

			/**
			 * @rule react/jsx-handler-names
			 * @description Convenção de nomes para handlers
			 * @reason Consistência: on* para props, handle* para handlers
			 */
			'react/jsx-handler-names': ['warn', {
				eventHandlerPrefix: 'handle',
				eventHandlerPropPrefix: 'on',
				checkLocalVariables: false,
			}],

			/**
			 * @rule react/no-object-type-as-default-prop
			 * @description Proíbe objetos como default prop
			 * @reason Objetos como default causam re-renders
			 */
			'react/no-object-type-as-default-prop': 'error',

			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/display-name': 'warn',
			'react/jsx-no-target-blank': 'error',

			'react/jsx-key': ['error', {
				checkFragmentShorthand: true,
				checkKeyMustBeforeSpread: true,
				warnOnDuplicates: true,
			}],

			'react/no-unescaped-entities': 'warn',

			'react/self-closing-comp': ['error', {
				component: true,
				html: true,
			}],

			'react/jsx-curly-brace-presence': ['error', {
				props: 'never',
				children: 'never',
			}],

			'react/jsx-boolean-value': ['error', 'never'],
			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
			'react/hook-use-state': 'error',
			'react/no-array-index-key': 'warn',
			'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

			// ═══════════ ANTI-PATTERNS ═══════════

			'react-you-might-not-need-an-effect/no-derived-state': 'warn',
			'react-you-might-not-need-an-effect/no-chain-state-updates': 'warn',
			'react-you-might-not-need-an-effect/no-event-handler': 'warn',
			'react-you-might-not-need-an-effect/no-adjust-state-on-prop-change': 'warn',
			'react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change': 'warn',
			'react-you-might-not-need-an-effect/no-pass-live-state-to-parent': 'warn',
			'react-you-might-not-need-an-effect/no-pass-data-to-parent': 'warn',
			'react-you-might-not-need-an-effect/no-pass-ref-to-parent': 'warn',
			'react-you-might-not-need-an-effect/no-initialize-state': 'warn',
			'react-you-might-not-need-an-effect/no-manage-parent': 'warn',
			'react-you-might-not-need-an-effect/no-empty-effect': 'warn',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * TYPESCRIPT + JSX FILES
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		files: ['**/*.tsx'],
		rules: {
			'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * IGNORES ESPECÍFICOS
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		ignores: [
			'dist/**',
			'build/**',
			'.turbo/**',
		],
	},
]
