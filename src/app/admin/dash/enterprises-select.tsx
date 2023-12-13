/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Chevron } from 'assets/chevron';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from 'services/supabase';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type EnterprisePartial } from 'types/enterprise';
import { cn } from 'utils/cn';

function moveToFront<T>(arr: T[], index: number) {
  const element = arr.splice(index, 1)[0];
  arr.unshift(element);
  return arr;
}

export const EnterprisesSelect = ({
  defaultValue,
  enterprises,
}: {
  defaultValue: string;
  enterprises: EnterprisePartial[];
}) => {
  const [defaultEnterpriseSelected, setDefaultEnterpriseSelected] =
    useState(defaultValue);
  const [enterpriseSelected, setEnterpriseSelected] = useState<string | undefined>();

  const [savingIn, setSavingIn] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (savingIn !== 0 || !enterpriseSelected) return;
    clearInterval(intervalRef.current!);

    supabase
      .from('pages')
      .update({ enterprise_emphasis: enterpriseSelected })
      .eq('id', 'home')
      .then((res) => {
        if (res.error)
          return toast.error(
            'Ocorreu algum erro ao alterar o empreendimento destaque, tente novamente mais tarde.',
          );
        toast.success(
          'Empreendimento destaque alterado com sucesso! Você já pode sair da página.',
          { pauseOnHover: false },
        );
        return setDefaultEnterpriseSelected(enterpriseSelected!);
      });
  }, [savingIn]);

  useEffect(() => {
    if (!enterpriseSelected) return;
    if (enterpriseSelected === defaultEnterpriseSelected) {
      setSavingIn(-1);
      clearInterval(intervalRef.current!);
      return;
    }

    setSavingIn(10);
    intervalRef.current = setInterval(() => {
      setSavingIn((s) => (s > 0 ? s - 1 : s));
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [enterpriseSelected]);

  return (
    <div className="mt-16">
      <span
        role="status"
        className={cn('text-sm italic opacity-60 max-w-7xl mx-auto text-end block my-4', {
          invisible: savingIn <= 0,
        })}
      >
        Alterando destaque em {savingIn}s. Não saia da página antes do tempo acabar!
      </span>

      <Swiper
        slidesPerView={1}
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: '#enterprises-select-carousel-prev',
          nextEl: '#enterprises-select-carousel-next',
        }}
        breakpoints={{
          620: { slidesPerView: enterprises.length > 2 ? 2 : enterprises.length },
          860: { slidesPerView: enterprises.length > 3 ? 3 : enterprises.length },
          1180: { slidesPerView: enterprises.length > 4 ? 4 : enterprises.length },
          1460: { slidesPerView: enterprises.length > 5 ? 5 : enterprises.length },
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {moveToFront(
          enterprises,
          enterprises.findIndex(({ id }) => id === defaultEnterpriseSelected),
        ).map((enterprise) => (
          <SwiperSlide
            key={enterprise.id}
            role="button"
            className="flex !justify-between !items-center"
            onClick={() => setEnterpriseSelected(enterprise.id)}
          >
            <div
              className={cn(
                'flex mx-auto h-auto w-fit p-8 flex-col text-center space-y-8 items-center justify-center cursor-pointer relative',
                {
                  'bg-cyan-600/20': enterpriseSelected
                    ? enterpriseSelected === enterprise.id
                    : defaultEnterpriseSelected === enterprise.id,
                },
              )}
            >
              {(enterpriseSelected
                ? enterpriseSelected === enterprise.id
                : defaultEnterpriseSelected === enterprise.id) && (
                <span
                  aria-hidden
                  className="absolute top-2 right-2 block p-2 rounded-full bg-cyan-600/30"
                >
                  <Check className="w-4 h-4 text-cyan-600" />
                </span>
              )}

              <Image
                src={enterprise.banner_emphasis.url}
                alt={enterprise.banner_emphasis?.label || ''}
                aria-hidden
                width={1036}
                height={1284}
                className="w-64 h-80 object-cover object-center"
              />
              <p>{enterprise.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full max-w-7xl mx-auto space-x-4 justify-end mt-8">
        <div
          className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          id="enterprises-select-carousel-prev"
          aria-hidden
        >
          <Chevron className="text-gold rotate-180" />
        </div>
        <div
          className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          id="enterprises-select-carousel-next"
          aria-hidden
        >
          <Chevron className="text-gold" />
        </div>
      </div>
    </div>
  );
};
