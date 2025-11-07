import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import importPlugin from "eslint-plugin-import"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

/**
 * Configuração base compartilhada do ESLint para o repositório.
 *
 * Inclui:
 * - ESLint recomendações padrão
 * - TypeScript ESLint
 * - Regras de formatação (substitui Prettier)
 * - Ordenação de imports
 * - Plugin Turbo para monorepo
 * - Modo "warnings only" (não bloqueia build)
 *
 * Padrões de formatação:
 * - Indentação: TAB (4 espaços)
 * - Sem ponto e vírgula
 * - Aspas simples
 * - Vírgula trailing quando multi-linha
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
	js.configs.recommended,
	...tseslint.configs.recommended,

	// Plugin Stylistic para formatação (substitui Prettier)
	{
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			// ═══════════ FORMATAÇÃO ═══════════

			// Indentação com TAB (4 espaços)
			"@stylistic/indent": ["error", "tab", {
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: { parameters: 1, body: 1 },
				FunctionExpression: { parameters: 1, body: 1 },
				CallExpression: { arguments: 1 },
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: false,
				ignoreComments: false,
			}],

			// Sem ponto e vírgula
			"@stylistic/semi": ["error", "never"],

			// Aspas simples (exceto quando necessário escapar)
			"@stylistic/quotes": ["error", "single", {
				avoidEscape: true,
				allowTemplateLiterals: "always",
			}],

			// Vírgula trailing
			"@stylistic/comma-dangle": ["error", {
				arrays: "always-multiline",
				objects: "always-multiline",
				imports: "always-multiline",
				exports: "always-multiline",
				functions: "always-multiline",
			}],

			// Espaço antes de parênteses de função
			"@stylistic/space-before-function-paren": ["error", {
				anonymous: "always",
				named: "never",
				asyncArrow: "always",
			}],

			// Espaço antes de blocos
			"@stylistic/space-before-blocks": ["error", "always"],

			// Espaço dentro de chaves de objetos
			"@stylistic/object-curly-spacing": ["error", "always"],

			// Espaço dentro de arrays
			"@stylistic/array-bracket-spacing": ["error", "never"],

			// Espaço ao redor de operadores
			"@stylistic/space-infix-ops": "error",

			// Espaço depois de vírgulas
			"@stylistic/comma-spacing": ["error", { before: false, after: true }],

			// Espaço depois de keywords
			"@stylistic/keyword-spacing": ["error", { before: true, after: true }],

			// Quebra de linha no fim do arquivo
			"@stylistic/eol-last": ["error", "always"],

			// Sem múltiplas linhas vazias
			"@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

			// Sem trailing spaces
			"@stylistic/no-trailing-spaces": "error",

			// Aspas em propriedades de objetos (somente quando necessário)
			"@stylistic/quote-props": ["error", "as-needed"],

			// Tipo de quebra de linha
			"@stylistic/linebreak-style": ["error", "unix"],

			// Espaço dentro de parênteses
			"@stylistic/space-in-parens": ["error", "never"],

			// Arrow functions: sempre parênteses nos params
			"@stylistic/arrow-parens": ["error", "always"],

			// Arrow functions: espaço antes/depois da seta
			"@stylistic/arrow-spacing": ["error", { before: true, after: true }],

			// Operador ternário em múltiplas linhas
			"@stylistic/multiline-ternary": ["error", "always-multiline"],

			// Padding em blocos
			"@stylistic/padded-blocks": ["error", "never"],
		},
	},

	// Plugin de importação
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			// ═══════════ IMPORTS ═══════════

			// Ordenação de imports
			"import/order": ["error", {
				groups: [
					"builtin",   // Node.js built-in modules
					"external",  // Packages
					"internal",  // Aliased modules
					"parent",    // Relative parent
					"sibling",   // Relative sibling
					"index",     // Relative index
				],
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			}],

			// Sem imports duplicados
			"import/no-duplicates": "error",

			// Primeiro imports, depois código
			"import/first": "error",

			// Newline depois dos imports
			"import/newline-after-import": ["error", { count: 1 }],
		},
	},

	// Plugin Turbo (monorepo utilities)
	{
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			"turbo/no-undeclared-env-vars": "warn",
		},
	},

	// TypeScript regras adicionais
	{
		rules: {
			// Permitir unused vars que começam com _
			"@typescript-eslint/no-unused-vars": ["warn", {
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			}],

			// Permitir any explícito (quando necessário)
			"@typescript-eslint/no-explicit-any": "warn",

			// Preferir const
			"prefer-const": "error",

			// Sem var
			"no-var": "error",
		},
	},

	// Plugin "Only Warn" - converte erros em warnings
	{
		plugins: {
			onlyWarn,
		},
	},

	// Ignores globais
	{
		ignores: [
			"dist/**",
			"build/**",
			".next/**",
			"node_modules/**",
			"coverage/**",
			".turbo/**",
		],
	},
]
