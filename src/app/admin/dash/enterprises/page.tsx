import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { PlusCircle } from 'lucide-react';
import { EnterpriseCard } from './enterprise-card';
import Link from 'next/link';
import { getPartialOfEnterprises } from 'utils/enterprises-func';

const Enterprises: BTypes.NPage<{}, true> = async () => {
  const enterprises = await getPartialOfEnterprises();

  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="col-span-3 lg:col-span-4">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="h-full space-y-6">
              <div className="w-full flex justify-end">
                <Button variant="gold" asChild>
                  <Link href="/admin/dash/enterprises/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo empreendimento
                  </Link>
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="relative w-full">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 justify-center mx-auto">
                  {enterprises.map((enterprise) => (
                    <EnterpriseCard
                      key={enterprise.id}
                      enterprise={enterprise}
                      aspectRatio="portrait"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Enterprises;
