import { EnterpriseCard } from 'components/enterprise-card';
import { getPartialOfEnterprises } from 'utils/enterprises-func';
import { Banner } from '../banner';

const Enterprises = async () => {
  const enterprises = await getPartialOfEnterprises();

  return (
    <>
      <Banner banner="enterprises" />
      <section className="max-w-7xl mx-auto py-16 px-4">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full">
          {enterprises.map((enterprise) => (
            <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Enterprises;
