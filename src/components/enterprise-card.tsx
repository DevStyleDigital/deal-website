import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type EnterprisePartial } from 'types/enterprise';
import { cn } from 'utils/cn';

export const EnterpriseCard = ({
  enterprise,
  href,
  className,
}: {
  enterprise: EnterprisePartial;
  href?: string;
  className?: string;
}) => (
  <Link
    href={href || `/empreendimentos/${enterprise.id}`}
    className="group flex justify-center w-full"
  >
    <div
      className={cn(
        'relative max-w-sm max-h-[680px] w-max h-max overflow-hidden',
        className,
      )}
    >
      <Image
        src={enterprise.banner_emphasis.url}
        alt={enterprise.banner_emphasis.label}
        aria-hidden
        width={1036}
        height={1284}
        className="w-full h-[680px] object-cover object-center group-hover:scale-110 transition-all"
      />
      <div className="absolute bg-gradient-to-t h-1/2 from-blue from-15% z-10 bottom-0 left-0 w-full p-8 flex flex-col justify-end">
        <h1 className="text-3xl text-white">
          <span className="block truncate">{enterprise.name}</span>
          <span className="block truncate">{enterprise.type}</span>
        </h1>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center text-lg space-x-2 [&_*]:!text-white">
            <MapPin />
            <p>
              {enterprise.city} / {enterprise.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
