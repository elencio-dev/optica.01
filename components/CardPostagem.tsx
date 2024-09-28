"use client";

import { useEffect } from "react";
import { usePostsStore } from "@/store/usePostagensStore";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/shared/types/Postagens";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react";

interface CardPostagemProps {
  cachedPosts: Post[];
}

export default function CardPostagem({ cachedPosts }: CardPostagemProps) {
  const { postsContent, initializePosts, isLoading } = usePostsStore();

  useEffect(() => {
    if (postsContent.length === 0) {
      initializePosts(cachedPosts);
    }
  }, [cachedPosts, initializePosts, postsContent.length]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 px-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 px-4">
      {postsContent.map((postagem, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <Image
                className="object-cover rounded-t-lg"
                src={postagem.featuredImage?.url || "/placeholder.svg"}
                alt={`Imagem em destaque do post ${postagem.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <CardTitle className="text-lg font-bold text-gray-900 mb-2">{postagem.title}</CardTitle>
            <p className="text-gray-700 mb-4">
              {postagem.excerpt.split(" ").slice(0, 20).join(" ")}...
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {postagem.categories?.map((category, idx) => (
                <Badge key={idx} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime={postagem.createdAt}>
                {new Date(postagem.createdAt).toLocaleDateString()}
              </time>
              <ClockIcon className="ml-4 mr-2 h-4 w-4" />
              <span>{postagem.readingTime || '5 min'} leitura</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/Posts/${postagem.slug}`}>
                Ler mais <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}