# Relatório de Auditoria de Componentes

**Data:** 2025-12-29
**Escopo:** Monorepo Solilóquio completo
**Total de Componentes:** 57

---

## Resumo Executivo

| Local | Componentes | Status |
|-------|-------------|--------|
| `packages/ui` | 29 | Bem organizado (Atomic Design) |
| `apps/tarot` | 28 | Domain-specific + alguns para migrar |

### Saúde da Arquitetura

| Aspecto | Score | Observação |
|---------|-------|------------|
| Separação genérico/específico | 🟢 90% | packages/ui bem limpo |
| Atomic Design | 🟢 85% | Hierarquia respeitada |
| Reutilização | 🟡 70% | Algumas duplicações |
| Nomenclatura | 🟢 95% | Nomes claros |
| Type Safety | 🟢 100% | Todos tipados |

---

## Inventário: packages/ui (29 componentes)

### Atoms (7)

| Componente | Arquivo | Status |
|------------|---------|--------|
| Button | `atoms/button.tsx` | ✅ Genérico |
| CardBadge | `atoms/card-badge.tsx` | ✅ Genérico |
| FileInput | `atoms/file-input.tsx` | ✅ Genérico |
| Logo | `atoms/logo.tsx` | ✅ Genérico |
| LogoIconMystical | `atoms/logo-icon-mystical.tsx` | ✅ Genérico |
| MoonPhaseIcon | `atoms/moon-phase-icon.tsx` | ✅ Genérico |
| TagInput | `atoms/tag-input.tsx` | ✅ Genérico |

### Molecules (17)

| Componente | Arquivo | Status |
|------------|---------|--------|
| AppSwitcher | `molecules/app-switcher.tsx` | ✅ Genérico |
| CurrentAppBadge | `molecules/current-app-badge.tsx` | ✅ Genérico |
| FileDropZone | `molecules/file-drop-zone.tsx` | ✅ Genérico |
| FilePreview | `molecules/file-preview.tsx` | ✅ Genérico |
| FilterChip | `molecules/filter-chip.tsx` | ✅ Genérico |
| ImagePreview | `molecules/image-preview.tsx` | ✅ Genérico |
| MoonPhaseBadge | `molecules/moon-phase-badge.tsx` | ✅ Genérico |
| MoonPhaseListItem | `molecules/moon-phase-list-item.tsx` | ✅ Genérico |
| MysticalBackground | `molecules/mystical-background.tsx` | ✅ Genérico |
| MysticalBreadcrumb | `molecules/mystical-breadcrumb.tsx` | ✅ Genérico |
| MysticalLoading | `molecules/mystical-loading.tsx` | ✅ Genérico |
| PageHeader | `molecules/page-header.tsx` | ✅ Genérico |
| RichTextEditor | `molecules/rich-text-editor.tsx` | ✅ Genérico |
| SacredEyeLogo | `molecules/sacred-eye-logo.tsx` | ✅ Genérico |
| Tag | `molecules/tag.tsx` | ✅ Genérico |

### Organisms (4)

| Componente | Arquivo | Status |
|------------|---------|--------|
| AppHeader | `organisms/app-header.tsx` | ✅ Genérico |
| DynamicTagInput | `organisms/dynamic-tag-input.tsx` | ✅ Genérico |
| ImageUploader | `organisms/image-uploader.tsx` | ✅ Genérico |
| LunarCalendar | `organisms/lunar-calendar.tsx` | ✅ Genérico |

### Especializados (2)

| Componente | Arquivo | Status |
|------------|---------|--------|
| MysticalTabs | `tabs/mystical-tabs.tsx` | ✅ Genérico |
| MysticalDock | `dock/mystical-dock.tsx` | ✅ Genérico |

---

## Inventário: apps/tarot (28 componentes)

### Root Components (3)

| Componente | Nível | Local |
|------------|-------|-------|
| TarotLayout | Template | `components/tarot-layout.tsx` |
| Providers | Wrapper | `components/providers.tsx` |
| TarotTiragensTabs | Molecule | `components/tabs/tarot-tiragens-tabs.tsx` |

### Shared Components (5)

