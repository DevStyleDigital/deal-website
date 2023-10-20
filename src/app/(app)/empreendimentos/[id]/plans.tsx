'use client';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import Image from 'next/image';
import { useState } from 'react';
import { type Enterprise } from 'types/enterprise';
import { cn } from 'utils/cn';

export const Plans = ({ plans }: { plans: Enterprise['plans'] }) => {
  const [plan, setPlan] = useState(0);

  return (
    <section className="max-w-7xl mx-auto py-16 px-8">
      <div className="text-gold mb-10">
        <h1 className="text-2xl text-center">Diferenciais</h1>
      </div>

      <div className="flex max-xl:flex-col">
        <div className="xl:mr-16 xl:pr-16 max-xl:pb-8 max-xl:mb-8 w-full border-gold xl:border-r-2 max-xl:border-b-2">
          <ul className="w-full xl:flex xl:flex-col gap-4 grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1">
            {plans.map(({ id, label }, i) => (
              <li key={id} className="w-full">
                <Button
                  onClick={() => setPlan(i)}
                  variant="gold"
                  className={cn('truncate w-full !justify-start px-10', {
                    '!bg-gold !text-white': i === plan,
                  })}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Image
            alt={plans[plan].label}
            src={plans[plan].url}
            width={2860}
            height={1080}
            priority
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};
