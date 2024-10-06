import { Post } from "@/shared/types/Postagens";
import { usePostsStore } from "@/store/usePostagensStore";
import PostPage from "./PostPage";


export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = usePostsStore.getState().postsContent.find(
    (post: Post) => post.slug === params.slug
  );

  if (!post) {
    return {
      title: "Postagem não encontrada",
      description: "Esta postagem não foi encontrada.",
    };
  }

  return {
    title: post.title,
    description: post.content.markdown?.slice(0, 150) ?? "Postagem detalhada",
    openGraph: {
      title: post.title,
      description: post.content.markdown?.slice(0, 150) ?? "Postagem detalhada",
      url: `https://www.unilabstudentchapter.org/posts/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
};

export default function Page({ params }: { params: { slug: string } }) {
  return <PostPage params={params} />
}