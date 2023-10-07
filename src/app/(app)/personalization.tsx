import { Button } from 'components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const Personalization = () => (
  <section className="bg-gold py-16 text-blue space-y-12">
    <div>
      <span className="text-xl uppercase block text-center">Muito mais que uma</span>
      <h1 className="text-center">Personalização</h1>
    </div>
    <div className="mx-auto max-w-7xl px-8 flex max-xl:flex-col p-4 relative">
      <span
        aria-hidden
        className="border-blue border-r-[1px] border-t-[1px] w-20 h-20 absolute top-0 right-4"
      />
      <div className="xl:max-w-xl xl:w-max w-full max-xl:relative">
        <Image
          alt=""
          src="/banners/personalization-2.webp"
          width={5760}
          height={3280}
          placeholder="blur"
          blurDataURL="../../../../public/banners/personalization-2.webp"
          className="w-full h-auto object-cover object-center"
        />
        <span
          aria-hidden
          className="border-blue border-l-[1px] border-b-[1px] w-20 h-20 absolute -left-4 -bottom-4 xl:left-4 xl:bottom-0"
        />
      </div>
      <div className="space-y-6 w-full max-xl:mt-8 xl:ml-16">
        <p>
          Acreditamos que cada lar deve ser único e refletir a personalidade de seus
          moradores. É por isso que criamos o Facilita, pensado exclusivamente para
          transformar suas ideias em realidade.
          <br />
          <br />
          Desde o início do processo, nossa equipe dedicada estará ao seu lado,
          guiando-o(a) em cada escolha, desde os materiais de alta qualidade até os
          detalhes finais que tornarão seu novo lar verdadeiramente único.
        </p>
        <p className="border-blue border-l-4 pl-8">
          Juntos, vamos construir um lugar onde você e sua família criarão memórias
          inesquecíveis. Venha conhecer o nosso Programa de Personalização e deixe-nos
          transformar sua visão em realidade.
        </p>
        <Button asChild className="w-fit uppercase">
          <Link href="/personalizacao">Saiba mais</Link>
        </Button>
      </div>
    </div>
  </section>
);
