import { create } from "zustand";
import { Post, PostsState } from "@/shared/types/Postagens";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";

export const usePostsStore = create<PostsState>((set) => ({
  postsContent: [],
  fetchPosts: async (categoryName: string) => {
    try {
      const response = await graphcms.request<{
        postsConnection: { edges: { node: Post }[] };
      }>(POSTS_QUERY, {
        categoryName,
      });
      const posts = response.postsConnection.edges.map((edge) => edge.node);
      set({ postsContent: posts });
    } catch (error) {
      console.error('Erro ao buscar os posts:', error);
    }
  },
}));
