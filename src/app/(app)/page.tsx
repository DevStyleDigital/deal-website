import { type Metadata } from 'next';
import { Banner } from './banner';
import { getPartialOfEnterprises } from 'utils/enterprises-func';
import { supabase } from 'services/supabase';
import { EnterpriseEmphasis } from './enterprise-emphasis';
import { Personalization } from './personalization';
import { Enterprise } from './enterprises';

export const metadata: Metadata = {
  title: 'Deal | Início',
};

const Home = async () => {
  const enterprises = await getPartialOfEnterprises();
  const home = await supabase
    .from('pages')
    .select('id, enterprise_emphasis')
    .eq('id', 'home')
    .then(({ data }) => (data ? data[0] : undefined));

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
