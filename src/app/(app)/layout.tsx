import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { CoreAg } from 'assets/core-ag';
import { Logo } from 'assets/logo';
import { WhatsApp } from 'assets/whatsapp';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from 'components/ui/dialog';
import { Instagram, Linkedin, MapPin, Menu, Phone, Youtube } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const AppLayout: BTypes.NLPage<{}, true> = async ({ children }) => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const enterprises = (await supabase.from('enterprises').select('id, name')).data || [];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50">
        <Dialog>
          <nav
            className="mx-auto flex max-w-7xl items-end justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Deal Empreendimentos</span>
                <Logo aria-hidden />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Abrir Menu</span>
                  <Menu className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </DialogTrigger>
            </div>
            <div className="flex space-x-4 pb-4 max-lg:hidden">
              <Link href="/sobre" className="uppercase text-white tracking-wider">
                Sobre nós
              </Link>
              <Link
                href="/empreendimentos"
                className="uppercase text-white tracking-wider"
              >
                Empreendimentos
              </Link>
              <Link
                href="/personalizacao"
                className="uppercase text-white tracking-wider"
              >
                Personalização
              </Link>
              <Link href="/contato" className="uppercase text-white tracking-wider">
                Contato
              </Link>
            </div>
          </nav>
          <DialogContent className="bg-white max-sm:top-0 max-sm:!translate-y-0 max-sm:max-w-full">
            <DialogHeader>
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Deal Empreendimentos</span>
                <Logo className="fill-black" />
              </Link>
            </DialogHeader>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <DialogTrigger asChild>
                    <Link
                      href="/sobre"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue hover:bg-gray-200 transition-colors"
                    >
                      Sobre nós
                    </Link>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Link
                      href="/empreendimentos"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue hover:bg-gray-200 transition-colors"
                    >
                      Empreendimentos
                    </Link>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Link
                      href="/personalizacao"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue hover:bg-gray-200 transition-colors"
                    >
                      Personalização
                    </Link>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Link
                      href="/contato"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue hover:bg-gray-200 transition-colors"
                    >
                      Contato
                    </Link>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <main>
        {children}
        <div className="fixed bottom-8 right-8 flex z-[100] rounded-full bg-green-600 hover:scale-105 transition-all">
          <a
            href={`https://wa.me/15998179909?text=${encodeURIComponent(
              'Olá vim do site!',
            )}`}
            className="p-4 w-fit"
            aria-label="WhatsApp"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsApp className="w-8 h-8 text-white" />
          </a>
        </div>
      </main>
      <footer className="bg-blue text-white py-8 [&_h3]:text-gold">
        <span className="w-full bg-gold h-px mt-2 mb-8 block" />
        <div className="max-w-7xl flex flex-wrap justify-between mx-auto px-8 gap-8">
          <div className="flex max-sm:justify-center max-sm:w-full">
            <span className="sr-only">Deal Empreendimentos</span>
            <Logo className="w-auto h-[6rem]" aria-hidden />
          </div>

          <div className="flex flex-col space-y-4 max-sm:items-center max-sm:w-full">
            <h3>Fale Conosco</h3>
            <div className="flex space-x-3">
              <MapPin aria-hidden />
              <address className="not-italic text-white">
                Rua Waldemar Rodrigues de Barros, <br /> 200 - Estância Conceição,
                Sorocaba/SP
              </address>
            </div>
            <div className="flex space-x-3">
              <Phone aria-hidden />
              <p className="text-white">(15) 3272-1467</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 max-xs:items-center max-xs:w-full">
            <h3>Empreendimentos</h3>
            <div>
              <ul>
                {enterprises.map(({ id, name }) => (
                  <li key={id}>
                    <Link href={`/empreendimentos/${id}`}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col space-y-4 max-xs:items-center max-xs:w-full">
            <h3>Siga-Nos</h3>
            <div className="flex flex-col justify-between h-full space-y-8">
              <ul className="flex space-x-3 max-xs:justify-center">
                <li>
                  <a
                    href="https://www.linkedin.com/company/95065216/admin/feed/posts/"
                    aria-label="Linkedin"
                    target="_blank"
                  >
                    <Linkedin />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dealempreendimentos?igshid=YzVkODRmOTdmMw=="
                    aria-label="Instagram"
                    target="_blank"
                  >
                    <Instagram />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@DealEmpreendimentos"
                    aria-label="Youtube"
                    target="_blank"
                  >
                    <Youtube />
                  </a>
                </li>
              </ul>
              <div>
                {/* <a href='https://coreag.com.br' className="sr-only cursor-pointer">
                  <span lang="en-us">Intelligence by</span> Core.Ag
                </a> */}
                <a href="https://coreag.com.br" target="_blank">
                  <CoreAg aria-hidden className="h-3 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppLayout;