| Componente | Nível | Local | Ação |
|------------|-------|-------|------|
| MysticalLayout | Template | `shared/components/layout/` | ✅ OK |
| GlobalSearch | Organism | `shared/components/` | ✅ OK |
| SearchFieldBadge | Molecule | `shared/components/` | 🟡 Migrar? |
| PageLoadingIndicator | Organism | `shared/components/` | ✅ OK |
| DraftRecovery | Organism | `shared/components/` | ✅ OK |

### Feature: Arcanos (3)

| Componente | Nível | Local |
|------------|-------|-------|
| ArcanoPortalCard | Organism | `features/arcanos/components/` |
| ArcanosHeroSection | Organism | `features/arcanos/components/` |
| CartasHeroSection | Organism | `features/arcanos/components/` |

### Feature: Naipes (16)

**Atoms (5):**
| Componente | Arquivo |
|------------|---------|
| ElementBadge | `element-badge.tsx` |
| NaipeSymbol | `naipe-symbol.tsx` |
| NaipeCTA | `naipe-cta.tsx` |
| ThemeInfo | `theme-info.tsx` |
| ZodiacInfo | `zodiac-info.tsx` |

**Molecules (2):**
| Componente | Composição |
|------------|------------|
| NaipeHeader | Icon + ElementBadge + NaipeSymbol |
| NaipeInfo | ElementBadge + ZodiacInfo + ThemeInfo |

**Organisms (4):**
| Componente | Responsabilidade |
|------------|------------------|
| NaipeCard | Card completo de naipe |
| NaipeCardsGrid | Grid de NaipeCards |
| NaipePageHero | Hero da página individual |
| NaipeContent | Conteúdo da página |

**Sections (5):**
| Componente | Tipo |
|------------|------|
| NaipesHeroSection | Hero imersivo |
| FourElementsSection | Educacional |
| ArcanoReferenceSection | Educacional |
| EducationalSection | Educacional |
| NaipeStructureSection | Educacional |

### Feature: Tiragens (2)

| Componente | Nível | Responsabilidade |
|------------|-------|------------------|
| SpreadCard | Molecule | Preview de spread |
| SpreadCanvas | Organism | Canvas visual interativo |

---

## Problemas Identificados

### 1. Duplicações

| Problema | Impacto | Prioridade |
|----------|---------|------------|
| HeroSections (3 versões similares) | Código duplicado | 🟠 Média |
| ElementBadge poderia ser genérico | Não reutilizável | 🟡 Baixa |

### 2. Componentes para Migrar

| Componente | De | Para | Razão |
|------------|----|----- |-------|
| ElementBadge | `features/naipes/` | `packages/ui/molecules/` | Genérico (Fogo/Água/Ar/Terra) |
| SearchFieldBadge | `shared/components/` | `packages/ui/molecules/` | Badge genérico |

### 3. Gaps na Hierarquia

| Gap | Descrição | Recomendação |
|-----|-----------|--------------|
| HeroSection genérico | 3 implementações ad-hoc | Criar em packages/ui |
| GridContainer | Padrão repetido | Criar em packages/ui |
| SectionContainer | Styling repetido | Criar em packages/ui |

---

## Plano de Ação

### Fase 1: Quick Wins (Opcional)

- [ ] Migrar ElementBadge → packages/ui/molecules
- [ ] Migrar SearchFieldBadge → packages/ui/molecules

### Fase 2: Consolidação

- [ ] Criar HeroSection genérico em packages/ui
- [ ] Refatorar ArcanosHeroSection, NaipesHeroSection, CartasHeroSection

### Fase 3: Organização

- [ ] Revisar estrutura de features/naipes (muitos componentes)
- [ ] Considerar sub-organização por responsabilidade

---

## Conclusão

A arquitetura está **saudável**. O Atomic Design está bem implementado em packages/ui. Os componentes domain-specific estão corretamente em apps/tarot/features.

**Recomendação:** As migrações são opcionais e de baixo impacto. O foco principal deve ser manter a disciplina atual conforme o projeto cresce.

---

*Gerado em: 2025-12-29*
*Próxima auditoria recomendada: Após Fase 1 completa*
