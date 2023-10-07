import { type Datasheet, type Enterprise } from 'types/enterprise';
import { type DropzoneFields } from 'components/card-dropzone';
import { type FormSchemaProps } from './enterprise-form';
import { handleUploadBanner, uploadFile } from './handle-upload-file';
import { supabase } from 'services/supabase';
import { toast } from 'react-toastify';
import { uploadFiles } from './upload-files';

export async function onSubmitEdit(
  data: FormSchemaProps,
  fields: {
    enterprise: Enterprise | undefined;
    datasheet: Datasheet[] | undefined;
    banner: File | null;
    bannerEmphasis: File | null;
    galleria: DropzoneFields[] | undefined;
    plans: DropzoneFields[] | undefined;
    differential: DropzoneFields[] | undefined;
    additionalInfo: DropzoneFields[] | undefined;
  },
) {
  if (!fields.enterprise) return;
  const id = fields.enterprise.id;

  try {
    const values = {
      ...Object.entries(data)
        .filter(([k, v]) => fields.enterprise?.[k as keyof Enterprise] !== v)
        .reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}),
    };
    const defaultValues = {
      datasheet: fields.enterprise.datasheet,
      galleria: fields.enterprise.galleria.map(({ id, url, ...rest }) => {
        const urlSplitted = url.split('.');
        return { id, extension: urlSplitted[urlSplitted.length - 1], ...rest };
      }),
      plans: fields.enterprise.plans.map(({ id, url, ...rest }) => {
        const urlSplitted = url.split('.');
        return { id, extension: urlSplitted[urlSplitted.length - 1], ...rest };
      }),
      differential: fields.enterprise.differential.map(({ id, url, ...rest }) => {
        const urlSplitted = url.split('.');
        return { id, extension: urlSplitted[urlSplitted.length - 1], ...rest };
      }),
      additionalInfo: fields.enterprise.additional.map(({ id, url, ...rest }) => {
        const urlSplitted = url.split('.');
        return { id, extension: urlSplitted[urlSplitted.length - 1], ...rest };
      }),
    };

    const banner = fields.banner
      ? await handleUploadBanner(
          id,
          fields.banner,
          'banner',
          'Banner',
          fields.enterprise.banner.url,
        )
      : undefined;

    if (banner?.error) throw 'err';
    const bannerEmphasisUrlSplitted = fields.enterprise.banner_emphasis?.url.split('.');

    const banner_emphasis = fields.bannerEmphasis
      ? await handleUploadBanner(
          id,
          fields.bannerEmphasis,
          'banner_emphasis',
          'Banner Destaque',
          bannerEmphasisUrlSplitted &&
            `${fields.enterprise.banner_emphasis.id}/${
              bannerEmphasisUrlSplitted[bannerEmphasisUrlSplitted.length - 1]
            }`,
        )
      : undefined;

    if (banner_emphasis?.error) throw 'err';

    await uploadFiles(id, 'galleria', fields.galleria, defaultValues.galleria);
    await uploadFiles(id, 'plans', fields.plans, defaultValues.plans);
    await uploadFiles(
      id,
      'differential',
      fields.differential,
      defaultValues.differential,
    );
    await uploadFiles(
      id,
      'additional',
      fields.additionalInfo,
      defaultValues.additionalInfo,
    );

    const [datasheet, datasheetRemoved] = (fields.datasheet || []).reduce(
      (acc, item) => {
        const defaultDataIds = defaultValues.datasheet.map(({ id }) => id);
        const defaultData = defaultValues.datasheet.find(({ id }) => item.id === id);
        const dataModified = Object.entries(item)
          .filter(([k, v]) =>
            k === 'eid' || k === 'id'
              ? false
              : k === 'id'
              ? true
              : defaultData?.[k as keyof typeof defaultData] !== v,
          )
          .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) as Record<string, string>;

        if (defaultDataIds.includes(item.id) && Object.keys(dataModified).length)
          acc[0].push({ ...dataModified, id: item.id } as Datasheet);
        if (!defaultDataIds.includes(item.id)) acc[0].push(item);

        const datasheetIds = fields.datasheet?.map(({ id }) => id) || [];
        const removedItems = defaultDataIds.filter((id) => !datasheetIds.includes(id));
        acc[1] = removedItems;
        return acc;
      },
      [[], []] as [Datasheet[], string[]],
    );

    const hasDatasheetRemovedError = await supabase
      .from('datasheet')
      .delete()
      .in('id', datasheetRemoved)
      .then((res) => {
        if (res.error) return true;
        return false;
      });

    if (hasDatasheetRemovedError) throw 'err';

    const hasDatasheetError = await supabase
      .from('datasheet')
      .upsert(datasheet)
      .then((res) => {
        if (res.error) return true;
        return false;
      });

    if (hasDatasheetError) throw 'err';

    const hasError = await supabase
      .from('enterprise')
      .update({ ...values, banner, banner_emphasis })
      .eq('id', id)
      .then((res) => {
        if (res.error) return true;
        return false;
      });

    if (hasError) throw 'err';

    toast.success('Empreendimento atualizado com sucesso!', {
      pauseOnHover: false,
    });

    return true;
  } catch (err) {
    toast.error(
      'Ocorreu algum erro ao atualizar o empreendimento, talvez algumas informações não foram atualizadas corretamente. Tente novamente mais tarde.',
    );

    throw false;
  }
}
