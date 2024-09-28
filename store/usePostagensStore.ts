import { create } from "zustand";
import { Post, PostsState } from "@/shared/types/Postagens";
import { getPosts } from "@/app/Posts/actions/getPosts";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";

export const usePostsStore = create<PostsState>((set) => ({
  postsContent: [],
  
  fetchPosts: async (categoryName: string) => {
    try {
      const data = await graphcms.request(POSTS_QUERY, { categoryName });
      //@ts-ignore
      const postsList = data.postsConnection.edges.map((edge: any) => edge.node);
      return postsList;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return [];
    }
},

  initializePosts: (cachedPosts: Post[]) => {
    set({ postsContent: cachedPosts });
  },


}));
