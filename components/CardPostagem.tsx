"use client";

import { useEffect } from "react";
import { usePostsStore } from "@/store/usePostagensStore";
import Image from "next/image";
import { Post } from "@/shared/types/Postagens";

interface CardPostagemProps {
  cachedPosts: Post[];
}

export default function CardPostagem({ cachedPosts }: CardPostagemProps) {
  const { postsContent, initializePosts } = usePostsStore();

  // Garantindo que os posts cacheados sejam inicializados corretamente
  useEffect(() => {
    if (postsContent.length === 0) {
      initializePosts(cachedPosts); // Inicializando posts do cache
    }
  }, [cachedPosts, initializePosts, postsContent.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 px-4">
      {postsContent.map((postagem, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          {/* Imagem do Post */}
          <div className="relative w-full h-64">
            <Image
              className="object-cover rounded-t-lg"
              src={postagem.featuredImage?.url || "/default-image.jpg"} // Imagem padrão caso não haja imagem
              alt={`Imagem em destaque do post ${postagem.title}`}
              layout="fill"
              quality={100}
            />
          </div>

          {/* Conteúdo do Card */}
          <div className="p-6 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-gray-900">{postagem.title}</h3>
            <p className="mt-2 text-gray-700">
              {postagem.excerpt.split(" ").slice(0, 20).join(" ")}...
            </p>

            <a
              href={`/post/${postagem.slug}`} // Redirecionando para a página detalhada do post
              className="mt-4 text-violet-700 hover:text-violet-900 font-bold flex items-center gap-2"
              aria-label={`Ler mais sobre ${postagem.title}`}
            >
              Ler mais
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
