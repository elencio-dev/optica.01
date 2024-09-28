import { unstable_cache } from "next/cache";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";
import { Post } from "@/shared/types/Postagens";

interface GraphCMSPostsResponse {
  postsConnection: {
    edges: {
      node: Post;
    }[];
  };
}


export const getPosts = unstable_cache(
  async (categoryName: string) => {
    try {
      const data: GraphCMSPostsResponse = await graphcms.request(POSTS_QUERY, { categoryName });
      const postsList = data.postsConnection.edges.map((edge) => edge.node);
      return postsList;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return [];
    }
  },
  ['posts'],
  { revalidate: 3600 }
);
