import { notFound } from 'next/navigation';
import { EnterpriseForm } from './enterprise-form';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from 'services/supabase';
import { getEnterpriseById } from 'utils/enterprises-func';

export const dynamicParams = false;

export async function generateStaticParams() {
  const enterprises = await supabase.from('enterprise').select('id');
  return [{ id: 'create' }, ...(enterprises.data || [])];
}

const Enterprise: BTypes.NPage<{ params: { id: string } }, true> = async ({ params }) => {
  let enterprise = undefined;

  if (params.id !== 'create') enterprise = await getEnterpriseById(params.id);
  if (params.id !== 'create' && !enterprise) return notFound();

  const states = await fetch('https://brasilapi.com.br/api/ibge/uf/v1')
    .then((res) => res.json())
    .then((res) =>
      res.map(({ id, sigla, nome }: any) => ({ id, short: sigla, name: nome })),
    );

  return (
    <>
      <section className="max-w-7xl mx-auto mt-8">
        <Link
          href="/admin/dash/enterprises"
          className="flex items-center hover:underline underline-offset-2"
        >
          <MoveLeft className="h-6 w-auto mr-4" />
          Voltar
        </Link>
      </section>

      <EnterpriseForm states={states} id={params.id} enterprise={enterprise as any} />
    </>
  );
};

export default Enterprise;
