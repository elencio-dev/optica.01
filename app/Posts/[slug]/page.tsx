import { getPostBySlug } from "@/lib/getPostBySlug";
import PostPage from "./PostPage";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getPostBySlug(params.slug);

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
  return <PostPage params={params} />;
}
