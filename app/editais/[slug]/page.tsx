"use client";

import { useEffect } from "react";
import { useEditaisStore } from "@/store/useEditaisStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileIcon, CalendarIcon, RefreshCwIcon } from "lucide-react";
import { Attachment } from "@/shared/types/Edital";
import { NextSeo } from "next-seo";

export default function EditalPage({ params }: { params: { slug: string } }) {
  const { editaisContent, fetchEditais } = useEditaisStore();

  useEffect(() => {
    fetchEditais();
  }, [fetchEditais]);

  const edital = editaisContent.find((post) => post.slug === params.slug);

  if (!edital) {
    return (
      <div className="py-8 max-w-7xl mx-auto px-4">
        <Skeleton className="w-2/3 h-12 mb-6" />
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="w-full lg:w-1/4 h-64" />
          <Skeleton className="w-full lg:w-3/4 h-96" />
        </div>
      </div>
    );
  }

  const truncateFileName = (fileName: string, maxLength: number) => {
    return fileName.length > maxLength ? fileName.slice(0, maxLength) + '...' : fileName;
  };

  return (
    <>
     <NextSeo
        title={edital.title}
        description={edital.excerpt}
        openGraph={{
          type: 'article',
          url: `https://www.unilabstudentchapter.org/editais/${edital.slug}`,
          title: edital.title,
          description: edital.excerpt,
        }}
      />

    <div className="py-8 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{edital.title}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-1/4">
          <CardHeader>
            <CardTitle className="text-xl">Anexos</CardTitle>
          </CardHeader>
          <CardContent>
            {edital.attachments && edital.attachments.length > 0 ? (
              <ScrollArea className="h-[300px] w-full pr-4">
                <ul className="space-y-2">
                  {edital.attachments.map((attachment: Attachment, index: number) => (
                    <li key={index}>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={attachment.fileName}
                        >
                          <FileIcon className="mr-2 h-4 w-4" />
                          {truncateFileName(attachment.fileName, 20)}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-gray-500 italic">Não há anexos disponíveis para este edital.</p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:flex-grow">
          <CardContent className="pt-6">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {edital.content.markdown ?? "Conteúdo não disponível."}
                </ReactMarkdown>
              </div>
            </ScrollArea>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Publicado em: {new Date(edital.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                <span>Última atualização: {new Date(edital.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}