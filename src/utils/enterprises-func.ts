import { SupabaseClient } from '@supabase/supabase-js';
import { type Enterprise, type EnterprisePartial } from 'types/enterprise';

export async function getEnterpriseById(
  id: string,
  supabase: SupabaseClient<any, 'public', any>,
): Promise<Enterprise> {
  return (
    await supabase
      .from('enterprises')
      .select(
        '*, galleria:galleria(*), differential:differential(*), additional:additional(*), plans:plans(*)',
      )
      .eq('id', id)
      .single()
  ).data;
}

export async function deleteEnterprise(
  id: string,
  supabase: SupabaseClient<any, 'public', any>,
) {
  await supabase.storage
    .emptyBucket(`enterprise-${id}`)
    .then((res) => (res.error ? true : false))
    .catch(() => true);
  await supabase.storage
    .deleteBucket(`enterprise-${id}`)
    .then((res) => (res.error ? true : false))
    .catch(() => true);
  await supabase
    .from('enterprises')
    .delete()
    .eq('id', id)
    .then((res) => (res.error ? true : false));
  return 'success';
}

function moveItemToFirst(array: any[], id: string) {
  const i = array.findIndex((enterprise) => enterprise.id === id);

  if (i >= array.length || i < 0) return array;

  const item = array.splice(i, 1)[0];
  array.unshift(item);

  return array;
}

export async function getPartialOfEnterprises(
  supabase: SupabaseClient<any, 'public', any>,
): Promise<EnterprisePartial[]> {
  return moveItemToFirst(
    (
      await supabase
        .from('enterprises')
        .select('id, state, city, banner_emphasis, name, type, desc, status')
    ).data || [],
    '93b252e8-fe0f-4a49-82f8-9a3bc3cc0b73',
  );
}
