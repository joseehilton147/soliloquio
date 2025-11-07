import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import jsxA11y from "eslint-plugin-jsx-a11y"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect"
import tailwindcss from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * Configuração ESLint para aplicações Next.js.
 *
 * Inclui todas as regras da configuração base, mais:
 * - Next.js recomendações + Core Web Vitals
 * - React 19 com JSX transform moderno
 * - React Hooks com regras recomendadas
 * - Acessibilidade (jsx-a11y)
 * - Anti-pattern detection (you-might-not-need-an-effect)
 * - Tailwind CSS class ordering
 *
 * @type {import("eslint").Linter.Config}
 */
export const nextJsConfig = [
	...baseConfig,
	js.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,

	{
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},

	// Next.js
	{
		plugins: {
			"@next/next": pluginNext,
		},
		rules: {
			// ═══════════ NEXT.JS ═══════════
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs["core-web-vitals"].rules,

			// Permitir async Server Components sem avisos
			"@next/next/no-async-client-component": "error",

			// Evitar uso de <img> no Next.js (usar next/image)
			"@next/next/no-img-element": "warn",
		},
	},

	// React Hooks + React You Might Not Need An Effect
	{
		plugins: {
			"react-hooks": pluginReactHooks,
			"react-you-might-not-need-an-effect": reactYouMightNotNeedAnEffect,
		},
		settings: { react: { version: "detect" } },
		rules: {
			// ═══════════ REACT HOOKS ═══════════
			...pluginReactHooks.configs.recommended.rules,

			// React scope não é mais necessário com novo JSX transform
			"react/react-in-jsx-scope": "off",

			// Desabilitar prop-types (usamos TypeScript)
			"react/prop-types": "off",

			// ═══════════ ANTI-PATTERNS (You Might Not Need An Effect) ═══════════

			// Derivar estado de props/state (computar durante render)
			"react-you-might-not-need-an-effect/no-derived-state": "warn",

			// Chains de setState (efeitos em cascata)
			"react-you-might-not-need-an-effect/no-chain-state-updates": "warn",

			// Event handlers (não usar useEffect para manipuladores de evento)
			"react-you-might-not-need-an-effect/no-event-handler": "warn",

			// Ajustar estado quando prop muda (usar key ou memoização)
			"react-you-might-not-need-an-effect/no-adjust-state-on-prop-change": "warn",

			// Resetar todo estado quando prop muda (usar key)
			"react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change": "warn",

			// Passar estado ao vivo para componente pai
			"react-you-might-not-need-an-effect/no-pass-live-state-to-parent": "warn",

			// Passar dados para componente pai
			"react-you-might-not-need-an-effect/no-pass-data-to-parent": "warn",

			// Passar ref para componente pai
			"react-you-might-not-need-an-effect/no-pass-ref-to-parent": "warn",

			// Inicializar estado (fazer fora do componente ou em useState)
			"react-you-might-not-need-an-effect/no-initialize-state": "warn",

			// Gerenciar componente pai (antipadrão)
			"react-you-might-not-need-an-effect/no-manage-parent": "warn",

			// useEffect vazio (sem propósito)
			"react-you-might-not-need-an-effect/no-empty-effect": "warn",
		},
	},

	// ═══════════ TAILWIND CSS (TEMPORARIAMENTE DESABILITADO) ═══════════
	//
	// O plugin eslint-plugin-tailwindcss tem problemas de compatibilidade com Tailwind CSS v4.
	// Versão beta (4.0.0-beta.0) instalada, mas ainda apresenta erros de resolução.
	//
	// Para reativar quando o plugin for totalmente compatível com Tailwind v4:
	// 1. Descomentar a seção abaixo
	// 2. Garantir que tailwindcss está instalado em cada app que usa UI components
	// 3. Testar com: pnpm lint
	//
	// {
	// 	plugins: {
	// 		tailwindcss,
	// 	},
	// 	rules: {
	// 		"tailwindcss/classnames-order": "warn",
	// 		"tailwindcss/no-contradicting-classname": "error",
	// 		"tailwindcss/no-custom-classname": "off",
	// 		"tailwindcss/no-unnecessary-arbitrary-value": "warn",
	// 	},
	// 	settings: {
	// 		tailwindcss: {
	// 			config: "packages/ui/tailwind.config.ts",
	// 			callees: ["cn", "cva", "clsx", "classnames"],
	// 			tags: ["tw", "styled"],
	// 		},
	// 	},
	// },
]
