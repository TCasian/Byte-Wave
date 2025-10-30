const fs = require('fs');
const path = require('path');

// Inserisci qui le tue pagine statiche
const staticPages = [
  '',
  'security',
  'ai',
  'startups',
  'venture',
  'blockchain',
  'newsletters'
];

// Se vuoi generare anche articoli dinamici da Supabase
const { SupabaseService } = require('./src/supabaseClient');

async function generateSitemap() {
  let urls = staticPages.map(page => {
    return `
  <url>
    <loc>https://techripples.vercel.app/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Recupera articoli dal DB
  try {
    const articles = await SupabaseService.getAllArticles();
    articles.forEach(article => {
      urls.push(`
  <url>
    <loc>https://techripples.vercel.app/articles/${article.id}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`);
    });
  } catch (err) {
    console.log("Errore recupero articoli:", err.message);
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generata con successo!');
}

generateSitemap();
