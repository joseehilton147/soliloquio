/**
 * @fileoverview Configuração ESLint Base Enterprise - Anti AI-Smell
 *
 * Esta configuração implementa linting de nível Google/Facebook para garantir
 * código de alta qualidade, seguro e maintainable. Projetada para detectar
 * código de baixa qualidade que uma IA poderia gerar.
 *
 * @version 3.0.0
 * @author Solilóquio Team
 * @license MIT
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * FILOSOFIA: ANTI AI-SMELL
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * IAs tendem a gerar código que:
 * - Usa any excessivamente → detectado por @typescript-eslint/no-explicit-any
 * - Ignora edge cases → detectado por sonarjs/no-ignored-return
 * - Código duplicado → detectado por sonarjs/no-duplicate-string
 * - Segredos hardcoded → detectado por no-secrets/no-secrets
 * - Promises não tratadas → detectado por @typescript-eslint/no-floating-promises
 * - Regex ineficientes → detectado por regexp/optimal-quantifier-concatenation
 * - Nomes genéricos → detectado por unicorn/prevent-abbreviations
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PLUGINS UTILIZADOS (15 PLUGINS)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @plugin @eslint/js - Regras core ESLint (recommended)
 * @plugin typescript-eslint - TypeScript strict type-checking
 * @plugin @stylistic/eslint-plugin - Formatação (substitui Prettier)
 * @plugin eslint-plugin-import - Ordenação e validação de imports
 * @plugin eslint-plugin-turbo - Otimizações Turborepo
 * @plugin eslint-plugin-unicorn - 100+ regras modernas (XO)
 * @plugin eslint-plugin-sonarjs - Detecção de bugs e code smells (SonarQube)
 * @plugin eslint-plugin-promise - Best practices para Promises
 * @plugin eslint-plugin-regexp - Otimização de RegExp
 * @plugin eslint-plugin-security - Vulnerabilidades de segurança
 * @plugin eslint-plugin-no-secrets - Detecta secrets hardcoded
 * @plugin eslint-plugin-check-file - Naming conventions
 * @plugin eslint-plugin-no-barrel-files - Proíbe barrel files (performance)
 *
 * @see https://typescript-eslint.io/users/configs
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 * @see https://github.com/SonarSource/eslint-plugin-sonarjs
 */

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import confusingBrowserGlobals from 'confusing-browser-globals'
import checkFile from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import noSecrets from 'eslint-plugin-no-secrets'
import pluginPromise from 'eslint-plugin-promise'
import * as regexpPlugin from 'eslint-plugin-regexp'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import turboPlugin from 'eslint-plugin-turbo'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

