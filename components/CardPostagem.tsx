"use client";
import { useEffect } from "react"
import { usePostsStore } from "@/store/usePostagensStore";
import Image from "next/image";

export default function CardPostagem() {

    const { fetchPosts, postsContent} = usePostsStore()

    useEffect(()=> {
        fetchPosts("Web Development")
    },[fetchPosts])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 px-4">
            {postsContent.map((postagem, index) => (
                <div
                    key={index}
                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md"
                >
                    {/* Imagem */}
                    <Image
                        className="rounded-t-lg"
                        src={postagem.featuredImage?.url || ""}
                        alt={postagem.title}
                        width={400}
                        height={250}
                        style={{ objectFit: "cover" }}
                    />

                    {/* Conteúdo do card */}
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {postagem.title}
                        </h5>
                        <p className="mb-4 font-normal text-gray-700">{postagem.excerpt.split(' ').slice(0, 20).join(' ') + '...'}</p>
                        <a
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-600 rounded-lg hover:bg-violet-700"
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
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
