'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Pagination, Autoplay } from 'swiper/modules'
import { usePostsStore } from '@/store/usePostagensStore'
import { useEffect } from 'react'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { Post } from '@/shared/types/Postagens'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'

interface CardPostagemProps {
  cachedPosts: Post[]
}

export default function Herosection({ cachedPosts }: CardPostagemProps) {
  const { postsContent, initializePosts } = usePostsStore()

  useEffect(() => {
    if (postsContent.length === 0) {
      initializePosts(cachedPosts)
    }
  }, [cachedPosts, initializePosts, postsContent.length])

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="h-full"
      >
        {postsContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.featuredImage?.url || '/placeholder.svg'}
                alt={slide.title}
                fill
                quality={100}
                priority={index === 0}
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end sm:justify-center p-4 sm:p-6 md:p-10 lg:p-16 text-white w-full sm:w-3/4 lg:w-2/3">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 leading-tight sm:leading-snug">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-snug">
                  {slide.excerpt}
                </p>
                <div className="flex items-center mb-3 sm:mb-6 text-xs sm:text-sm md:text-base text-gray-300">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <time dateTime={slide.updatedAt}>
                    {dateFormatter.format(new Date(slide.updatedAt))}
                  </time>
                </div>
                <Button
                  asChild
                  className="w-fit group text-xs sm:text-sm md:text-base px-3 py-1 sm:px-4 sm:py-2"
                >
                  <a href="#">
                    Ler mais
                    <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 10px !important;
          left: 50% !important;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.5);
          margin: 0 3px;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 8px;
          height: 8px;
          background: #6610f2;
        }

        @media (min-width: 640px) {
          .swiper-pagination {
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 4px;
          }

          .swiper-pagination-bullet-active {
            width: 10px;
            height: 10px;
          }
        }

        @media (min-width: 1024px) {
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 5px;
          }

          .swiper-pagination-bullet-active {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </div>
  )
}
