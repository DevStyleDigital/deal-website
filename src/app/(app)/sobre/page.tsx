import { type Metadata } from 'next';
import { Banner } from '../banner';
import { Timeline } from './timeline';

export const metadata: Metadata = {
  title: 'Deal | Sobre',
};

const About = () => {
  return (
    <>
      <Banner banner="about" />
      <section className="my-12 mx-auto max-w-7xl px-8">
        <div>
          <span className="text-xl mb-4">Nossa</span>
          <h1>História</h1>
        </div>
        <div className="mt-8 flex items-center lg:space-x-32 max-lg:flex-col">
          <p>
            Somos uma construtora comprometida com a arte de edificar sonhos e criar lares
            para toda a vida. Com uma sólida experiência no mercado, nossa trajetória é
            pautada pela excelência, inovação e compromisso em oferecer soluções que
            transcendam expectativas.
            <br />
            <br />
            Desde o momento em que o primeiro tijolo é colocado até a entrega das chaves,
            cada projeto é conduzido com meticulosa atenção aos detalhes e respeito ao
            meio ambiente. Buscamos incessantemente superar desafios e adotar tecnologias
            de ponta, para assegurar que nossas construções sejam não apenas seguras e
            duradouras, mas também eficientes e sustentáveis.
            <br />
            <br />
            Nossa equipe é formada por profissionais dedicados e apaixonados pelo que
            fazem. Engenheiros, arquitetos, planejadores e colaboradores trabalham em
            harmonia, trazendo à vida projetos arrojados e espaços funcionais, que
            refletem as necessidades e desejos de cada cliente.
            <br />
            <br />
            Nosso compromisso com Itapetininga e a região do sudoeste paulista não se
            encerra com a entrega do imóvel. Nossos clientes são nossa prioridade, e
            acreditamos na construção de relações sólidas e duradouras. Nossa equipe de
            atendimento está sempre pronta para oferecer suporte e assistência, garantindo
            uma experiência gratificante e tranquila.
            <br />
            <br />
            Ao longo dos 13 anos, nossa construtora em Itapetininga tem deixado sua marca.
            contribuindo para o crescimento urbano e para o enriquecimento da paisagem.
            Cada projeto é uma oportunidade para fazer a diferença e deixar um legado,
            proporcionando aos nossos clientes um lar onde possam viver momentos especiais
            e construir suas histórias.
            <br />
            <br />
            Nossa missão é construir mais do que prédios; é construir lares que acolhem e
            abrigam sonhos. Estamos honrados em fazer parte da jornada de cada cliente e
            estamos sempre empenhados em tornar realidade o lugar onde desejam viver, amar
            e prosperar. Bem-vindo(a) a Construtora Deal, onde a arte de construir
            encontra a paixão por realizar sonhos.
          </p>

          <ul className="flex lg:flex-col lg:space-y-8 max-lg:space-x-8 max-lg:mt-8">
            <li className="text-center p-6 border-gold border-[1px] w-[170px] flex flex-col items-center justify-center">
              <span className="text-7xl text-gold">13</span>
              <span>anos de experiência</span>
            </li>
            <li className="text-center p-6 border-gold border-[1px] w-[170px] flex flex-col items-center justify-center">
              <span className="text-7xl text-gold">150</span>
              <span>lares entregues</span>
            </li>
            <li className="text-center p-6 border-gold border-[1px] w-[170px] flex flex-col items-center justify-center">
              <span className="text-7xl text-gold">6</span>
              <span>epreendimentos entregues</span>
            </li>
          </ul>
        </div>
      </section>
      <Timeline />
    </>
  );
};

export default About;
