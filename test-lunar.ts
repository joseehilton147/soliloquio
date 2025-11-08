import { getNextMoonPhases } from './packages/ui/src/lib/lunar-calendar'

console.log('Testing getNextMoonPhases...')
const start = Date.now()
const phases = getNextMoonPhases(8)
const elapsed = Date.now() - start

console.log(`Found ${phases.length} phases in ${elapsed}ms`)
phases.forEach(p => {
  console.log(`${p.phaseName}: ${p.date.toLocaleDateString('pt-BR')}`)
})
