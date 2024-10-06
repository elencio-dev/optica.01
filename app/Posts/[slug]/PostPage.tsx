'use client'

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Post } from "@/shared/types/Postagens";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { usePostsStore } from "@/store/usePostagensStore";


export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { fetchPosts, postsContent } = usePostsStore();

  useEffect(() => {
    fetchPosts("unilabstudentchapter");
  }, [fetchPosts]);

  const post = postsContent.find((post: Post) => post.slug === params.slug);

  if (!post) {
    return (
      <div className="py-8 max-w-7xl mx-auto px-4">
        <Skeleton className="w-2/3 h-12 mb-6" />
        <Skeleton className="w-full h-64 mb-6" />
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  return (
    <>

      <div className="py-8 max-w-7xl mx-auto px-4">
        <Card className="overflow-hidden">
          <CardHeader className="relative h-64 md:h-96">
            <Image
              src={post.featuredImage?.url || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardTitle className="absolute bottom-4 left-4 right-4 text-2xl md:text-4xl font-bold text-white">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                  Publicado em: {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                <span>
                  Última atualização:{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-400px)] pr-4">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content.markdown ?? "Conteúdo não disponível."}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
