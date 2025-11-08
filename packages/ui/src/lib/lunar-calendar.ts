/**
 * Lunar Calendar Utilities
 * Cálculos baseados em algoritmos astronômicos
 */

export type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent'

export interface LunarInfo {
  phase: MoonPhase
  phaseName: string
  phaseEmoji: string
  illumination: number // 0-100%
  nextPhase: {
    phase: MoonPhase
    phaseName: string
    date: Date
  }
}

/**
 * Calcula a idade da lua (dias desde lua nova)
 * Baseado no ciclo sinódico: 29.53058867 dias
 */
function calculateMoonAge(date: Date): number {
  const SYNODIC_MONTH = 29.53058867
  const KNOWN_NEW_MOON = new Date('2000-01-06 18:14:00 UTC') // Lua nova conhecida

  const diff = date.getTime() - KNOWN_NEW_MOON.getTime()
  const daysSinceKnownNewMoon = diff / (1000 * 60 * 60 * 24)

  return daysSinceKnownNewMoon % SYNODIC_MONTH
}

/**
 * Determina a fase da lua baseada na idade
 */
function getMoonPhaseFromAge(age: number): { phase: MoonPhase; phaseName: string; phaseEmoji: string } {
  const phases: Array<{ max: number; phase: MoonPhase; name: string; emoji: string }> = [
    { max: 1.84566, phase: 'new', name: 'Lua Nova', emoji: '🌑' },
    { max: 5.53699, phase: 'waxing-crescent', name: 'Lua Crescente', emoji: '🌒' },
    { max: 9.22831, phase: 'first-quarter', name: 'Quarto Crescente', emoji: '🌓' },
    { max: 12.91963, phase: 'waxing-gibbous', name: 'Gibosa Crescente', emoji: '🌔' },
    { max: 16.61096, phase: 'full', name: 'Lua Cheia', emoji: '🌕' },
    { max: 20.30228, phase: 'waning-gibbous', name: 'Gibosa Minguante', emoji: '🌖' },
    { max: 23.99361, phase: 'last-quarter', name: 'Quarto Minguante', emoji: '🌗' },
    { max: 27.68493, phase: 'waning-crescent', name: 'Lua Minguante', emoji: '🌘' },
    { max: 29.53059, phase: 'new', name: 'Lua Nova', emoji: '🌑' },
  ]

  for (const phaseData of phases) {
    if (age < phaseData.max) {
      return { phase: phaseData.phase, phaseName: phaseData.name, phaseEmoji: phaseData.emoji }
    }
  }

  return { phase: 'new', phaseName: 'Lua Nova', phaseEmoji: '🌑' }
}

/**
 * Calcula a iluminação da lua (0-100%)
 */
function calculateIllumination(age: number): number {
  const SYNODIC_MONTH = 29.53058867
  const phase = (age / SYNODIC_MONTH) * 2 * Math.PI
  const illumination = (1 - Math.cos(phase)) / 2
  return Math.round(illumination * 100)
}

/**
 * Encontra a próxima fase lunar
 */
function getNextPhase(currentAge: number, currentPhase: MoonPhase): { phase: MoonPhase; phaseName: string; date: Date } {
  const SYNODIC_MONTH = 29.53058867
  const phaseTargets: Array<{ age: number; phase: MoonPhase; name: string }> = [
    { age: 0, phase: 'new', name: 'Lua Nova' },
    { age: 7.38265, phase: 'first-quarter', name: 'Quarto Crescente' },
    { age: 14.76530, phase: 'full', name: 'Lua Cheia' },
    { age: 22.14795, phase: 'last-quarter', name: 'Quarto Minguante' },
    { age: 29.53059, phase: 'new', name: 'Lua Nova' },
  ]

  // Encontrar próxima fase
  let nextPhaseData = phaseTargets[0]!
  let daysUntilNext = 0

  for (const target of phaseTargets) {
    if (target.age > currentAge) {
      nextPhaseData = target
      daysUntilNext = target.age - currentAge
      break
    }
  }

  // Se não encontrou, próxima é lua nova do próximo ciclo
  if (daysUntilNext === 0) {
    daysUntilNext = SYNODIC_MONTH - currentAge
    nextPhaseData = phaseTargets[0]!
  }

  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + daysUntilNext)

  return {
    phase: nextPhaseData.phase,
    phaseName: nextPhaseData.name,
    date: nextDate,
  }
}

/**
 * Obtém informações completas sobre a lua atual
 */
export function getLunarInfo(date: Date = new Date()): LunarInfo {
  const age = calculateMoonAge(date)
  const { phase, phaseName, phaseEmoji } = getMoonPhaseFromAge(age)
  const illumination = calculateIllumination(age)
  const nextPhase = getNextPhase(age, phase)

  return {
    phase,
    phaseName,
    phaseEmoji,
    illumination,
    nextPhase,
  }
}

/**
 * Formata data para exibição
 */
export function formatLunarDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

/**
 * Calcula as próximas N fases lunares principais com horários PRECISOS
 * Usa astronomy-engine para cálculos astronômicos exatos baseados em dados JPL
 * Retorna as 4 fases principais: Nova, Crescente, Cheia, Minguante
 */
export function getNextMoonPhases(count: number = 8, startDate: Date = new Date()): Array<{
  phase: MoonPhase
  phaseName: string
  date: Date
}> {
  const Astronomy = require('astronomy-engine')
  const phases: Array<{ phase: MoonPhase; phaseName: string; date: Date }> = []

  // Mapeamento de quarter para nossos tipos
  const quarterMap: Record<number, { phase: MoonPhase; name: string }> = {
    0: { phase: 'new', name: 'Lua Nova' },
    1: { phase: 'first-quarter', name: 'Quarto Crescente' },
    2: { phase: 'full', name: 'Lua Cheia' },
    3: { phase: 'last-quarter', name: 'Quarto Minguante' },
  }

  // Buscar próximas fases usando astronomy-engine
  let searchTime = startDate

  while (phases.length < count) {
    // SearchMoonQuarter encontra a próxima fase lunar principal
    const moonQuarter = Astronomy.SearchMoonQuarter(searchTime)

    if (!moonQuarter) break

    const quarterInfo = quarterMap[moonQuarter.quarter]!

    phases.push({
      phase: quarterInfo.phase,
      phaseName: quarterInfo.name,
      date: moonQuarter.time.date, // Data/hora precisa da fase
    })

    // Próxima busca começa 1 dia após esta fase
    searchTime = new Date(moonQuarter.time.date.getTime() + 1000 * 60 * 60 * 24)
  }

  return phases
}
