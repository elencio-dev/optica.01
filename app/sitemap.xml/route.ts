import { graphcms, EDITAIS_QUERY, POSTS_QUERY } from '@/services/graphcms'
import { EditalResponse, PostResponse } from '@/shared/types/Edital'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    // Solicitação dos editais
    const editalResponse: EditalResponse = await graphcms.request(EDITAIS_QUERY)
    if (!editalResponse || !editalResponse.editalConnection) {
      throw new Error('Falha ao buscar editais')
    }

    // Solicitação dos posts
    const postResponse: PostResponse = await graphcms.request(POSTS_QUERY, {
      categoryName: 'unilabstudentchapter',
    })
    if (!postResponse || !postResponse.postsConnection) {
      throw new Error('Falha ao buscar posts')
    }

    // Páginas estáticas
    const staticPages = ['/', '/sobre', '/galeria', '/membros']

    // Páginas de editais
    const editaisPages = editalResponse.editalConnection.edges.map(
      (edital) => ({
        url: `https://www.unilabstudentchapter.org/editais/${encodeURIComponent(edital.node.slug)}`,
        lastmod: new Date(edital.node.updatedAt).toISOString(),
      }),
    )

    // Páginas de posts
    const postsPages = postResponse.postsConnection.edges.map((post) => ({
      url: `https://www.unilabstudentchapter.org/posts/${encodeURIComponent(post.node.slug)}`,
      lastmod: new Date(post.node.updatedAt).toISOString(),
    }))

    // Concatenar todas as páginas
    const pages = [
      ...staticPages.map((url) => ({
        url: `https://www.unilabstudentchapter.org${url}`,
        lastmod: new Date().toISOString(),
      })),
      ...editaisPages,
      ...postsPages,
    ]

    // Construir o sitemap em XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `
              <url>
                <loc>${page.url}</loc>
                <lastmod>${page.lastmod}</lastmod>
              </url>
            `,
          )
          .join('')}
      </urlset>
    `

    // Retornar o sitemap como resposta
    return new NextResponse(sitemap.trim(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Erro ao gerar o sitemap:', error)
    return new NextResponse('<error>Falha ao gerar o sitemap</error>', {
      headers: {
        'Content-Type': 'application/xml',
      },
      status: 500,
    })
  }
}
