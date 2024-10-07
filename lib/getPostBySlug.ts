import { graphcms, POST_BY_SLUG_QUERY } from '@/services/graphcms'
import { GraphCMSPostsResponse } from '@/shared/types/Postagens'

export async function getPostBySlug(slug: string) {
  try {
    const data: GraphCMSPostsResponse = await graphcms.request(
      POST_BY_SLUG_QUERY,
      { slug },
    )
    const post = data.postsConnection.edges.map((edge) => edge.node)[0]
    return post ?? null
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    return null
  }
}
