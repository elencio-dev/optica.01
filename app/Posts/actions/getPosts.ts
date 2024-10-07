'use server'

import { unstable_cache as unstableCache } from 'next/cache'
import { graphcms, POSTS_QUERY } from '@/services/graphcms'
import { GraphCMSPostsResponse } from '@/shared/types/Postagens'

// Função para obter os posts com cache usando unstable_cache
const getPosts = unstableCache(
  async (categoryName: string) => {
    try {
      const data: GraphCMSPostsResponse = await graphcms.request(POSTS_QUERY, {
        categoryName,
      })
      const postsList = data.postsConnection.edges.map((edge) => edge.node)
      return postsList
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      return []
    }
  },
  ['posts'],
  { revalidate: 3600 }, // Cache revalidado a cada 1 hora
)

// Função que pode ser usada para obter os posts de maneira cacheada
export async function getCachedPosts(categoryName: string) {
  return await getPosts(categoryName)
}
