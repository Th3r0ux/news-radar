import 'dotenv/config'
import Parser from 'rss-parser'
import { supabase } from '../lib/supabase.js'
import { RSS_SOURCES } from '../config/sources.js'

const parser = new Parser()

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
        // probablement un doublon → on skip
        continue
      }

      const { data: candidate, error: candidateError } = await supabase
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
