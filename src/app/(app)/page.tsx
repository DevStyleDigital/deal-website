import { type Metadata } from 'next';
import { Banner } from './banner';
import { getPartialOfEnterprises } from 'utils/enterprises-func';
import { EnterpriseEmphasis } from './enterprise-emphasis';
import { Personalization } from './personalization';
import { Enterprise } from './enterprises';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Deal | Início',
};

const Home = async () => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const enterprises = await getPartialOfEnterprises(supabase);
  const home = await supabase
    .from('pages')
    .select('id, enterprise_emphasis')
    .eq('id', 'home')
    .single()
    .then(({ data }) => (data ? data : undefined));

  const enterprise_emphasis = enterprises.find(
    ({ id }) => id === home?.enterprise_emphasis,
  );

  return (
    <>
      <Banner banner="home" />
      {enterprise_emphasis && (
        <EnterpriseEmphasis enterpriseEmphasis={enterprise_emphasis} />
      )}
      <Enterprise enterprises={enterprises} />
      <Personalization />
    </>
  );
};

export default Home;
