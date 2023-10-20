import { WhatsApp } from 'assets/whatsapp';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export const TalkUs = () => (
  <section className="flex flex-col w-full items-center space-y-4 pb-16 px-2">
    <h2 className="uppercase text-2xl text-gold max-sm:text-center">
      PRECISA DE AJUDA? FALE CONOSCO
    </h2>
    <Button
      asChild
      className="text-2xl h-auto max-sm:text-lg w-fit flex items-center font-normal"
      variant="gold"
      size="lg"
    >
      <Link href="/" target="_blank">
        <WhatsApp className="w-6 h-6 fill-gold mr-4" aria-hidden />
        Fale no WhatsApp
      </Link>
    </Button>
  </section>
);
