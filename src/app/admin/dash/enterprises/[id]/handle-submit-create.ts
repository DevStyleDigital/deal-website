import { type Datasheet, type Enterprise } from 'types/enterprise';
import { type DropzoneFields } from 'components/card-dropzone';
import { type FormSchemaProps } from './enterprise-form';
import { v4 as uuid } from 'uuid';
import { handleUploadBanner, uploadFile } from './handle-upload-file';
import { supabase } from 'services/supabase';
import { toast } from 'react-toastify';
import { uploadFiles } from './upload-files';
import { deleteEnterprise } from 'utils/enterprises-func';

export async function onSubmitCreate(
  data: FormSchemaProps,
  fields: {
    datasheet: Datasheet[] | undefined;
    banner: File | null;
    bannerEmphasis: File | null;
    galleria: DropzoneFields[] | undefined;
    plans: DropzoneFields[] | undefined;
    differential: DropzoneFields[] | undefined;
    additionalInfo: DropzoneFields[] | undefined;
  },
) {
  const id = uuid();
  await supabase.storage.createBucket(`enterprise-${id}`, { public: true });
  try {
    const values = { ...data, id };

    const banner = await handleUploadBanner(id, fields.banner!, 'banner', 'Banner');

    if (banner?.error) throw 'err';

    const banner_emphasis = await handleUploadBanner(
      id,
      fields.bannerEmphasis!,
      'banner_emphasis',
      'Banner Destaque',
    );

    if (banner_emphasis?.error) throw 'err';

    const hasError = await supabase
      .from('enterprise')
      .upsert({ ...values, banner, banner_emphasis })
      .then((res) => {
        if (res.error) return true;
        return false;
      });

    if (hasError) throw 'err';

    await uploadFiles(id, 'galleria', fields.galleria);
    await uploadFiles(id, 'plans', fields.plans);
    await uploadFiles(id, 'differential', fields.differential);
    await uploadFiles(id, 'additional', fields.additionalInfo);

    const hasDatasheetError = await supabase
      .from('datasheet')
      .upsert((fields.datasheet || []).map((item) => ({ ...item, eid: id })))
      .then((res) => {
        if (res.error) return true;
        return false;
      });

    if (hasDatasheetError) throw 'err';

    toast.success('Empreendimento criado com sucesso!', {
      pauseOnHover: false,
    });
    return true;
  } catch {
    await deleteEnterprise(id);

    toast.error(
      'Ocorreu algum erro ao criar seu empreendimento. Tente novamente mais tarde.',
    );
    throw false;
  }
}
