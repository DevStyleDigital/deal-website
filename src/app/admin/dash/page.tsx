import { getPartialOfEnterprises } from 'utils/enterprises-func';
import { EnterprisesSelect } from './enterprises-select';
import { supabase } from 'services/supabase';
import { Differentials } from './differentials';

const dynamic = 'force-dynamic';

const Dash: BTypes.NPage<{}, true> = async () => {
  const enterprises = await getPartialOfEnterprises();
  const differentials = await supabase
    .from('section_differentials')
    .select('*')
    .then(({ data, error }) => (data ? data : undefined));
  const defaultEnterpriseSelected = await supabase
    .from('pages')
    .select('id, enterprise_emphasis')
    .eq('id', 'home')
    .then((res) => (res.data ? res.data[0]?.enterprise_emphasis : undefined));

  return (
    <>
      <section className="py-16">
        <div>
          <span className="text-xl uppercase block text-center">Selecionar</span>
          <h1 className="text-center">Empreendimento Destaque</h1>
        </div>
        <span className="text-sm italic opacity-60 block text-center">
          O empreendimento selecionado irá aparecer na página principal na seção
          {' "INIMAGINÁVEL"'}.
        </span>

        {enterprises?.length ? (
          <EnterprisesSelect
            enterprises={enterprises}
            defaultValue={defaultEnterpriseSelected}
          />
        ) : null}
      </section>
      <section className="mx-auto max-w-7xl py-16 px-8">
        <div>
          <span className="text-xl uppercase block text-center">Editar</span>
          <h1 className="text-center">Deferenciais</h1>
        </div>
        <span className="text-sm italic opacity-60 block text-center">
          Os diferenciais colocados irão aparecer na página
          {' "/personalizacao"'}.
        </span>

        <Differentials differentials={differentials} />
      </section>
    </>
  );
};

export default Dash;
