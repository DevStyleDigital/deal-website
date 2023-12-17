import { getEnterpriseById } from 'utils/enterprises-func';
import { Banner } from './banner';
import { Galleria } from './galleria';
import { Localization } from './localization';
import { Video } from './video';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import { Plans } from './plans';
import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Enterprise: BTypes.NPage<{ params: { id: string } }, true> = async ({ params }) => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const enterprise = await getEnterpriseById(params.id, supabase);
  if (!enterprise) return notFound();

  return (
    <>
      <Banner alt={enterprise.banner?.label || ''} src={enterprise.banner?.url || ''}>
        {enterprise.status !== 'none' && (
          <span className="uppercase text-sm bg-white text-gold px-4 tracking-widest py-[2px] w-fit">
            {enterprise.status === 'new'
              ? 'Lançamento'
              : enterprise.status === 'close'
                ? '100% Vendido'
                : ''}
          </span>
        )}
        <div className="flex flex-col">
          <h1 className="text-5xl">{enterprise.name}</h1>
          <h2 className="text-4xl">{enterprise.type}</h2>
        </div>
        <p className="text-white">
          Apartamentos:{' '}
          {enterprise.additional
            .filter(({ banner_include }) => banner_include)
            .map(({ label, id }) => (
              <React.Fragment key={id}>
                {label}
                <br />
              </React.Fragment>
            ))}
        </p>
      </Banner>

      <section className="flex max-w-7xl mx-auto md:space-x-20 xl:space-x-32 px-8 pt-16 justify-between max-md:flex-col-reverse">
        {!!enterprise.banner_emphasis.url && (
          <Image
            alt={enterprise.banner_emphasis?.label || ''}
            src={enterprise.banner_emphasis.url}
            width={2860}
            height={1080}
            priority
            className="md:max-w-sm w-full h-96 max-md:mt-8 md:h-auto object-cover object-center"
          />
        )}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex flex-col text-gold">
              <h1 className="text-5xl">{enterprise.name}</h1>
              <h2 className="text-4xl">{enterprise.type}</h2>
            </div>
            {enterprise.status !== 'none' && (
              <span className="uppercase text-sm bg-gold text-white px-4 tracking-widest py-[2px] w-fit">
                {enterprise.status === 'new'
                  ? 'Lançamento'
                  : enterprise.status === 'close'
                    ? '100% Vendido'
                    : ''}
              </span>
            )}
          </div>
          <div className="flex w-fit max-lg:space-y-4 lg:space-x-4 max-lg:flex-col">
            <ul className="flex w-full flex-col space-y-5">
              {enterprise.additional.map(({ label, id, url }) => (
                <li key={id} className="flex items-center text-lg space-x-5">
                  {!!url && (
                    <Image
                      alt=""
                      src={url}
                      aria-hidden
                      width={100}
                      height={100}
                      className="w-6 h-6"
                    />
                  )}
                  <p>{label}</p>
                </li>
              ))}
            </ul>
            <p className="w-full">{enterprise.desc}</p>
          </div>
          <nav className="grid lg:grid-cols-2 w-full gap-x-12 gap-y-3 grid-cols-1">
            {enterprise.galleria?.length ? (
              <Button asChild className="!justify-start px-10" variant="gold">
                <Link href="#galeria">O Empreendimento</Link>
              </Button>
            ) : null}
            {enterprise.plans?.length ? (
              <Button asChild className="!justify-start px-10" variant="gold">
                <Link href="#plantas">Plantas</Link>
              </Button>
            ) : null}
            {enterprise.differential?.length ? (
              <Button asChild className="!justify-start px-10" variant="gold">
                <Link href="#diferenciais">Diferenciais</Link>
              </Button>
            ) : null}
            <Button asChild className="!justify-start px-10" variant="gold">
              <Link href="#localizacao">Localização</Link>
            </Button>
            <Button asChild className="!justify-start px-10" variant="gold">
              <Link href="#ficha">Ficha Técnica</Link>
            </Button>
            <Button asChild className="!justify-start px-10" variant="gold">
              <Link href="#video">Vídeo</Link>
            </Button>
          </nav>
        </div>
      </section>

      {enterprise.galleria?.length ? <Galleria galleria={enterprise.galleria} /> : null}

      {enterprise.plans?.length ? <Plans plans={enterprise.plans} /> : null}

      {enterprise.differential?.length ? (
        <section id="diferenciais" className="max-w-7xl mx-auto">
          <div className="text-gold mb-10">
            <h1 className="text-2xl text-center">Diferenciais</h1>
          </div>

          <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-10 justify-items-center">
            {enterprise.differential.map(({ label, id, url }) => (
              <li key={id} className="flex flex-col items-center w-[130px] space-y-5">
                {!!url && (
                  <Image
                    alt=""
                    src={url}
                    aria-hidden
                    width={100}
                    height={100}
                    className="w-16 h-16"
                  />
                )}
                <p className="text-center">{label}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Localization
        address={enterprise.address}
        city={enterprise.city}
        district_desc={enterprise.district_desc}
        location_iframe={enterprise.location_iframe}
        state={enterprise.state}
      />
      <section className="bg-blue py-16 pb-40 px-8 !mt-0" id="ficha">
        <div className="text-gold mb-10">
          <h1 className="text-2xl text-center">Ficha técnica</h1>
        </div>
        <ul className="flex flex-col items-center w-full max-xs:space-y-4">
          {enterprise.datasheet.map(({ id, label, value }) => (
            <li
              key={id}
              className="flex w-full max-xs:flex-col xs:space-x-2 max-xs:justify-center items-center [&_p]:!text-white"
            >
              <p className="xs:text-end xs:w-full text-center max-xs:opacity-60">
                {label}
              </p>
              <p className="xs:w-full max-xs:text-center">{value}</p>
            </li>
          ))}
        </ul>
      </section>
      <Video video={enterprise.video} />
    </>
  );
};

export default Enterprise;
