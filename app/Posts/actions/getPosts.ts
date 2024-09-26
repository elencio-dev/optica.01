import { unstable_cache } from "next/cache";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";

export const getPosts = unstable_cache(
  async (categoryName: string) => {
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
  ['posts'], 
  { revalidate: 3600 } 
);
