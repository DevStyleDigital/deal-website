import { supabase } from 'services/supabase';
import { type Enterprise, type EnterprisePartial } from 'types/enterprise';

export async function getEnterpriseById(id: string): Promise<Enterprise> {
  return (
    await supabase
      .from('enterprise')
      .select(
        '*, galleria:galleria(*), differential:differential(*), additional:additional(*), datasheet:datasheet(*), plans:plans(*)',
      )
      .eq('id', id)
  ).data?.[0];
}

export async function deleteEnterprise(id: string) {
  let error = false;
  error = await supabase.storage
    .emptyBucket(`enterprise-${id}`)
    .then((res) => (res.error ? true : false))
    .catch(() => true);
  if (error) throw 'err';
  error = await supabase.storage
    .deleteBucket(`enterprise-${id}`)
    .then((res) => (res.error ? true : false))
    .catch(() => true);
  if (error) throw 'err';
  error = await supabase
    .from('enterprise')
    .delete()
    .eq('id', id)
    .then((res) => (res.error ? true : false));
  if (error) throw 'err';
  return 'success';
}

export async function getPartialOfEnterprises(): Promise<EnterprisePartial[]> {
  return (
    (
      await supabase
        .from('enterprise')
        .select('id, state, city, banner_emphasis, name, type, desc, status')
    ).data || []
  );
}
