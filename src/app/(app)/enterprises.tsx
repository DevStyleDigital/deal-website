'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { type EnterprisePartial } from 'types/enterprise';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { EnterpriseCard } from 'components/enterprise-card';

export const Enterprise = ({ enterprises }: { enterprises: EnterprisePartial[] }) => (
  <section className="mb-16 relative">
    <div className="sm:absolute sm:top-1/2 sm:-translate-y-1/2 w-full flex max-w-[84rem] max-sm:mb-8 justify-center sm:justify-between sm:left-1/2 sm:-translate-x-1/2">
      <div
        className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        id="enterprises-carousel-prev"
        aria-hidden
      >
        <ChevronLeft className="text-gold h-14 w-14" />
      </div>
      <div
        className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        id="enterprises-carousel-next"
        aria-hidden
      >
        <ChevronRight className="text-gold h-14 w-14" />
      </div>
    </div>
    <Swiper
      slidesPerView={1}
      modules={[Navigation, A11y]}
      navigation={{
        prevEl: '#enterprises-carousel-prev',
        nextEl: '#enterprises-carousel-next',
      }}
      breakpoints={{
        620: { slidesPerView: enterprises.length > 2 ? 2 : enterprises.length },
        860: { slidesPerView: enterprises.length > 3 ? 3 : enterprises.length },
        1180: { slidesPerView: enterprises.length > 4 ? 4 : enterprises.length },
        1460: { slidesPerView: enterprises.length > 5 ? 5 : enterprises.length },
      }}
      className="cursor-grab active:cursor-grabbing max-w-7xl mx-auto px-4"
    >
      {enterprises.map((enterprise) => (
        <SwiperSlide key={enterprise.id}>
          <EnterpriseCard enterprise={enterprise} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
