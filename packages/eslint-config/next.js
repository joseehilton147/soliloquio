/**
 * @fileoverview Configuração ESLint para Next.js - Enterprise Anti AI-Smell
 *
 * Esta configuração estende a base enterprise com regras específicas para:
 * - Next.js 15+ (App Router, Server Components, Core Web Vitals)
 * - React 19+ (JSX Transform moderno, Hooks, Server Actions)
 * - Acessibilidade (WCAG compliance)
 * - Anti-patterns React (You Might Not Need An Effect)
 * - Testing (Testing Library, Vitest)
 *
 * @version 3.0.0
 * @author Solilóquio Team
 * @license MIT
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PLUGINS ADICIONAIS (além da base enterprise)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @plugin @next/eslint-plugin-next - Regras específicas Next.js
 * @plugin eslint-plugin-react - Regras React com flat config
 * @plugin eslint-plugin-react-hooks - Regras de hooks
 * @plugin eslint-plugin-jsx-a11y - Acessibilidade em JSX
 * @plugin eslint-plugin-react-you-might-not-need-an-effect - Anti-patterns
 * @plugin @naverpay/eslint-plugin-use-client - Server Components boundary
 * @plugin eslint-plugin-testing-library - Testing Library rules
 * @plugin @vitest/eslint-plugin - Vitest testing rules
 *
 * @see https://nextjs.org/docs/app/building-your-application/configuring/eslint
 */

