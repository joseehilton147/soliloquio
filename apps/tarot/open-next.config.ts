import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// NOTA: `defineCloudflareConfig` descarta chaves desconhecidas (constrói um
// objeto novo só com overrides de cache), então `buildCommand` precisa ser
// adicionado via spread — sem isso o adapter executa o default `pnpm build`,
// que resolve para o script `build` deste próprio pacote
// (`opennextjs-cloudflare build`) e entra em recursão infinita.
// O `build` é o wrapper de propósito: no fluxo Workers Builds,
// `pnpm run build` precisa emitir .open-next/worker.js.
export default {
	...defineCloudflareConfig(),
	// Comando interno do Next executado pelo adapter com cwd=apps/tarot.
	buildCommand: 'pnpm exec next build',
}
