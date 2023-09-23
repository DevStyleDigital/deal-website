import { type Metadata } from 'next';
import { Banner } from '../banner';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Deal | Sobre',
};

const Personalization = () => {
  return (
    <>
      <Banner banner="personalization" />
      <section className="bg-gold py-16">
        <div className="mx-auto max-w-7xl px-8 flex lg:space-x-28 max-lg:flex-col space-y-8">
          <div className="w-full">
            <p>
              Um dos maiores diferenciais da Construtora Deal é a combinação de alta
              tecnologia de suas obras aos acabamentos artesanalmente produzidos em seu
              Centro de Produção. Dentro de uma estrutura de arquitetos e engenheiros o
              seu projeto ganha forma. No Centro de Produção da Construtora Deal são
              produzidos todos os preciosos detalhes dos empreendimentos.
              <br />
              <br />
              Um conceito único que agrega o talento de uma equipe multiciplinar formada
              por artesãos, arquitetos, engenheiros e designers resultando em peças e
              acabamentos exclusivos, desenvolvidos especialmente para cada novo edifício.
              <br />
              <br />A preocupação com o cliente Deal vai além da assinatura do contrato.
              Nossa construtora em Itapetininga traz conceitos elevados de apartamentos
              que conquistam a moradorados mais exigentes É essa a diretriz do setor de
              relacionamento e encantamento do Cliente Deal.
            </p>
          </div>
          <div className="space-y-8 w-full">
            <p className="border-blue border-l-4 pl-8">
              Juntos, vamos construir um lugar onde você e sua família criarão memórias
              inesquecíveis. Venha conhecer o nosso Programa de Personalização e deixe-nos
              transformar sua visão em realidade.
            </p>
            <Button asChild className="w-fit uppercase">
              <Link href="/contato">ENTRE EM CONTATO</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Personalization;
