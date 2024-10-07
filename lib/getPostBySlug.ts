import { graphcms, POSTS_QUERY } from '@/services/graphcms'
import { Post, GraphCMSPostsResponse } from '@/shared/types/Postagens'

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data: GraphCMSPostsResponse = await graphcms.request(POSTS_QUERY, {
      slug,
    })
    const post = data.postsConnection.edges
      .map((edge) => edge.node)
      .find((p) => p.slug === slug)
    return post ?? null
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    return null
  }
}
