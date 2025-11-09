'use client'

import { Icon } from '@iconify/react'
import { useDockSettings } from '../../src/contexts/dock-settings-context'
import { cn } from '@workspace/ui/lib/utils'
import { PageHeader } from '@workspace/ui/components/molecules'

type DockPosition = 'bottom' | 'top' | 'left' | 'right'
type DockVisibility = 'always' | 'auto-hide'

export default function ConfiguracoesPage() {
  const { settings, updateSettings } = useDockSettings()

  const positions: { value: DockPosition; label: string; description: string }[] = [
    { value: 'bottom', label: 'Inferior', description: 'Dock fixada na parte inferior (padrão)' },
    { value: 'top', label: 'Superior', description: 'Dock fixada na parte superior' },
    { value: 'left', label: 'Esquerda', description: 'Dock fixada na lateral esquerda' },
    { value: 'right', label: 'Direita', description: 'Dock fixada na lateral direita' },
  ]

  const visibilities: { value: DockVisibility; label: string; description: string }[] = [
    { value: 'always', label: 'Sempre Visível', description: 'Dock permanece sempre na tela' },
    { value: 'auto-hide', label: 'Ocultar Automaticamente', description: 'Dock aparece ao subir a página' },
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <PageHeader
        icon="lucide:settings"
        title="Configurações"
        description="Personalize sua experiência mística"
      />

      {/* Seção: Aparência */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Icon icon="lucide:palette" className="size-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-semibold">Aparência</h2>
        </div>

        <div className="space-y-8">
          {/* Posição da Dock */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Posição da Dock</h3>
              <p className="text-sm text-muted-foreground">
                Escolha onde a barra de ações rápidas será exibida
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {positions.map((position) => (
                <button
                  key={position.value}
                  onClick={() => updateSettings({ position: position.value })}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl p-6 text-left',
                    'border-2 transition-all duration-200',
                    'hover:scale-[1.02]',
                    settings.position === position.value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border/40 bg-gradient-to-br from-background via-background to-muted/10 hover:border-purple-500/30'
                  )}
                >
                  {/* Glow effect quando selecionado */}
                  {settings.position === position.value && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5" />
                  )}

                  <div className="relative space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{position.label}</h4>
                      {settings.position === position.value && (
                        <div className="flex size-5 items-center justify-center rounded-full bg-purple-500">
                          <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{position.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visibilidade da Dock */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Comportamento da Dock</h3>
              <p className="text-sm text-muted-foreground">
                Defina como a dock deve aparecer e desaparecer
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {visibilities.map((visibility) => (
                <button
                  key={visibility.value}
                  onClick={() => updateSettings({ visibility: visibility.value })}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl p-6 text-left',
                    'border-2 transition-all duration-200',
                    'hover:scale-[1.02]',
                    settings.visibility === visibility.value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border/40 bg-gradient-to-br from-background via-background to-muted/10 hover:border-purple-500/30'
                  )}
                >
                  {settings.visibility === visibility.value && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5" />
                  )}

                  <div className="relative space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{visibility.label}</h4>
                      {settings.visibility === visibility.value && (
                        <div className="flex size-5 items-center justify-center rounded-full bg-purple-500">
                          <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{visibility.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 p-6">
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-medium text-foreground">💡 Dica:</span> As alterações são aplicadas imediatamente.
              Role a página para ver a dock em ação!
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-purple-500 animate-pulse" />
              Configuração atual: <span className="font-medium text-purple-600 dark:text-purple-400">
                {positions.find(p => p.value === settings.position)?.label} • {visibilities.find(v => v.value === settings.visibility)?.label}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
