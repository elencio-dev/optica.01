import { graphcms, EDITAIS_QUERY, POSTS_QUERY } from '@/services/graphcms'

import { EditalResponse, PostResponse } from '@/shared/types/Edital'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const editalResponse: EditalResponse = await graphcms.request(EDITAIS_QUERY)
  const postResponse: PostResponse = await graphcms.request(POSTS_QUERY, {
    categoryName: 'unilabstudentchapter',
  })

  const staticPages = ['/', '/sobre', '/galeria', '/membros']

  const editaisPages = editalResponse.editalConnection.edges.map((edital) => ({
    url: `https://www.unilabstudentchapter.org//editais/${edital.node.slug}`,
    lastmod: edital.node.updatedAt,
  }))

  const postsPages = postResponse.postsConnection.edges.map((post) => ({
    url: `https://www.unilabstudentchapter.org//posts/${post.node.slug}`,
    lastmod: post.node.updatedAt,
  }))

  const pages = [
    ...staticPages.map((url) => ({
      url: `https://www.unilabstudentchapter.org/${url}`,
      lastmod: new Date().toISOString(),
    })),
    ...editaisPages,
    ...postsPages,
  ]

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

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
