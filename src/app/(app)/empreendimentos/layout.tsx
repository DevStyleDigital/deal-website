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
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute z-0 top-0 left-0 w-full h-full bg-gold" />
        <Image
          src="/banners/personalization-2.webp"
          alt=""
          className="object-[center_-35rem] absolute bottom-0 opacity-10 left-0 z-0 object-cover w-full min-w-[100rem] h-[16rem] min-h-[16rem] filter grayscale"
          width={2860}
          height={1080}
          priority
        />

        <div className="flex flex-col w-full items-center space-y-4 py-12 max-sm:text-center px-8 relative z-10">
          <h2 className="text-2xl text-blue">
            Quer deixar seu apartamento do seu jeito?
          </h2>
          <Button
            asChild
            className="text-2xl max-sm:text-lg w-fit h-auto flex items-center !font-medium"
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