import useClient from '@naverpay/eslint-plugin-use-client'
import pluginNext from '@next/eslint-plugin-next'
import vitest from '@vitest/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import testingLibrary from 'eslint-plugin-testing-library'
import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * Configuração ESLint enterprise para aplicações Next.js.
 *
 * @description
 * Combina a configuração base enterprise (14 plugins) com 7 plugins adicionais
 * específicos para React/Next.js e testing. Total: 21 plugins.
 *
 * @example
 * // Em apps/tarot/eslint.config.js:
 * import { nextJsConfig } from "@workspace/eslint-config/next-js"
 * export default [...nextJsConfig]
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * CONFIGURAÇÃO BASE ENTERPRISE (14 PLUGINS)
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Herda todas as regras da configuração base que inclui:
	 * - ESLint Core Recommended
	 * - TypeScript ESLint Strict Type-Checked
	 * - Unicorn (100+ regras modernas)
	 * - SonarJS (bugs e code smells)
	 * - Promise (async/await best practices)
	 * - RegExp (otimização de regex)
	 * - Security (vulnerabilidades)
	 * - No-Secrets (detecta secrets hardcoded)
	 * - Check-File (naming conventions)
	 * - Stylistic (formatação)
	 * - Import (ordenação)
	 * - Turbo (monorepo)
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
	 * LANGUAGE OPTIONS - BROWSER GLOBALS
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
	 * NEXT.JS PLUGIN
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras específicas do Next.js para:
	 * - Otimização de imagens (next/image)
	 * - Uso correto de next/link
	 * - Server/Client Components
	 * - Core Web Vitals (LCP, FID, CLS)
	 */
	{
		plugins: {
			'@next/next': pluginNext,
		},
		rules: {
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs['core-web-vitals'].rules,

			/**
			 * @rule @next/next/no-async-client-component
			 * @description Proíbe async em Client Components
			 * @reason Client Components não podem ser async
			 */
			'@next/next/no-async-client-component': 'error',

			/**
			 * @rule @next/next/no-img-element
			 * @description Avisa sobre uso de <img> ao invés de next/image
			 * @reason next/image otimiza imagens automaticamente
			 */
			'@next/next/no-img-element': 'warn',

			/**
			 * @rule @next/next/no-html-link-for-pages
			 * @description Exige next/link para navegação interna
			 * @reason next/link habilita client-side navigation
			 */
			'@next/next/no-html-link-for-pages': 'error',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * REACT HOOKS + ANTI-PATTERNS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras para uso correto de hooks e detecção de anti-patterns.
	 * Essencial para código React de qualidade enterprise.
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

			// ═══════════ REACT CORE ═══════════

			/**
			 * @rule react/button-has-type
			 * @description Força type explícito em buttons
			 * @reason Previne submit acidental (galex pattern)
			 * @example
			 * // ❌ <button onClick={...}>Click</button>
			 * // ✅ <button type="button" onClick={...}>Click</button>
			 */
			'react/button-has-type': 'error',

			/**
			 * @rule react/jsx-handler-names
			 * @description Convenção de nomes para handlers
			 * @reason Consistência: on* para props, handle* para handlers (galex pattern)
			 * @example
			 * // ❌ <Button click={doSomething} />
			 * // ✅ <Button onClick={handleClick} />
			 */
			'react/jsx-handler-names': ['warn', {
				eventHandlerPrefix: 'handle',
				eventHandlerPropPrefix: 'on',
				checkLocalVariables: false,
			}],

			/**
			 * @rule react/no-object-type-as-default-prop
			 * @description Proíbe objetos como default prop
			 * @reason Objetos como default causam re-renders (galex pattern)
			 * @example
			 * // ❌ function Comp({ style = {} }) {}
			 * // ✅ const DEFAULT_STYLE = {}; function Comp({ style = DEFAULT_STYLE }) {}
			 */
			'react/no-object-type-as-default-prop': 'error',

			/**
			 * @rule react/react-in-jsx-scope
			 * @description Desabilita necessidade de import React
			 * @reason React 17+ com novo JSX transform não precisa
			 */
			'react/react-in-jsx-scope': 'off',

			/**
			 * @rule react/prop-types
			 * @description Desabilita validação de prop-types
			 * @reason Usamos TypeScript para validação de tipos
			 */
			'react/prop-types': 'off',

			/**
			 * @rule react/display-name
			 * @description Exige displayName em componentes
			 * @reason Facilita debugging no React DevTools
			 */
			'react/display-name': 'warn',

			/**
			 * @rule react/jsx-no-target-blank
			 * @description Exige rel="noopener" em links target="_blank"
			 * @reason Previne vulnerabilidade de reverse tabnabbing
			 */
			'react/jsx-no-target-blank': 'error',

			/**
			 * @rule react/jsx-key
			 * @description Exige key em elementos de listas
			 * @reason Keys são essenciais para reconciliação
			 */
			'react/jsx-key': ['error', {
				checkFragmentShorthand: true,
				checkKeyMustBeforeSpread: true,
				warnOnDuplicates: true,
			}],

			/**
			 * @rule react/no-unescaped-entities
			 * @description Avisa sobre entidades HTML não escapadas
			 */
			'react/no-unescaped-entities': 'warn',

			/**
			 * @rule react/self-closing-comp
			 * @description Força auto-fechamento em componentes sem children
			 */
			'react/self-closing-comp': ['error', {
				component: true,
				html: true,
			}],

			/**
			 * @rule react/jsx-curly-brace-presence
			 * @description Controla uso de chaves em props JSX
			 */
			'react/jsx-curly-brace-presence': ['error', {
				props: 'never',
				children: 'never',
			}],

			/**
			 * @rule react/jsx-boolean-value
			 * @description Força omissão de {true} em props booleanas
			 * @reason <Component disabled /> é mais limpo que <Component disabled={true} />
			 */
			'react/jsx-boolean-value': ['error', 'never'],

			/**
			 * @rule react/jsx-no-useless-fragment
			 * @description Remove fragmentos desnecessários
			 * @reason AI-SMELL: IAs usam <></> excessivamente
			 */
			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

			/**
			 * @rule react/hook-use-state
			 * @description Força destructuring correto de useState
			 * @reason const [value, setValue] = useState() é o padrão
			 */
			'react/hook-use-state': 'error',

			/**
			 * @rule react/no-array-index-key
			 * @description Avisa sobre uso de index como key
			 * @reason Causa bugs de reconciliação
			 */
			'react/no-array-index-key': 'warn',

			/**
			 * @rule react/no-unstable-nested-components
			 * @description Detecta componentes definidos dentro de render
			 * @reason AI-SMELL: IAs definem componentes inline
			 */
			'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

			// ═══════════ ANTI-PATTERNS (You Might Not Need An Effect) ═══════════
			// Detecta padrões comuns que indicam código de baixa qualidade

			/**
			 * @rule no-derived-state
			 * @description Detecta estado derivado de props/state
			 * @reason AI-SMELL: IAs usam useEffect para computação
			 * @example
			 * // ❌ Ruim
			 * useEffect(() => { setFullName(first + last) }, [first, last])
			 * // ✅ Bom
			 * const fullName = first + last
			 */
			'react-you-might-not-need-an-effect/no-derived-state': 'warn',

			/**
			 * @rule no-chain-state-updates
			 * @description Detecta efeitos em cascata
			 * @reason Causa re-renders desnecessários
			 */
			'react-you-might-not-need-an-effect/no-chain-state-updates': 'warn',

			/**
			 * @rule no-event-handler
			 * @description Detecta event handlers em useEffect
			 * @reason Handlers devem estar em onClick, onSubmit, etc
			 */
			'react-you-might-not-need-an-effect/no-event-handler': 'warn',

			/**
			 * @rule no-adjust-state-on-prop-change
			 * @description Detecta ajuste de estado quando prop muda
			 * @reason Use key para resetar ou memoização
			 */
			'react-you-might-not-need-an-effect/no-adjust-state-on-prop-change': 'warn',

			/**
			 * @rule no-reset-all-state-on-prop-change
			 * @description Detecta reset de todo estado quando prop muda
			 * @reason Use key={id} no componente para forçar remount
			 */
			'react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change': 'warn',

			/**
			 * @rule no-pass-live-state-to-parent
			 * @description Detecta passagem de estado "ao vivo" para pai
			 */
			'react-you-might-not-need-an-effect/no-pass-live-state-to-parent': 'warn',

			/**
			 * @rule no-pass-data-to-parent
			 * @description Detecta passagem de dados para pai via effect
			 * @reason Use callbacks ou lifting state up
			 */
			'react-you-might-not-need-an-effect/no-pass-data-to-parent': 'warn',

			/**
			 * @rule no-pass-ref-to-parent
			 * @description Detecta passagem de ref para pai
			 * @reason Use forwardRef ou callback refs
			 */
			'react-you-might-not-need-an-effect/no-pass-ref-to-parent': 'warn',

			/**
			 * @rule no-initialize-state
			 * @description Detecta inicialização de estado em useEffect
			 * @reason Inicialize em useState diretamente
			 */
			'react-you-might-not-need-an-effect/no-initialize-state': 'warn',

			/**
			 * @rule no-manage-parent
			 * @description Detecta gerenciamento de componente pai
			 * @reason Antipadrão de arquitetura
			 */
			'react-you-might-not-need-an-effect/no-manage-parent': 'warn',

			/**
			 * @rule no-empty-effect
			 * @description Detecta useEffect vazio
			 * @reason Remove código morto
			 */
			'react-you-might-not-need-an-effect/no-empty-effect': 'warn',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * USE-CLIENT - SERVER COMPONENTS BOUNDARY VALIDATION
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Valida uso correto de 'use client' em componentes que usam hooks ou APIs
	 * client-side. Essencial para Next.js App Router.
	 *
	 * @see https://github.com/NaverPayDev/eslint-plugin-use-client
	 */
	{
		plugins: {
			'@naverpay/use-client': useClient,
		},
		rules: {
			/**
			 * @rule @naverpay/use-client/use-client-hook
			 * @description Exige 'use client' em componentes que usam React hooks
			 * @reason Hooks como useState, useEffect só funcionam em Client Components
			 */
			'@naverpay/use-client/use-client-hook': 'error',

			/**
			 * @rule @naverpay/use-client/browser-api
			 * @description Exige 'use client' em componentes que usam browser APIs
			 * @reason window, document, localStorage só existem no client
			 */
			'@naverpay/use-client/browser-api': 'error',

			/**
			 * @rule @naverpay/use-client/event-handler
			 * @description Exige 'use client' em componentes com event handlers
			 * @reason onClick, onSubmit só funcionam no client
			 */
			'@naverpay/use-client/event-handler': 'error',
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
	 * TESTING LIBRARY - ARQUIVOS DE TESTE
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras específicas para arquivos de teste.
	 */
	{
		files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
		plugins: {
			'testing-library': testingLibrary,
			vitest,
		},
		rules: {
			// Testing Library Rules
			...testingLibrary.configs['flat/react'].rules,

			/**
			 * @rule testing-library/await-async-queries
			 * @description Exige await em queries async
			 */
			'testing-library/await-async-queries': 'error',

			/**
			 * @rule testing-library/await-async-utils
			 * @description Exige await em utils async (waitFor, etc)
			 */
			'testing-library/await-async-utils': 'error',

			/**
			 * @rule testing-library/no-await-sync-queries
			 * @description Proíbe await em queries sync
			 */
			'testing-library/no-await-sync-queries': 'error',

			/**
			 * @rule testing-library/no-container
			 * @description Proíbe uso de container para queries
			 * @reason Use screen.getBy* em vez de container.querySelector
			 */
			'testing-library/no-container': 'error',

			/**
			 * @rule testing-library/no-debugging-utils
			 * @description Avisa sobre debug() em testes
			 * @reason Não deve ir para produção
			 */
			'testing-library/no-debugging-utils': 'warn',

			/**
			 * @rule testing-library/no-dom-import
			 * @description Exige import de @testing-library/react
			 */
			'testing-library/no-dom-import': ['error', 'react'],

			/**
			 * @rule testing-library/no-node-access
			 * @description Proíbe acesso direto ao DOM node
			 */
			'testing-library/no-node-access': 'error',

			/**
			 * @rule testing-library/prefer-find-by
			 * @description Prefere findBy* sobre waitFor + getBy*
			 */
			'testing-library/prefer-find-by': 'error',

			/**
			 * @rule testing-library/prefer-presence-queries
			 * @description Usa queryBy* para assertions de ausência
			 */
			'testing-library/prefer-presence-queries': 'error',

			/**
			 * @rule testing-library/prefer-screen-queries
			 * @description Prefere screen.getBy* sobre destructuring
			 */
			'testing-library/prefer-screen-queries': 'error',

			/**
			 * @rule testing-library/render-result-naming-convention
			 * @description Força naming convention para render result
			 */
			'testing-library/render-result-naming-convention': 'error',

			// Vitest Rules
			...vitest.configs.recommended.rules,

			/**
			 * @rule vitest/expect-expect
			 * @description Exige expect em cada teste
			 */
			'vitest/expect-expect': 'error',

			/**
			 * @rule vitest/no-identical-title
			 * @description Proíbe títulos de teste duplicados
			 */
			'vitest/no-identical-title': 'error',

			/**
			 * @rule vitest/no-focused-tests
			 * @description Proíbe .only em testes
			 * @reason Não deve ir para CI
			 */
			'vitest/no-focused-tests': 'error',

			/**
			 * @rule vitest/no-disabled-tests
			 * @description Avisa sobre .skip em testes
			 */
			'vitest/no-disabled-tests': 'warn',

			/**
			 * @rule vitest/prefer-to-be
			 * @description Prefere toBe sobre toEqual para primitivos
			 */
			'vitest/prefer-to-be': 'error',

			/**
			 * @rule vitest/prefer-to-have-length
			 * @description Prefere toHaveLength sobre length check
			 */
			'vitest/prefer-to-have-length': 'error',

			/**
			 * @rule vitest/valid-expect
			 * @description Valida uso correto de expect
			 */
			'vitest/valid-expect': 'error',

			// Relaxa algumas regras em testes
			'max-lines-per-function': 'off',
			'sonarjs/no-duplicate-string': 'off',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * IGNORES ESPECÍFICOS NEXT.JS
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		ignores: [
			'.next/**',
			'out/**',
			'next.config.*',
		],
	},
]
