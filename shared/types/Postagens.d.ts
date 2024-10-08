interface PostCategory {
    name: string;
    slug: string;
  }

  interface PostSitemap {
    slug: string;
    updatedAt: string;
  }
  
  interface PostAuthor {
    bio: string;
    name: string;
    id: string;
    photoProfile: {
      url: string;
    };
  }
  
  export interface Post {
    author: PostAuthor;
    createdAt: string;
    updatedAt: string;
    excerpt: string;
    content: {
      text: string;
      markdown: string;
    };
    slug: string;
    title: string;
    featuredImage?: {
      url: string;
    };
    categories: PostCategory[];
  }

  export interface GraphCMSPostsResponse {
    postsConnection: {
        edges: {
            node: Post;
        }[];
    };
}
  
  export interface PostsState {
    postsContent: Post[];
    initializePosts: (cachedPosts: Post[]) => void; 
    fetchPosts: (category: string) => Promise<void>;
  }