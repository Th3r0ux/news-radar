export const RSS_SOURCES = [

    // 🟢 GÉNÉRAL QUÉBEC (coeur)
    {
        name: "Radio-Canada",
        url: "https://ici.radio-canada.ca/rss/4159",
        category: "general_quebec",
        priority: 10,
        language: "fr",
        region: "quebec"
    },
    {
        name: "La Presse",
        url: "https://www.lapresse.ca/actualites/rss.xml",
        category: "general_quebec",
        priority: 10,
        language: "fr",
        region: "quebec"
    },
    {
        name: "TVA Nouvelles",
        url: "https://www.tvanouvelles.ca/rss.xml",
        category: "general_quebec",
        priority: 9,
        language: "fr",
        region: "quebec"
    },
    {
        name: "Noovo Info",
        url: "https://www.noovo.info/rss.xml",
        category: "general_quebec",
        priority: 9,
        language: "fr",
        region: "quebec"
    },

    // 🟡 CANADA / INTERNATIONAL
    {
        name: "CBC News",
        url: "https://www.cbc.ca/cmlink/rss-topstories",
        category: "general_canada",
        priority: 8,
        language: "en",
        region: "canada"
    },
    {
        name: "Global News",
        url: "https://globalnews.ca/feed/",
        category: "general_canada",
        priority: 7,
        language: "en",
        region: "canada"
    },
    {
        name: "Reuters World",
        url: "https://www.reuters.com/rssFeed/worldNews",
        category: "international",
        priority: 8,
        language: "en",
        region: "international"
    },

    // 🔴 POLITIQUE
    {
        name: "Le Devoir",
        url: "https://www.ledevoir.com/rss/section/politique.xml",
        category: "politique",
        priority: 8,
        language: "fr",
        region: "quebec"
    },

    // 🟠 ÉCONOMIE / CONSOMMATION
    {
        name: "Les Affaires",
        url: "https://www.lesaffaires.com/rss.xml",
        category: "economie",
        priority: 7,
        language: "fr",
        region: "quebec"
    },

    // 🔵 FAITS DIVERS / SÉCURITÉ
    {
        name: "Journal de Montréal",
        url: "https://www.journaldemontreal.com/rss.xml",
        category: "faits_divers",
        priority: 8,
        language: "fr",
        region: "quebec"
    },

    // 🟣 MÉTÉO / IMPACT PUBLIC
    {
        name: "MétéoMédia",
        url: "https://www.meteomedia.com/rss",
        category: "meteo",
        priority: 8,
        language: "fr",
        region: "canada"
    },

    // 🟢 RÉGIONAL QUÉBEC (signal faible)
    {
        name: "Le Soleil",
        url: "https://www.lesoleil.com/rss.xml",
        category: "regional",
        priority: 7,
        language: "fr",
        region: "quebec"
    },
    {
        name: "Le Nouvelliste",
        url: "https://www.lenouvelliste.ca/rss.xml",
        category: "regional",
        priority: 7,
        language: "fr",
        region: "quebec"
    },
    {
        name: "La Tribune",
        url: "https://www.latribune.ca/rss.xml",
        category: "regional",
        priority: 7,
        language: "fr",
        region: "quebec"
    },

    // 🟤 TRANSPORT / INFRASTRUCTURE
    {
        name: "MTQ",
        url: "https://www.quebec.ca/rss",
        category: "transport",
        priority: 6,
        language: "fr",
        region: "quebec"
    },

    // ⚫ SANTÉ PUBLIQUE
    {
        name: "Santé Canada",
        url: "https://www.canada.ca/en/public-health/services/rss.xml",
        category: "sante",
        priority: 6,
        language: "fr",
        region: "canada"
    },

    // 🔶 SPORT
    {
        name: "RDS",
        url: "https://www.rds.ca/rss",
        category: "sport",
        priority: 6,
        language: "fr",
        region: "quebec"
    },

    // 🔷 CULTURE / POP
    {
        name: "Hollywood PQ",
        url: "https://hollywoodpq.com/feed/",
        category: "culture",
        priority: 5,
        language: "fr",
        region: "quebec"
    }

]