/**
 * Configuração base enterprise do ESLint para o repositório.
 *
 * @description
 * Esta configuração implementa linting de nível enterprise usando
 * 14 plugins para máxima cobertura de qualidade, segurança e consistência.
 *
 * @example
 * // Em um eslint.config.js de um package:
 * import { config } from "@workspace/eslint-config/base"
 * export default [...config]
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * ESLINT CORE RECOMMENDED
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras fundamentais do ESLint que detectam problemas comuns em JavaScript.
	 * Estas são regras universais que não dependem de TypeScript.
	 *
	 * @see https://eslint.org/docs/rules/
	 */
	js.configs.recommended,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * TYPESCRIPT-ESLINT STRICT TYPE-CHECKED
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * A configuração mais rigorosa do typescript-eslint.
	 * Combina: recommended + recommendedTypeChecked + strict + strictTypeChecked
	 *
	 * Regras importantes incluídas:
	 * - @typescript-eslint/no-explicit-any - Proíbe uso de `any`
	 * - @typescript-eslint/no-unsafe-* - Bloqueia operações unsafe
	 * - @typescript-eslint/no-floating-promises - Exige tratamento de promises
	 * - @typescript-eslint/restrict-template-expressions - Tipos em templates
	 * - @typescript-eslint/prefer-nullish-coalescing - Usa ?? ao invés de ||
	 *
	 * @see https://typescript-eslint.io/users/configs#strict-type-checked
	 */
	...tseslint.configs.strictTypeChecked,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * TYPESCRIPT-ESLINT STYLISTIC TYPE-CHECKED
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras de estilo que melhoram consistência e legibilidade.
	 *
	 * @see https://typescript-eslint.io/users/configs#stylistic-type-checked
	 */
	...tseslint.configs.stylisticTypeChecked,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * UNICORN - 100+ REGRAS MODERNAS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Plugin usado pelo XO com regras modernas de JavaScript/TypeScript.
	 * Detecta padrões antiquados e sugere alternativas modernas.
	 *
	 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
	 */
	unicorn.configs.recommended,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * SONARJS - DETECÇÃO DE BUGS E CODE SMELLS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Regras do SonarQube para detectar bugs, vulnerabilidades e code smells.
	 * Essencial para código de qualidade enterprise.
	 *
	 * @see https://github.com/SonarSource/eslint-plugin-sonarjs
	 */
	sonarjs.configs.recommended,

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * PROMISE - BEST PRACTICES PARA PROMISES
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Garante uso correto de Promises e async/await.
	 *
	 * @see https://github.com/eslint-community/eslint-plugin-promise
	 */
	pluginPromise.configs['flat/recommended'],

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * REGEXP - OTIMIZAÇÃO DE EXPRESSÕES REGULARES
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Detecta regex ineficientes, incorretas ou inseguras.
	 *
	 * @see https://github.com/ota-meshi/eslint-plugin-regexp
	 */
	regexpPlugin.configs['flat/recommended'],

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * CONFIGURAÇÃO DE PARSER PARA TYPE-CHECKING
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * SECURITY - VULNERABILIDADES NODE.JS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Detecta vulnerabilidades comuns como:
	 * - eval() e Function()
	 * - Command injection
	 * - Path traversal
	 * - Insecure randomness
	 *
	 * @see https://github.com/eslint-community/eslint-plugin-security
	 */
	{
		plugins: {
			security,
		},
		rules: {
			/**
			 * @rule security/detect-eval-with-expression
			 * @description Detecta uso de eval() com expressões dinâmicas
			 * @reason eval() é uma das maiores vulnerabilidades de segurança
			 */
			'security/detect-eval-with-expression': 'error',

			/**
			 * @rule security/detect-non-literal-fs-filename
			 * @description Detecta nomes de arquivo não literais em operações fs
			 * @reason Previne path traversal attacks
			 */
			'security/detect-non-literal-fs-filename': 'warn',

			/**
			 * @rule security/detect-non-literal-regexp
			 * @description Detecta RegExp com strings não literais
			 * @reason Previne ReDoS attacks
			 */
			'security/detect-non-literal-regexp': 'warn',

			/**
			 * @rule security/detect-non-literal-require
			 * @description Detecta require() com strings não literais
			 * @reason Previne arbitrary code execution
			 */
			'security/detect-non-literal-require': 'warn',

			/**
			 * @rule security/detect-object-injection
			 * @description Detecta injeção via bracket notation
			 * @reason Previne prototype pollution
			 * @level warn (muitos falsos positivos)
			 */
			'security/detect-object-injection': 'warn',

			/**
			 * @rule security/detect-possible-timing-attacks
			 * @description Detecta comparações de strings que podem vazar timing
			 * @reason Previne timing attacks em autenticação
			 */
			'security/detect-possible-timing-attacks': 'warn',

			/**
			 * @rule security/detect-unsafe-regex
			 * @description Detecta regex vulneráveis a ReDoS
			 * @reason Previne Denial of Service via regex
			 */
			'security/detect-unsafe-regex': 'error',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * NO-SECRETS - DETECÇÃO DE SECRETS HARDCODED
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Detecta API keys, tokens, passwords e outros secrets no código.
	 * Usa análise de entropia e pattern matching.
	 *
	 * @see https://www.npmjs.com/package/eslint-plugin-no-secrets
	 */
	{
		plugins: {
			'no-secrets': noSecrets,
		},
		rules: {
			/**
			 * @rule no-secrets/no-secrets
			 * @description Detecta strings de alta entropia (possíveis secrets)
			 * @reason Previne vazamento de credentials no código
			 * @config tolerance: 4.5 (quanto menor, mais sensível)
			 */
			'no-secrets/no-secrets': ['error', {
				tolerance: 4.5,
				additionalDelimiters: ['/', '\\\\'],
			}],
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * CHECK-FILE - NAMING CONVENTIONS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Força convenções de nomenclatura para arquivos e pastas.
	 * Usado pelo Bulletproof React.
	 *
	 * @see https://github.com/dukeluo/eslint-plugin-check-file
	 */
	{
		plugins: {
			'check-file': checkFile,
		},
		rules: {
			/**
			 * @rule check-file/filename-naming-convention
			 * @description Força kebab-case para arquivos TypeScript
			 * @reason Consistência, evita problemas cross-platform
			 */
			'check-file/filename-naming-convention': ['error', {
				'**/*.{ts,tsx}': 'KEBAB_CASE',
			}, {
				ignoreMiddleExtensions: true,
			}],

			/**
			 * @rule check-file/folder-naming-convention
			 * @description Força kebab-case para pastas
			 * @reason Consistência com arquivos
			 */
			'check-file/folder-naming-convention': ['error', {
				'src/**': 'KEBAB_CASE',
				'app/**': 'NEXT_JS_APP_ROUTER_CASE',
			}],
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * NO-BARREL-FILES - PERFORMANCE OPTIMIZATION
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Barrel files (index.ts que re-exporta tudo) prejudicam performance:
	 * - Tree-shaking menos eficiente
	 * - Builds mais lentos (Atlassian reportou 75% mais rápido sem barrels)
	 * - Circular dependencies mais prováveis
	 *
	 * @see https://github.com/thepassle/eslint-plugin-barrel-files
	 */
	{
		plugins: {
			'no-barrel-files': noBarrelFiles,
		},
		rules: {
			/**
			 * @rule no-barrel-files/no-barrel-files
			 * @description Proíbe criação de barrel files (index.ts que só exporta)
			 * @reason Performance: imports diretos são mais eficientes
			 * @level warn para permitir migração gradual
			 */
			'no-barrel-files/no-barrel-files': 'warn',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * STYLISTIC - FORMATAÇÃO DE CÓDIGO
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Substitui o Prettier com regras ESLint nativas de formatação.
	 *
	 * @see https://eslint.style/
	 */
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			/**
			 * @rule @stylistic/indent
			 * @description Usa TAB para indentação
			 * @reason TABs são mais acessíveis
			 */
			'@stylistic/indent': ['error', 'tab', {
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

			/**
			 * @rule @stylistic/semi
			 * @description Proíbe ponto e vírgula
			 * @reason Código mais limpo, ASI confiável
			 */
			'@stylistic/semi': ['error', 'never'],

			/**
			 * @rule @stylistic/quotes
			 * @description Usa aspas simples
			 */
			'@stylistic/quotes': ['error', 'single', {
				avoidEscape: true,
				allowTemplateLiterals: 'always',
			}],

			/**
			 * @rule @stylistic/comma-dangle
			 * @description Exige vírgula trailing em multi-line
			 * @reason Facilita diffs no git
			 */
			'@stylistic/comma-dangle': ['error', {
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline',
			}],

			'@stylistic/space-before-function-paren': ['error', {
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			}],

			'@stylistic/space-before-blocks': ['error', 'always'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/comma-spacing': ['error', { before: false, after: true }],
			'@stylistic/keyword-spacing': ['error', { before: true, after: true }],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/quote-props': ['error', 'as-needed'],
			'@stylistic/linebreak-style': ['error', 'unix'],
			'@stylistic/space-in-parens': ['error', 'never'],
			'@stylistic/arrow-parens': ['error', 'always'],
			'@stylistic/arrow-spacing': ['error', { before: true, after: true }],
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/padded-blocks': ['error', 'never'],
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * IMPORT - ORGANIZAÇÃO DE IMPORTS
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * @see https://github.com/import-js/eslint-plugin-import
	 */
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			/**
			 * @rule import/order
			 * @description Ordena imports por tipo e alfabeticamente
			 */
			'import/order': ['error', {
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			}],

			'import/no-duplicates': 'error',
			'import/first': 'error',
			'import/newline-after-import': ['error', { count: 1 }],

			/**
			 * @rule import/no-cycle
			 * @description Detecta imports circulares entre módulos
			 * @reason Circular deps causam bugs sutis e problemas de bundle
			 */
			'import/no-cycle': ['error', { maxDepth: 3 }],

			/**
			 * @rule import/no-self-import
			 * @description Proíbe módulo importar a si mesmo
			 * @reason Sempre um erro - causa infinite loop
			 */
			'import/no-self-import': 'error',

			/**
			 * @rule import/no-useless-path-segments
			 * @description Remove segmentos desnecessários em paths
			 * @reason ./foo/./bar → ./foo/bar
			 */
			'import/no-useless-path-segments': 'error',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * TURBO - MONOREPO UTILITIES
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			'turbo/no-undeclared-env-vars': 'warn',
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * OVERRIDES - AJUSTES PARA ANTI AI-SMELL
	 * ═══════════════════════════════════════════════════════════════════════════
	 *
	 * Ajustes específicos para detectar código de baixa qualidade
	 * que uma IA poderia gerar.
	 */
	{
		rules: {
			// ═══════════ TYPESCRIPT STRICT ═══════════

			/**
			 * @rule @typescript-eslint/no-unused-vars
			 * @description Permite variáveis não usadas se começam com _
			 */
			'@typescript-eslint/no-unused-vars': ['error', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			}],

			/**
			 * @rule @typescript-eslint/no-explicit-any
			 * @description Proíbe uso de `any` (AI-SMELL: IAs usam any excessivamente)
			 */
			'@typescript-eslint/no-explicit-any': 'error',

			/**
			 * @rule @typescript-eslint/consistent-type-imports
			 * @description Força uso de `import type`
			 */
			'@typescript-eslint/consistent-type-imports': ['error', {
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			}],

			/**
			 * @rule @typescript-eslint/consistent-type-exports
			 * @description Força uso de `export type`
			 */
			'@typescript-eslint/consistent-type-exports': ['error', {
				fixMixedExportsWithInlineTypeSpecifier: true,
			}],

			/**
			 * @rule @typescript-eslint/consistent-type-definitions
			 * @description Força uso de `type` ao invés de `interface`
			 * @reason Types são mais flexíveis e consistentes (galex pattern)
			 */
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],

			/**
			 * @rule @typescript-eslint/no-non-null-assertion
			 * @description Avisa sobre uso de ! (AI-SMELL: IAs usam ! sem verificar)
			 */
			'@typescript-eslint/no-non-null-assertion': 'warn',

			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',

			'@typescript-eslint/no-floating-promises': ['error', {
				ignoreVoid: true,
				ignoreIIFE: true,
			}],

			'@typescript-eslint/require-await': 'error',

			'@typescript-eslint/no-misused-promises': ['error', {
				checksVoidReturn: {
					attributes: false,
				},
			}],

			/**
			 * @rule @typescript-eslint/unbound-method
			 * @description Desabilitado temporariamente - bug com tipos complexos
			 * @reason Causa crash em alguns arquivos com tipos genéricos
			 */
			'@typescript-eslint/unbound-method': 'off',

			// ═══════════ UNICORN ADJUSTMENTS ═══════════

			/**
			 * @rule unicorn/prevent-abbreviations
			 * @description Força nomes completos (AI-SMELL: IAs usam abreviações)
			 * @config Permite abreviações comuns no ecossistema
			 */
			'unicorn/prevent-abbreviations': ['error', {
				allowList: {
					props: true,
					Props: true,
					ref: true,
					Ref: true,
					params: true,
					Params: true,
					args: true,
					Args: true,
					env: true,
					Env: true,
					src: true,
					Src: true,
					db: true,
					Db: true,
					i: true,
					j: true,
					e: true,
				},
			}],

			/**
			 * @rule unicorn/no-null
			 * @description Desabilitado - null é válido em JSON e APIs
			 */
			'unicorn/no-null': 'off',

			/**
			 * @rule unicorn/no-array-reduce
			 * @description Desabilitado - reduce é útil quando bem usado
			 */
			'unicorn/no-array-reduce': 'off',

			/**
			 * @rule unicorn/no-array-for-each
			 * @description Desabilitado - forEach é válido em alguns casos
			 */
			'unicorn/no-array-for-each': 'off',

			/**
			 * @rule unicorn/filename-case
			 * @description Kebab-case para arquivos
			 */
			'unicorn/filename-case': ['error', {
				cases: {
					kebabCase: true,
				},
				ignore: [
					'^\\[.*\\].*$', // Next.js dynamic routes [slug]
					'^_.*$', // Next.js private folders _components
					'^\\(.*\\).*$', // Next.js route groups (portal)
				],
			}],

			/**
			 * @rule unicorn/prefer-module
			 * @description Desabilitado - alguns configs ainda usam CJS
			 */
			'unicorn/prefer-module': 'off',

			/**
			 * @rule unicorn/prefer-top-level-await
			 * @description Desabilitado - nem sempre é apropriado
			 */
			'unicorn/prefer-top-level-await': 'off',

			// ═══════════ SONARJS ADJUSTMENTS ═══════════

			/**
			 * @rule sonarjs/cognitive-complexity
			 * @description Limita complexidade cognitiva
			 * @reason AI-SMELL: IAs geram funções muito complexas
			 */
			'sonarjs/cognitive-complexity': ['error', 15],

			/**
			 * @rule sonarjs/no-duplicate-string
			 * @description Detecta strings duplicadas
			 * @reason AI-SMELL: IAs duplicam strings em vez de constantes
			 */
			'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

			// ═══════════ CORE ESLINT ═══════════

			'prefer-const': 'error',
			'no-var': 'error',
			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'eqeqeq': ['error', 'always', { null: 'ignore' }],

			/**
			 * @rule curly
			 * @description Força chaves {} mesmo em single-line
			 * @reason Previne bugs de manutenção (galex pattern)
			 */
			curly: ['error', 'all'],

			/**
			 * @rule no-await-in-loop
			 * @description Proíbe await dentro de loops
			 * @reason Use Promise.all() para paralelismo (galex pattern)
			 */
			'no-await-in-loop': 'error',

			/**
			 * @rule no-promise-executor-return
			 * @description Proíbe return dentro de Promise executor
			 * @reason Promise executor não deve retornar valores
			 */
			'no-promise-executor-return': 'error',

			/**
			 * @rule require-atomic-updates
			 * @description Detecta race conditions em código async
			 * @reason Previne bugs sutis em atualizações concorrentes
			 */
			'require-atomic-updates': 'warn',

			/**
			 * @rule no-restricted-globals
			 * @description Bloqueia globals confusos do browser
			 * @reason Previne uso acidental de isNaN, isFinite, etc (galex pattern)
			 */
			'no-restricted-globals': [
				'error',
				...confusingBrowserGlobals,
			],

			/**
			 * @rule no-restricted-syntax
			 * @description Proíbe padrões perigosos e força convenções
			 * @reason AI-SMELL: IAs usam padrões antiquados
			 */
			'no-restricted-syntax': [
				'error',
				{
					selector: 'ForInStatement',
					message: 'for..in itera sobre prototype chain. Use Object.keys() ou for..of.',
				},
				{
					selector: 'LabeledStatement',
					message: 'Labels são confusos. Refatore para funções.',
				},
				{
					selector: 'WithStatement',
					message: 'with é deprecated e causa bugs.',
				},
				// ═══════════ ZOD PATTERNS ═══════════
				{
					selector: 'CallExpression[callee.object.name="z"][callee.property.name="object"] > ObjectExpression > Property > CallExpression[callee.object.name="z"][callee.property.name="any"]',
					message: 'Evite z.any() em schemas Zod. Use tipos específicos para validação.',
				},
				{
					selector: 'VariableDeclarator[id.name=/^[a-z].*(?<!Schema)$/][init.callee.object.name="z"]',
					message: 'Schemas Zod devem terminar com "Schema". Ex: userSchema, cardSchema.',
				},
			],

			/**
			 * @rule complexity
			 * @description Limita complexidade ciclomática
			 * @reason AI-SMELL: IAs geram código com muitos branches
			 */
			complexity: ['error', { max: 20 }],

			/**
			 * @rule max-depth
			 * @description Limita profundidade de aninhamento
			 * @reason AI-SMELL: IAs aninham demais
			 */
			'max-depth': ['error', { max: 4 }],

			/**
			 * @rule max-lines-per-function
			 * @description Limita linhas por função
			 * @reason AI-SMELL: IAs criam funções muito longas
			 */
			'max-lines-per-function': ['warn', {
				max: 100,
				skipBlankLines: true,
				skipComments: true,
			}],

			/**
			 * @rule max-params
			 * @description Limita parâmetros de função
			 * @reason AI-SMELL: IAs não usam objetos para muitos params
			 */
			'max-params': ['error', { max: 4 }],
		},
	},

	/**
	 * ═══════════════════════════════════════════════════════════════════════════
	 * IGNORES GLOBAIS
	 * ═══════════════════════════════════════════════════════════════════════════
	 */
	{
		ignores: [
			'dist/**',
			'build/**',
			'.next/**',
			'node_modules/**',
			'coverage/**',
			'.turbo/**',
			'*.config.js',
			'*.config.mjs',
			'*.config.cjs',
		],
	},
]
