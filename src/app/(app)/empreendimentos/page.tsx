import { EnterpriseCard } from 'components/enterprise-card';
import { getPartialOfEnterprises } from 'utils/enterprises-func';
import { Banner } from '../banner';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Enterprises = async () => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const enterprises = await getPartialOfEnterprises(supabase);

  return (
    <>
      <Banner banner="enterprises" />
      <section className="max-w-7xl mx-auto py-16 px-4">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 max-sm:flex max-sm:flex-col gap-8 w-full">
          {enterprises && enterprises.length
            ? enterprises.map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))
            : null}
        </ul>
      </section>
    </>
  );
};

export default Enterprises;
