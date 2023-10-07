import { WhatsApp } from 'assets/whatsapp';
import { TalkUs } from 'components/talk-us';
import { Button } from 'components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const EnterprisesLayout: BTypes.NLPage = ({ children }) => {
  return (
    <>
      {children}
      <TalkUs />
      <section className="relative">
        <div aria-hidden className="absolute z-0 top-0 left-0 w-full h-full bg-gold" />
        <Image
          src="/banners/personalization-2.webp"
          alt=""
          className="object-[-4px_-500px] absolute top-0 opacity-10 left-0 z-0 object-cover w-full h-full filter grayscale"
          width={5760}
          height={3280}
          placeholder="blur"
          blurDataURL="/banners/personalization-2.webp"
        />

        <div className="flex flex-col w-full items-center space-y-4 py-12 relative z-10">
          <h2 className="text-2xl text-blue">
            Quer deixar seu apartamento do seu jeito?
          </h2>
          <Button
            asChild
            className="text-2xl w-fit flex items-center !font-medium"
            size="lg"
          >
            <Link href="/personalizacao" target="_blank">
              Personalize seu imóvel
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default EnterprisesLayout;
