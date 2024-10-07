import { create } from 'zustand'
import { Post, PostsState } from '@/shared/types/Postagens'
import { graphcms, POSTS_QUERY } from '@/services/graphcms'

export const usePostsStore = create<PostsState>((set) => ({
  postsContent: [],

  fetchPosts: async (categoryName: string) => {
    try {
      const response = await graphcms.request<{
        postsConnection: { edges: { node: Post }[] }
      }>(POSTS_QUERY, { categoryName })
      const postsList = response.postsConnection.edges.map((edge) => edge.node)
      set({ postsContent: postsList })
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    }
  },

  initializePosts: (cachedPosts: Post[]) => {
    set({ postsContent: cachedPosts })
  },
}))
