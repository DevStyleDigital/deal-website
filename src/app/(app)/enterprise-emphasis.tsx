import { Button } from 'components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type EnterprisePartial } from 'types/enterprise';

export const EnterpriseEmphasis = ({
  enterpriseEmphasis,
}: {
  enterpriseEmphasis: EnterprisePartial;
}) => (
  <section className="py-16 space-y-12">
    <div className="text-gold">
      <span className="text-xl uppercase block text-center">
        Experimente viver algo além do
      </span>
      <h1 className="text-center">Inimaginável</h1>
    </div>
    <div className="mx-auto max-w-7xl px-8 flex max-lg:flex-col p-4 relative">
      <span
        aria-hidden
        className="border-gold border-r-[1px] border-t-[1px] w-20 h-20 absolute top-0 right-4"
      />
      <div className="w-full max-xl:relative">
        {!!enterpriseEmphasis.banner_emphasis.url && (
          <Image
            alt={enterpriseEmphasis.banner_emphasis?.label || ''}
            src={enterpriseEmphasis.banner_emphasis.url}
            width={2860}
            height={1080}
            priority
            className="w-full lg:h-full h-[300px] object-cover object-center"
          />
        )}
        <span
          aria-hidden
          className="border-gold border-l-[1px] border-b-[1px] w-20 h-20 absolute -left-4 -bottom-4 xl:left-4 xl:bottom-0"
        />
      </div>
      <div className="space-y-6 w-full p-8 py-10 xl:max-w-sm max-lg:mt-8 bg-blue !text-white [&_p]:!text-white">
        <h1 className="border-gold text-gold border-l-[1px] pl-4">
          <span className="text-3xl block truncate xl:max-w-xs">
            {enterpriseEmphasis.name}
          </span>
          <span className="text-2xl block truncate xl:max-w-xs">
            {enterpriseEmphasis.type}
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          <MapPin />
          <p>
            {enterpriseEmphasis.city} / {enterpriseEmphasis.state}
          </p>
        </div>
        <p>{enterpriseEmphasis.desc}</p>

        <Button asChild className="w-fit uppercase" variant="light">
          <Link href={`/empreendimentos/${enterpriseEmphasis.id}`}>Saiba mais</Link>
        </Button>
      </div>
    </div>
  </section>
);
