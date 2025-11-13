# Guia de Layout - Cruz Celta

## Problema Resolvido

O layout anterior usava `position: absolute` dentro do componente `CosmicCard`, o que quebrava completamente o CSS Grid. As cartas ignoravam as áreas definidas no grid e se posicionavam baseadas em coordenadas `x/y` em porcentagem.

## Solução Implementada

### 1. CosmicCardStatic

Criado componente `CosmicCardStatic` que:
- **NÃO** usa `position: absolute`
- Permite que o parent (Grid) controle a posição
- Mantém todas as funcionalidades visuais (aura, flip 3D, tooltip)

### 2. CSS Grid Preciso

```typescript
gridTemplateColumns: 'repeat(7, 200px)',
gridTemplateRows: 'repeat(4, 280px)',
gridTemplateAreas: `
  ".      .       .       coroa   .       .       desfecho"
  "passado .      .       centro  futuro  .       esperancas"
  ".      .       .       fundacao .      .       entorno"
  ".      .       .       .       .       .       consulente"
`,
```

**Estrutura Visual:**

```
Coluna:  1    2    3    4      5      6    7
                       (centro)            (staff)

Row 1:                [3]                 [10]
Row 2:   [6]          [1+2]   [4]         [9]
Row 3:                [5]                 [8]
Row 4:                                    [7]
```

### 3. Alinhamento Perfeito

**Vertical (Coluna 4 - Centro):**
- Carta 3 (Coroa): `items-end` → alinha ao fundo da célula
- Cartas 1+2 (Centro): `items-center` → centralizado
- Carta 5 (Fundação): `items-start` → alinha ao topo da célula

**Vertical (Coluna 7 - Staff):**
- Carta 10 (Desfecho): `items-end` → fundo
- Carta 9 (Esperanças): `items-center` → centro
- Carta 8 (Entorno): `items-center` → centro
- Carta 7 (Consulente): `items-start` → topo

**Horizontal (Row 2 - Meio):**
- Carta 6 (Passado): `justify-end` → direita da célula
- Cartas 1+2 (Centro): `justify-center` → centro
- Carta 4 (Futuro): `justify-start` → esquerda da célula

### 4. Grupo Central (1+2)

A carta 2 cruza horizontalmente a carta 1:

```typescript
<div className="relative flex items-center justify-center">
  {/* Carta 1 - vertical */}
  <CosmicCardStatic position={pos1} ... />

  {/* Carta 2 - horizontal sobre parte inferior da 1 */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="rotate-90">
      <CosmicCardStatic position={pos2} ... />
    </div>
  </div>
</div>
```

## Como Ajustar o Layout

### Espaçamento entre cartas

Modificar `gap` no grid:

```typescript
className="grid gap-6"  // 24px de gap
className="grid gap-8"  // 32px de gap
className="grid gap-4"  // 16px de gap
```

### Tamanho das cartas

Modificar dimensões no `CosmicCardStatic`:

```typescript
// Linha 203 - atualmente:
className="relative w-48 h-64 ..."

// Para cartas maiores:
className="relative w-56 h-80 ..."

// Para cartas menores:
className="relative w-40 h-56 ..."
```

**IMPORTANTE:** Ajuste também as células do grid:

```typescript
gridTemplateColumns: 'repeat(7, 220px)',  // se cartas mais largas
gridTemplateRows: 'repeat(4, 320px)',     // se cartas mais altas
```

### Posição da Carta 2 (horizontal)

Modificar onde ela cruza a carta 1:

```typescript
// Linha 95 - atualmente cruza parte inferior:
<div className="absolute bottom-8 left-1/2 -translate-x-1/2">

// Para cruzar no meio:
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

// Para cruzar parte superior:
<div className="absolute top-8 left-1/2 -translate-x-1/2">
```

### Alinhamento Fino

Cada carta tem classes flexbox que você pode ajustar:

```typescript
// Carta 3 (Coroa) - linha 130
renderCard(3, 'flex items-end justify-center [grid-area:coroa]')
//                    ^^^^^^^^^ vertical  ^^^^^^^^^^^^^^ horizontal

// Opções verticais: items-start | items-center | items-end
// Opções horizontais: justify-start | justify-center | justify-end
```

### Adicionar Mais Espaço à Direita (Staff)

Se quiser afastar o staff da cruz:

```typescript
gridTemplateAreas: `
  ".  .  .  coroa   .  .  .  desfecho"    // adicione mais "." entre
  "...
`,
gridTemplateColumns: 'repeat(8, 200px)',  // aumente número de colunas
```

## Estrutura do Código

### Funções Simples e Focadas

1. **renderCard(order, className)** → Renderiza carta única
2. **renderCenterGroup()** → Renderiza grupo 1+2 com sobreposição
3. **CosmicCardStatic** → Versão estática (sem absolute) do CosmicCard

### Por que separar?

- **Facilita ajustes**: Cada carta é independente
- **Grid limpo**: HTML simples com áreas nomeadas
- **Reutilizável**: `CosmicCardStatic` pode ser usado em outros spreads
- **Debugável**: Fácil identificar qual carta está desalinhada

## Troubleshooting

### Cartas ainda desalinhadas?

1. **Verifique console** do navegador por erros CSS
2. **Inspecione elemento** no Chrome DevTools:
   - Grid deve mostrar linhas nomeadas
   - Cartas devem estar dentro das células corretas
3. **Confira dados**: `positionsByOrder` tem todas as 10 cartas?

### Cartas muito próximas/distantes?

- Ajuste `gap` no grid container
- Ajuste tamanho das colunas/rows no `gridTemplateColumns/Rows`

### Carta 2 não cruza corretamente?

- Ajuste `bottom-8` para `bottom-12` ou `bottom-4`
- Verifique se `rotate-90` está aplicado

### Layout quebra em telas menores?

Adicione media queries ou torne responsivo:

```typescript
style={{
  gridTemplateColumns: window.innerWidth > 1400
    ? 'repeat(7, 200px)'
    : 'repeat(7, 160px)',
}}
```

## Próximos Passos

1. ✅ Layout fixo funcionando
2. 🔲 Tornar responsivo (mobile/tablet)
3. 🔲 Adicionar animações de entrada das cartas
4. 🔲 Melhorar energia connections entre cartas
