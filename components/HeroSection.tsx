"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { usePostsStore } from "@/store/usePostagensStore";
import { useEffect } from "react";
import { dateFormatter } from "@/shared/utils/dateFormatter";
import { Post } from "@/shared/types/Postagens";
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

interface CardPostagemProps {
  cachedPosts: Post[];
}

export default function Herosection({ cachedPosts }: CardPostagemProps) {
  const { postsContent, initializePosts } = usePostsStore()

  useEffect(() => {
    if (postsContent.length === 0) {
      initializePosts(cachedPosts);
    }
  }, [cachedPosts, initializePosts, postsContent.length]);

  return (
    <div className="relative w-full h-[600px]">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !bg-white !opacity-50 !mx-2 !rounded-full"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-full"
      >
        {postsContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px]">
              <Image
                src={slide.featuredImage?.url || "/placeholder.svg"}
                alt={slide.title}
                fill
                quality={100}
                priority={index === 0}
                style={{ objectFit: "cover" }}
                className="brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-20 lg:px-32 text-white w-full sm:w-3/4 lg:w-2/3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{slide.title}</h2>
                <p className="text-sm sm:text-base lg:text-lg font-medium mb-4 line-clamp-3">{slide.excerpt}</p>
                <div className="flex items-center mb-6 text-sm sm:text-base text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={slide.updatedAt}>{dateFormatter.format(new Date(slide.updatedAt))}</time>
                </div>
                <Button
                  asChild
                  className="w-fit group"
                >
                  <a href="#">
                    Ler mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !text-white !opacity-75 hover:!opacity-100 transition-opacity duration-300"></div>
      <div className="swiper-button-next !text-white !opacity-75 hover:!opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}