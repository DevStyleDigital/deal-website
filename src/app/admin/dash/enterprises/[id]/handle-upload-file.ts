import { type DropzoneFields } from 'components/card-dropzone';
import { supabase } from 'services/supabase';

export async function uploadFile(
  eid: string,
  folder: string | null,
  { file, ...item }: DropzoneFields,
  defaultUrl?: string,
) {
  const nameDotSplit = (file as File).name.split('.');
  const extension = nameDotSplit[nameDotSplit.length - 1];

  if (defaultUrl) {
    await supabase.storage.from(`enterprises/${eid}`).remove([defaultUrl]);
  }
  const hasError = await supabase.storage
    .from(`enterprise-${eid}`)
    .upload(`${folder ? `${folder}/` : ''}${item.id}.${extension}`, file)
    .then(() => false)
    .catch(() => true);

  if (hasError) throw 'err';

  return {
    url: supabase.storage
      .from(`enterprise-${eid}`)
      .getPublicUrl(`${folder ? `${folder}/` : ''}${item.id}.${extension}`).data
      .publicUrl,
    ...item,
  };
}

export async function handleUploadBanner(
  eid: string,
  file: File,
  id: string,
  label: string,
  defaultUrl?: string,
) {
  return {
    ...(await uploadFile(`${eid}`, null, { file, id, label }, defaultUrl)
      .then((res) => ({ error: undefined, ...res }))
      .catch(() => ({ error: 'err' }))),
    eid,
  };
}
