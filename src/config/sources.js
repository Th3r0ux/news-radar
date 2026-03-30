export const RSS_SOURCES = [
    {
        name: "Radio-Canada",
        slug: "rss-radio-canada",
        type: "rss",
        base_url: "https://ici.radio-canada.ca/rss/4159",
        url: "https://ici.radio-canada.ca/rss/4159",
        category: "general_quebec",
        priority: 10,
        language: "fr",
        region: "quebec"
    },
    {
        name: "La Presse",
        slug: "rss-lapresse",
        type: "rss",
        base_url: "https://www.lapresse.ca/actualites/rss",
        url: "https://www.lapresse.ca/actualites/rss",
        category: "general_quebec",
        priority: 10,
        language: "fr",
        region: "quebec"
    },
    {
        name: "TVA Nouvelles",
        slug: "rss-tva-nouvelles",
        type: "rss",
        base_url: "https://www.tvanouvelles.ca/rss.xml",
        url: "https://www.tvanouvelles.ca/rss.xml",
        category: "general_quebec",
        priority: 9,
        language: "fr",
        region: "quebec"
    },
    {
        name: "CBC News",
        slug: "rss-cbc-news",
        type: "rss",
        base_url: "https://www.cbc.ca/cmlink/rss-topstories",
        url: "https://www.cbc.ca/cmlink/rss-topstories",
        category: "general_canada",
        priority: 8,
        language: "en",
        region: "canada"
    },
    {
        name: "Global News",
        slug: "rss-global-news",
        type: "rss",
        base_url: "https://globalnews.ca/feed/",
        url: "https://globalnews.ca/feed/",
        category: "general_canada",
        priority: 7,
        language: "en",
        region: "canada"
    },
    {
        name: "Reuters World",
        slug: "rss-reuters-world",
        type: "rss",
        base_url: "https://www.reuters.com/rssFeed/worldNews",
        url: "https://www.reuters.com/rssFeed/worldNews",
        category: "international",
        priority: 8,
        language: "en",
        region: "international"
    },
    {
        name: "Le Devoir",
        slug: "rss-le-devoir",
        type: "rss",
        base_url: "https://www.ledevoir.com/rss/section/politique.xml",
        url: "https://www.ledevoir.com/rss/section/politique.xml",
        category: "politique",
        priority: 8,
        language: "fr",
        region: "quebec"
    },
    {
        name: "Les Affaires",
        slug: "rss-les-affaires",
        type: "rss",
        base_url: "https://www.lesaffaires.com/feed/",
        url: "https://www.lesaffaires.com/feed/",
        category: "economie",
        priority: 7,
        language: "fr",
        region: "quebec"
    },
    {
        name: "Journal de Montréal",
        slug: "rss-jdm",
        type: "rss",
        base_url: "https://www.journaldemontreal.com/rss.xml",
        url: "https://www.journaldemontreal.com/rss.xml",
        category: "faits_divers",
        priority: 8,
        language: "fr",
        region: "quebec"
    },
    {
        name: "MétéoAlerte",
        slug: "rss-meteoalerte",
        type: "rss",
        base_url: "https://meteoalerte.com/rss.php",
        url: "https://meteoalerte.com/rss.php",
        category: "meteo",
        priority: 8,
        language: "fr",
        region: "canada"
    },
    {
        name: "QC 511 MTL40",
        slug: "rss-qc511-mtl40",
        type: "rss",
        base_url: "https://www.quebec511.info/Diffusion/Rss/GenererRss.aspx?regn=13000&routes=40&lang=fr",
        url: "https://www.quebec511.info/Diffusion/Rss/GenererRss.aspx?regn=13000&routes=40&lang=fr",
        category: "transport",
        priority: 6,
        language: "fr",
        region: "quebec"
    },
    {
        name: "QC 511 QC40",
        slug: "rss-qc511-qc40",
        type: "rss",
        base_url: "https://www.quebec511.info/Diffusion/Rss/GenererRss.aspx?regn=12000&routes=40&lang=fr",
        url: "https://www.quebec511.info/Diffusion/Rss/GenererRss.aspx?regn=12000&routes=40&lang=fr",
        category: "transport",
        priority: 6,
        language: "fr",
        region: "quebec"
    },
    {
        name: "Ministère de la Justice Canada",
        slug: "rss-justice-canada",
        type: "rss",
        base_url: "https://api.io.canada.ca/io-server/gc/news/fr/v2?dept=departmentjustice&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Minist%C3%A8re%20de%20la%20Justice%20Canada",
        url: "https://api.io.canada.ca/io-server/gc/news/fr/v2?dept=departmentjustice&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Minist%C3%A8re%20de%20la%20Justice%20Canada",
        category: "justice",
        priority: 6,
        language: "fr",
        region: "canada"
    }
]