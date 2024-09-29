"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { graphcms, POSTS_QUERY } from "@/services/graphcms";
import { Post } from "@/shared/types/Postagens";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, RefreshCwIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import { NextSeo } from "next-seo";

interface GraphCMSPostsResponse {
    postsConnection: {
        edges: {
            node: Post;
        }[];
    };
}

export default async function EditalPage({ params }: { params: { slug: string } }) {
    const data: GraphCMSPostsResponse = await graphcms.request(POSTS_QUERY, { categoryName: "unilabstudentchapter" });
    const postsList = data.postsConnection.edges.map((edge) => edge.node);
    const post = postsList.find((post: Post) => post.slug === params.slug);

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
            <NextSeo
                title={post.title}
                description={post.excerpt}
                canonical={`https://www.unilabstudentchapter.org/posts/${post.slug}`}
                openGraph={{
                    type: 'article',
                    url: `https://www.unilabstudentchapter.org/posts/${post.slug}`,
                    title: post.title,
                    description: post.excerpt,
                    images: [
                        {
                            url: post.featuredImage?.url || "/default-image.jpg",
                            alt: post.title,
                        },
                    ],
                }}
            />


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
                                <span>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <RefreshCwIcon className="mr-2 h-4 w-4" />
                                <span>Última atualização: {new Date(post.updatedAt).toLocaleDateString()}</span>
                            </div>
                            {post.categories && (
                                <div className="flex items-center">
                                    <TagIcon className="mr-2 h-4 w-4" />
                                    <span>{post.categories.map((cat: { name: any; }) => cat.name).join(", ")}</span>
                                </div>
                            )}
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