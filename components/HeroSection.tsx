"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { usePostsStore } from "@/store/usePostagensStore";
import { useEffect } from "react";
import { dateFormatter } from "@/shared/utils/dateFormatter";

export default function Herosection(){
    const { fetchPosts, postsContent } = usePostsStore()

    useEffect(() => {
      fetchPosts("Web Development")
    }, [fetchPosts])

    return (
        <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 5000 }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {postsContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px]">
              <div className="relative w-full h-full">
                <Image
                  src={slide.featuredImage?.url || ""}
                  alt={slide.title}
                  fill
                  quality={100}
                  style={{ objectFit: "cover" }}
                  className="brightness-75"
                />
              </div>
              {/* Conteúdo */}
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32 text-white bg-black bg-opacity-70 w-1/2">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="font-semibold mb-4">{slide.excerpt.split(' ').slice(0, 100).join(' ') + '...'}</p>
                <p className="mb-4">{dateFormatter.format(new Date(slide.updatedAt))}</p>
                <a
                  href="#"
                  className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                >
                  Ler mais
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
}