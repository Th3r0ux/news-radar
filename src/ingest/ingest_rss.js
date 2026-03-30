import 'dotenv/config'
import Parser from 'rss-parser'
import { supabase } from '../lib/supabase.js'
import { RSS_SOURCES } from '../config/sources.js'

const parser = new Parser()

function normalize(text) {
    return (text || '')
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3)
}

async function ingestSource(sourceConfig) {
    console.log(`\nFetching: ${sourceConfig.name}`)

    let feed

    try {
        feed = await parser.parseURL(sourceConfig.url)
    } catch (err) {
        console.error(`Erreur RSS pour ${sourceConfig.name}: ${err.message}`)
        return
    }

    let { data: source, error: sourceError } = await supabase
        .from('sources')
        .select('*')
        .eq('slug', sourceConfig.slug)
        .maybeSingle()

    if (sourceError) {
        console.error(`Erreur Supabase source ${sourceConfig.name}: ${sourceError.message}`)
        return
    }

    if (!source) {
        const { data: newSource, error: insertSourceError } = await supabase
            .from('sources')
            .insert({
                name: sourceConfig.name,
                slug: sourceConfig.slug,
                type: sourceConfig.type || 'rss',
                base_url: sourceConfig.base_url,
                is_active: true,
                poll_frequency_minutes: 30
            })
            .select()
            .single()

        if (insertSourceError) {
            console.error(`Impossible de créer la source ${sourceConfig.name}: ${insertSourceError.message}`)
            return
        }

        source = newSource
        console.log(`+ Source créée dans Supabase: ${sourceConfig.name}`)
    }

    for (const item of (feed.items || []).slice(0, 10)) {
        try {
            const title = (item.title || '').trim()
            const summary = item.contentSnippet || item.content || ''
            const url = item.link || null
            const external_id = item.guid || url

            if (!title || !external_id) {
                console.log(`↷ Item ignoré (titre ou external_id manquant)`)
                continue
            }

            const raw_text = `${title} ${summary}`

            const { data: rawItem, error: rawError } = await supabase
                .from('raw_items')
                .insert({
                    source_id: source.id,
                    external_id,
                    title,
                    summary,
                    url,
                    published_at: item.pubDate ? new Date(item.pubDate).toISOString() : null,
                    raw_text
                })
                .select()
                .single()

            if (rawError) {
                console.log(`↷ Doublon ignoré: ${title}`)
                continue
            }

            const words = normalize(title)

            const { data: recentCandidates, error: candidatesError } = await supabase
                .from('story_candidates')
                .select('*')
                .gte('created_at', new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString())

            if (candidatesError) {
                console.error('Erreur récupération candidats:', candidatesError.message)
                continue
            }

            let candidate = null

            for (const existing of recentCandidates || []) {
                const existingWords = normalize(existing.canonical_title)
                const overlap = words.filter(w => existingWords.includes(w)).length

                if (overlap >= 2) {
                    candidate = existing
                    break
                }
            }

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
                    console.error('Erreur création candidat:', candidateError.message)
                    continue
                }

                candidate = newCandidate
            }

            const { error: linkError } = await supabase
                .from('candidate_items')
                .insert({
                    candidate_id: candidate.id,
                    raw_item_id: rawItem.id
                })

            if (linkError) {
                console.error('Erreur liaison candidate_items:', linkError.message)
                continue
            }

            console.log(`✔ ${title}`)
        } catch (err) {
            console.error('Erreur item:', err.message || err)
        }
    }
}

async function main() {
    for (const source of RSS_SOURCES) {
        await ingestSource(source)
    }
}

main()