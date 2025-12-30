import type { DockItem } from '@workspace/ui/components/dock/mystical-dock'

export const createDockItems = (onSearchOpen?: () => void): DockItem[] => [
	{
		id: 'home',
		label: 'Início',
		icon: 'game-icons:magic-portal',
		href: '/',
		type: 'link',
		position: 'left',
	},
	{
		id: 'cartas',
		label: 'Cartas',
		icon: 'game-icons:card-random',
		href: '/cartas/arcanos',
		type: 'link',
		position: 'left',
		submenu: [
			// Arcanos - com submenu aninhado
			{
				label: 'Arcanos',
				href: '/cartas/arcanos',
				icon: 'lucide:sparkles',
				children: [
					{ label: 'Maiores', href: '/cartas/arcanos/maiores', icon: 'lucide:crown' },
					{ label: 'Menores', href: '/cartas/arcanos/menores', icon: 'lucide:layers' },
				],
			},

			// Naipes - com submenu aninhado
			{
				label: 'Naipes',
				href: '/cartas/naipes',
				icon: 'lucide:book-open',
				children: [
					{ label: 'Copas', href: '/cartas/naipes/copas', icon: 'lucide:heart' },
					{ label: 'Paus', href: '/cartas/naipes/paus', icon: 'lucide:flame' },
					{ label: 'Ouros', href: '/cartas/naipes/ouros', icon: 'lucide:coins' },
					{ label: 'Espadas', href: '/cartas/naipes/espadas', icon: 'lucide:swords' },
				],
			},

			// Ação - sem children
			{ label: 'Nova Carta', href: '/cartas/nova', icon: 'lucide:plus' },
		],
	},
	{
		id: 'baralhos',
		label: 'Baralhos',
		icon: 'game-icons:card-draw',
		href: '/baralhos',
		type: 'link',
		position: 'left',
		submenu: [
			{ label: 'Novo Baralho', href: '/baralhos/novo', icon: 'lucide:plus' },
		],
	},
	{
		id: 'tiragens',
		label: 'Tiragens',
		icon: 'game-icons:perspective-dice-six-faces-random',
		href: '/tiragens',
		type: 'link',
		position: 'left',
		submenu: [
			// Rápidas - Sim ou Não (1 carta)
			{
				label: 'Rápidas',
				href: '/tiragens',
				icon: 'lucide:zap',
				children: [
					{ label: 'Sim ou Não', href: '/tiragens/sim-ou-nao', icon: 'lucide:target' },
				],
			},

			// Insights - Conselho do Universo (3 cartas)
			{
				label: 'Insights',
				href: '/tiragens',
				icon: 'lucide:eye',
				children: [
					{ label: 'Conselho do Universo', href: '/tiragens/conselho-do-universo', icon: 'lucide:sparkles' },
				],
			},

			// Profunda - Cruz Celta (10 cartas)
			{
				label: 'Profunda',
				href: '/tiragens',
				icon: 'lucide:compass',
				children: [
					{ label: 'A Cruz Celta', href: '/tiragens/cruz-celta', icon: 'lucide:crosshair' },
				],
			},
		],
	},
	{
		id: 'busca',
		label: 'Buscar (⌘K)',
		icon: 'game-icons:crystal-ball',
		action: onSearchOpen,
		type: 'action',
		position: 'left',
	},
	{
		id: 'configuracoes',
		label: 'Configurações',
		icon: 'game-icons:spell-book',
		href: '/configuracoes',
		type: 'link',
		position: 'right',
	},
	{
		id: 'usuario',
		label: 'Perfil',
		icon: 'game-icons:hooded-figure',
		href: '/perfil',
		type: 'link',
		position: 'right',
	},
]
