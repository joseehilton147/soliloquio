# 01 - Getting Started

Guia de configuração inicial do projeto Solilóquio.

---

## Requisitos do Sistema

| Requisito | Versão Mínima | Recomendado |
|-----------|---------------|-------------|
| **Node.js** | 20.x | 22.x (via Volta) |
| **pnpm** | 10.x | 10.4.1 |
| **Git** | 2.x | Última |

### Verificando Versões

```bash
node -v    # Deve mostrar v20.x ou superior
pnpm -v    # Deve mostrar 10.x
git --version
```

---

## Instalação

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio> soliloquio
cd soliloquio
```

### 2. Instalar Dependências

```bash
pnpm install
```

Este comando instala dependências de todos os workspaces:
- `apps/tarot` - Aplicação principal (Next.js)
- `apps/design-system` - Storybook do design system
- `packages/*` - Pacotes compartilhados

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar exemplo de variáveis (se existir)
cp apps/tarot/.env.example apps/tarot/.env.local
```

Edite `.env.local` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://..."

# Outros
NEXT_PUBLIC_APP_URL="http://localhost:3002"
```

---

## Executando o Projeto

### Desenvolvimento

```bash
# Rodar todos os apps em paralelo (via Turborepo)
pnpm dev

# Rodar apenas o app tarot
pnpm --filter tarot dev
```

**URLs padrão:**
- Tarot App: http://localhost:3002
- Design System: http://localhost:6006 (se configurado)

### Build de Produção

```bash
# Build de todos os apps
pnpm build

# Build apenas do tarot
pnpm --filter tarot build
```

### Verificação de Qualidade

```bash
# Lint de todos os workspaces
pnpm lint

# Type check do tarot
pnpm --filter tarot typecheck

# Formatar código
pnpm format
```

---

## Estrutura do Monorepo

```
soliloquio/
├── apps/
│   ├── tarot/              # App principal (Next.js 15)
│   ├── design-system/      # Storybook
│   └── docs/               # Documentação
├── packages/
│   ├── ui/                 # Componentes compartilhados
│   ├── core/               # Lógica de negócio
│   ├── api/                # Camada de API (tRPC)
│   ├── database/           # Prisma schema
│   ├── eslint-config/      # Configuração ESLint
│   └── typescript-config/  # Configuração TypeScript
├── package.json            # Root package
├── pnpm-workspace.yaml     # Workspace config
├── turbo.json              # Turborepo config
└── CLAUDE.md               # Instruções para AI
```

---

## Stack Tecnológica

### Frontend (apps/tarot)

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 15.x | Framework React com App Router |
| **React** | 19.x | Biblioteca de UI |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Estilização utility-first |
| **TanStack Query** | 5.x | Data fetching e cache |
| **tRPC** | 11.x | API type-safe |

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Prisma** | 6.x | ORM |
| **PostgreSQL** | - | Banco de dados |

### Tooling

| Ferramenta | Propósito |
|------------|-----------|
| **Turborepo** | Monorepo build system |
| **pnpm** | Package manager |
| **Volta** | Node version manager |
| **ESLint** | Linting |
| **Prettier** | Code formatting |

---

## Comandos Úteis

### Workspaces

```bash
# Listar todos os workspaces
pnpm list --recursive --depth 0

# Executar comando em workspace específico
pnpm --filter <workspace> <comando>

# Exemplos
pnpm --filter tarot dev
pnpm --filter @workspace/ui build
pnpm --filter tarot typecheck
```

### Turborepo

```bash
# Ver grafo de dependências
pnpm turbo run build --graph

# Executar com cache limpo
pnpm turbo run build --force

# Ver o que seria executado
pnpm turbo run build --dry-run
```

### Git

```bash
# Status do repositório
git status

# Ver últimos commits
git log --oneline -10

# Criar branch de feature
git checkout -b feature/nome-da-feature
```

---

## Troubleshooting

### Erro: "Cannot find module"

```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install
```

### Erro: "Port already in use"

```bash
# Verificar processo na porta 3002
lsof -i :3002

# Matar processo
kill -9 <PID>
```

### Erro de tipos após atualização

```bash
# Rebuild de todos os packages
pnpm turbo run build --force

# Ou reiniciar VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Cache do Turborepo corrompido

```bash
# Limpar cache local
rm -rf .turbo
rm -rf node_modules/.cache

# Rebuild
pnpm build
```

---

## Próximos Passos

1. **Explorar a estrutura**: Leia [02-project-structure.md](./02-project-structure.md)
2. **Entender componentes**: Leia [03-component-development.md](./03-component-development.md)
3. **Conhecer os frameworks**: Veja `docs/frameworks/`

---

## Referências

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS 4](https://tailwindcss.com/docs)

---

*Última atualização: 2025-12-29*
