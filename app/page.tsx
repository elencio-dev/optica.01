"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const slides = [
    {
      title: "Join us for the inaugural Global Photonics Economic Forum.",
      description:
        "This pivotal event will convene leaders from the photonics industry to engage in meaningful discussions, shaping the future of photonics.",
      event: "Global Photonics Economic Forum 2024",
      date: "01 - 02 October, 2024",
      location: "FYCMA, Palace of Congresses and Exhibitions Málaga, Spain",
      buttonText: "Register Now",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/05/02/20/47/czech-republic-750417_960_720.jpg",
    },
    {
      title: "Event Two Title",
      description: "Description of event two.",
      event: "Event Two",
      date: "10 November, 2024",
      location: "Some Location, City",
      buttonText: "Learn More",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/05/02/20/47/czech-republic-750417_960_720.jpg",
    },
  ];

  return (
    <div className="flex mx-auto justify-items-center min-h-screen ">
      <div className="w-full h-[500px] bg-gray-100 relative">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[500px]">
                {/* Imagem de fundo */}
                <div className="relative w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    quality={100}
                    style={{ objectFit: "cover" }}
                    className="brightness-75"
                  />
                </div>
                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32 text-white bg-black bg-opacity-50 w-1/2">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="mb-2">{slide.description}</p>
                  <p className="font-semibold mb-4">{slide.event}</p>
                  <p className="mb-4">{slide.date}</p>
                  <p className="mb-4">{slide.location}</p>
                  <a
                    href="#"
                    className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
