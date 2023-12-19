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
      <section className="flex justify-center max-xl:items-center px-8 max-sm:!px-2 max-w-7xl max-xl:space-y-16 xl:space-x-16 py-16 max-xl:flex-col-reverse">
        <SendEmailForm />
        <div className="flex flex-col max-xl:text-center max-xl:items-center space-y-8 mt-8">
          <h2 className="text-gold uppercase text-4xl">
            Precisa de ajuda? <br /> Fale conosco
          </h2>
          <Button
            asChild
            className="text-2xl h-auto max-sm:text-lg w-fit flex items-center"
            variant="gold"
            size="lg"
          >
          <a
            href={`https://wa.me/15998179909?text=${encodeURIComponent(
              'Olá vim do site!',
            )}`} target="_blank">
              <WhatsApp className="w-6 h-6 fill-gold mr-4" aria-hidden />
              Fale no WhatsApp
          </a>
          </Button>
          <div className="flex xl:flex-col max-550px:flex-col max-550px:items-center max-xl:space-x-4 max-xl:justify-between xl:space-y-4 max-sm:w-full">
            <div className="flex space-x-3">
              <MapPin aria-hidden className="text-blue" />
              <address className="not-italic">
                Rua Waldemar Rodrigues de Barros, <br /> 200 - Estância Conceição,
                Sorocaba/SP
              </address>
            </div>
            <div className="flex space-x-3">
              <Phone aria-hidden className="text-blue" />
              <p>(15) 3272-1467</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
