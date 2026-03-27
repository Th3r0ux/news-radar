import 'dotenv/config'
import Parser from 'rss-parser'
import { supabase } from '../lib/supabase.js'
import { RSS_SOURCES } from '../config/sources.js'

const parser = new Parser()

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(w => w.length > 3)
}

async function ingestSource(sourceConfig) {
  console.log(`\nFetching: ${sourceConfig.name}`)

  const feed = await parser.parseURL(sourceConfig.url)

  const { data: source } = await supabase
    .from('sources')
    .select('*')
    .eq('slug', sourceConfig.slug)
    .single()

  if (!source) {
    console.error(`Source non trouvée: ${sourceConfig.slug}`)
    return
  }

  for (const item of feed.items.slice(0, 10)) {
    try {
      const title = item.title || ''
      const summary = item.contentSnippet || item.content || ''
      const url = item.link || null
      const external_id = item.guid || url
      const raw_text = `${title} ${summary}`

      const { data: rawItem, error: rawError } = await supabase
        .from('raw_items')
        .insert({
          source_id: source.id,
          external_id,
          title,
          summary,
          url,
          published_at: item.pubDate ? new Date(item.pubDate) : null,
          raw_text
        })
        .select()
        .single()

      if (rawError) {
  console.log(`↷ Doublon ignoré: ${title}`)
  continue
}

      // 🔍 Chercher candidat existant
const words = normalize(title)

const { data: recentCandidates } = await supabase
  .from('story_candidates')
  .select('*')
  .gte('created_at', new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString())

let candidate = null

for (const existing of recentCandidates || []) {
  const existingWords = normalize(existing.canonical_title)

  const overlap = words.filter(w => existingWords.includes(w)).length

  if (overlap >= 2) {
    candidate = existing
    break
  }
}

// ➕ Sinon créer
if (!candidate) {
  const { data: newCandidate, error: candidateError } = await supabase
    .from('story_candidates')
    .insert({
      canonical_title: title,
      canonical_summary: summary
    })
    .select()
    .single()

  if (candidateError) {
    console.error(candidateError)
    continue
  }

  candidate = newCandidate
}

      await supabase
        .from('candidate_items')
        .insert({
          candidate_id: candidate.id,
          raw_item_id: rawItem.id
        })

      console.log(`✔ ${title}`)

    } catch (err) {
      console.error('Erreur item:', err)
    }
  }
}

async function main() {
  for (const source of RSS_SOURCES) {
    await ingestSource(source)
  }
}

main()
