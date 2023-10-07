'use client';
import { Chevron } from 'assets/chevron';
import { Logo } from 'assets/logo';
import Image from 'next/image';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from 'utils/cn';

const PROJECTS = [
  {
    name: 'Edifício Labrunetti',
    year: 2013,
    id: 'labrunetti',
  },
  {
    name: 'Edifício Wilma',
    year: 2015,
    id: 'wilma',
  },
  {
    name: 'Residencial Martins de Lara',
    year: 2016,
    id: 'martins-de-lara',
  },
  {
    name: 'OpenView Residencial',
    year: 2019,
    id: 'residencial',
  },
  {
    name: 'Vivenda 350',
    year: 2020,
    id: 'vivenda',
  },
];

export const Timeline = () => {
  return (
    <div className="mb-16">
      <Swiper
        slidesPerView={1}
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: '#timeline-carousel-prev',
          nextEl: '#timeline-carousel-next',
        }}
        breakpoints={{
          620: { slidesPerView: 2 },
          860: { slidesPerView: 3 },
          1180: { slidesPerView: 4 },
          1460: { slidesPerView: 5 },
        }}
        className="lg:!pl-[calc((100vw-1280px)-((100vw-1280px)/2))] cursor-grab active:cursor-grabbing"
      >
        <SwiperSlide className="!flex !h-max pb-10 flex-col space-y-8 items-center justify-center">
          <div className="relative flex flex-col w-full items-center">
            <p className="text-4xl mb-8">
              <time>Fundação</time>
            </p>
            <span className="block w-1/2 self-end h-px bg-gold" />
            <span className="absolute left-1/2 top-full -translate-y-1/2 w-4 h-4 rounded-full bg-gold" />
          </div>
          <div className="w-64 h-80 border-gold border-2 flex items-center justify-center">
            <Logo aria-hidden className="fill-gold" />
            <span className="sr-only">Deal empreendimentos</span>
          </div>
        </SwiperSlide>
        {PROJECTS.map((project, i) => (
          <SwiperSlide
            key={project.id}
            className="flex h-auto pb-10 flex-col text-center space-y-8 items-center justify-center"
          >
            <div className="relative flex flex-col w-full items-center">
              <p className="text-4xl mb-8">
                <time>{project.year}</time>
              </p>
              <span
                className={cn('block w-full h-px bg-gold', {
                  '!w-1/2 self-start': PROJECTS.length === i + 1,
                })}
              />
              <span className="absolute left-1/2 top-full -translate-y-1/2 w-px h-9 bg-gold" />
            </div>
            <Image
              src={`/timeline/${project.id}.webp`}
              alt=""
              aria-hidden
              width={1036}
              height={1284}
              className="w-64 h-80 object-cover object-center border-gold border-2"
            />
            <p>{project.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full max-w-7xl mx-auto space-x-4 justify-end mt-8">
        <div
          className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          id="timeline-carousel-prev"
          aria-hidden
        >
          <Chevron className="text-gold rotate-180" />
        </div>
        <div
          className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          id="timeline-carousel-next"
          aria-hidden
        >
          <Chevron className="text-gold" />
        </div>
      </div>
    </div>
  );
};
