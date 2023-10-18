import { Button } from 'components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const banners: Record<
  'home' | 'personalization' | 'about' | 'enterprises' | 'contact',
  {
    subtitle?: string;
    title?: string;
    desc?: string;
    smallTitle?: string;
    invertAlign?: boolean;
    link?: { label: string; href: string };
  }
> = {
  home: {
    title: 'Nova História',
    desc: 'A cada projeto, a construção de uma',
    invertAlign: true,
    link: { label: 'saiba mais', href: '/sobre' },
  },
  personalization: { subtitle: 'Personalização', desc: 'Muito mais que uma' },
  about: { subtitle: 'Respeito & Transparência', smallTitle: 'em todos os projetos' },
  enterprises: { subtitle: 'Empreendimentos incomparáveis' },
  contact: { subtitle: 'Fale com a Deal' },
};

export const Banner = ({
  children,
  src,
  alt,
}: {
  children: React.ReactNode;
  src: string;
  alt: string;
}) => {
  return (
    <div className="relative h-[calc(720px-10rem)]">
      <Image
        alt={alt}
        src={src}
        width={5760}
        height={3280}
        className="h-full object-cover object-center"
      />

      <div className="absolute w-full h-full max-w-7xl left-1/2 -translate-x-1/2 top-0">
        <div className="absolute flex flex-col space-y-2 top-1/2 mx-8 w-fit max-w-[460px] h-fit shadow-[0px_4px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl p-12 text-white">
          {children}
          <Button asChild className="w-fit uppercase" variant="light">
            <Link href="/contato">Entre agora em contato</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
