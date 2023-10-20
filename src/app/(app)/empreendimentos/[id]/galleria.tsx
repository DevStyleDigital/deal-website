'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Enterprise } from 'types/enterprise';

export const Galleria = ({ galleria }: { galleria: Enterprise['galleria'] }) => (
  <section className="py-16 space-y-4 relative" id="galeria">
    <div className="text-gold min-[1330px]:mb-10">
      <h1 className="text-2xl text-center">O Empreendimento</h1>
    </div>
    <div className="min-[1330px]:absolute min-[1330px]:top-1/2 min-[1330px]:-translate-y-1/2 w-full flex max-w-[86rem] justify-center min-[1330px]:justify-between min-[1330px]:left-[50.4%] min-[1330px]:-translate-x-1/2">
      <div
        className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        id="enterprises-carousel-prev"
        aria-hidden
      >
        <ChevronLeft className="text-gold min-[1330px]:h-14 h-10 w-auto" />
      </div>
      <div
        className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        id="enterprises-carousel-next"
        aria-hidden
      >
        <ChevronRight className="text-gold min-[1330px]:h-14 h-10 w-auto" />
      </div>
    </div>
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      modules={[Navigation, A11y]}
      navigation={{
        prevEl: '#enterprises-carousel-prev',
        nextEl: '#enterprises-carousel-next',
      }}
      breakpoints={{
        0: { centeredSlides: true, slidesPerView: 1 },
        1060: {
          slidesPerView: galleria.length > 1 ? 2 : galleria.length,
          centeredSlides: false,
        },
        1260: {
          slidesPerView: galleria.length > 2 ? 2.4 : galleria.length,
          centeredSlides: false,
        },
      }}
      className="cursor-grab active:cursor-grabbing max-w-[78rem] mx-auto px-4"
    >
      {galleria.map((image) => (
        <SwiperSlide key={image.id}>
          <Image
            src={image.url}
            alt={image.label}
            width={2860}
            height={1080}
            priority
            className="min-h-[280px] sm:min-w-[500px] max-h-[4000px] min-[1060px]:max-h-[280px] min-[1060px]:max-w-[500px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
