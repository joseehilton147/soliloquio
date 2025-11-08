-- ═══════════════════════════════════════════════════════
-- Habilita Fuzzy Search com pg_trgm (PostgreSQL Trigram)
-- ═══════════════════════════════════════════════════════
--
-- Esta extensão permite buscas aproximadas (fuzzy matching)
-- usando similaridade de trigramas. Essencial para autocomplete
-- e sugestões de tags.
--
-- Execução: psql -d database_url -f enable-fuzzy-search.sql
-- ═══════════════════════════════════════════════════════

-- Habilita extensão pg_trgm (se ainda não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Cria índice GIN na coluna 'value' de tarot_tags para busca eficiente
-- GIN (Generalized Inverted Index) é otimizado para text search
CREATE INDEX IF NOT EXISTS tarot_tags_value_trgm_idx
ON tarot_tags
USING gin (value gin_trgm_ops);

-- Cria índice adicional para busca combinada (deck + type + fuzzy value)
CREATE INDEX IF NOT EXISTS tarot_tags_search_idx
ON tarot_tags (deckId, type, value);

-- Comentário explicativo nos índices
COMMENT ON INDEX tarot_tags_value_trgm_idx IS
'Índice trigram para fuzzy search nas tags. Permite busca aproximada com ILIKE/similarity()';

COMMENT ON INDEX tarot_tags_search_idx IS
'Índice composto para filtragem por deck + tipo + busca exata. Complementa o índice trigram.';
