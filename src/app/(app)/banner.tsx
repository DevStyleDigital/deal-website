import { Button } from 'components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

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
  about: {
    subtitle: 'Respeito & <br /> Transparência',
    smallTitle: 'em todos os projetos',
  },
  enterprises: {
    subtitle: 'Empreendimentos <br /> incomparáveis',
  },
  contact: { subtitle: 'Fale com a Deal' },
};

export const Banner = ({ banner }: { banner: keyof typeof banners }) => {
  const bannerSelected = banners[banner];

  return (
    <div className="relative h-[80vh] max-h-[920px] w-full">
      <Image
        alt=""
        src={`/banners/${banner}.webp`}
        width={1920}
        height={1080}
        priority
        className="h-full w-full object-cover object-center"
      />

      <div className="absolute w-full h-full max-w-7xl left-1/2 -translate-x-1/2 -top-20">
        <div
          className={`absolute flex flex-col space-y-4 top-1/2 mx-8 w-fit max-w-[460px] h-fit shadow-[0px_4px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl p-12 text-white 
            ${bannerSelected.invertAlign ? 'right-0' : ''}`}
        >
          {bannerSelected.desc && <span className="text-xl">{bannerSelected.desc}</span>}
          {bannerSelected.title && <h1>{bannerSelected.title}</h1>}
          {bannerSelected.subtitle && (
            <h2
              className="max-xs:break-all max-sm:text-2xl max-[350px]:text-base"
              dangerouslySetInnerHTML={{ __html: bannerSelected.subtitle }}
            />
          )}
          {bannerSelected.smallTitle && (
            <h3 className="text-4xl max-sm:text-3xl">{bannerSelected.smallTitle}</h3>
          )}
          {bannerSelected.link && (
            <Button asChild className="w-fit uppercase" variant="light">
              <Link href={bannerSelected.link.href}>{bannerSelected.link.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
