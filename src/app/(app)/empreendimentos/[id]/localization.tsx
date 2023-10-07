import { Button } from 'components/ui/button';
import { MapPin } from 'lucide-react';

export const Localization = ({
  location_iframe,
  district_desc,
  address,
  city,
  state,
}: {
  location_iframe: string;
  district_desc: string;
  address: string;
  city: string;
  state: string;
}) => (
  <section className="py-16 pb-0 space-y-12" id="localizacao">
    <div className="w-full flex h-fit max-xl:flex-col relative">
      <div className="w-full max-xl:relative">
        <iframe
          src={location_iframe}
          className="border-none w-full h-[520px] aspect-video"
          allowFullScreen
        />
      </div>
      <div className="space-y-6 w-full h-[520px] justify-center flex-col flex sm:px-32 px-8 py-10 bg-gold">
        <h1 className="!text-blue">
          <span className="text-3xl block truncate">Localização</span>
          <span className="text-2xl block truncate">Sobre o bairro</span>
        </h1>
        <p>{district_desc}</p>
        <div className="flex items-center space-x-4 max-w-md !text-blue">
          <MapPin className="w-10 h-10" />
          <address className="not-italic">
            {address}, {city} / {state}
          </address>
        </div>

        <Button className="w-fit uppercase">Ver Mapa</Button>
      </div>
    </div>
  </section>
);
