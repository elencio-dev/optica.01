import { create } from "zustand";
import { Post, PostsState } from "@/shared/types/Postagens";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";

export const usePostsStore = create<PostsState>((set) => ({
  postsContent: [],

  initializePosts: (cachedPosts: Post[]) => {
    set({ postsContent: cachedPosts });
  }
  
}));
