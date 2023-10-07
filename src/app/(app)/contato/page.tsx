import { type Metadata } from 'next';
import { Banner } from '../banner';
import { SendEmailForm } from './send-email-form';
import { WhatsApp } from 'assets/whatsapp';
import { Button } from 'components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Deal | Contato',
};

const About = () => {
  return (
    <>
      <Banner banner="contact" />
      <section className="flex mx-auto max-w-7xl space-x-16 py-16">
        <SendEmailForm />
        <div className="flex flex-col space-y-8 mt-8">
          <h2 className="text-gold uppercase text-4xl">
            Precisa de ajuda? <br /> Fale conosco
          </h2>
          <Button
            asChild
            className="text-2xl w-fit flex items-center"
            variant="gold"
            size="lg"
          >
            <Link href="/" target="_blank">
              <WhatsApp className="w-6 h-6 fill-gold mr-4" aria-hidden />
              Fale no WhatsApp
            </Link>
          </Button>
          <div className="flex flex-col space-y-4 max-sm:items-center max-sm:w-full">
            <div className="flex space-x-3">
              <MapPin aria-hidden className="text-blue" />
              <address className="not-italic">
                Av. Ademar de Barros, 195 <br /> Vila Trujillo, Sorocaba/SP
              </address>
            </div>
            <div className="flex space-x-3">
              <Phone aria-hidden className="text-blue" />
              <p>(15) 99817-9909 • (15) 3318-1531</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
