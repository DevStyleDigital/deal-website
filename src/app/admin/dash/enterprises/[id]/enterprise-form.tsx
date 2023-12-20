'use client';
import { Button } from 'components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import * as z from 'zod';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { CardImageDropzone, type DropzoneFields } from 'components/card-dropzone';
import { Banner } from './banner';
import { EnterpriseInfo } from './enterprise-info';
import { EnterpriseLocation } from './enterprise-location';
import { EnterpriseDatasheet } from './enterprise-datasheet';
import { type Datasheet, type Enterprise } from 'types/enterprise';
import { cn } from 'utils/cn';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'components/ui/checkbox';
import { useAuth } from 'contexts/auth';
import { v4 as uuid } from 'uuid';
import { deleteEnterprise } from 'utils/enterprises-func';
import { toast } from 'react-toastify';

const FormSchema = z.object({
  name: z.string(),
  type: z.string(),
  desc: z.string(),
  status: z.string().default('new'),
  state: z.string(),
  city: z.string(),
  video: z
    .string()
    .transform((v) => v.replace(/.*src="(.[^"]*)".*/gm, '$1'))
    .refine((v) => z.string().url().safeParse(v).success, {
      message: 'Insira um iframe com uma URL válida',
    }),
  address: z.string(),
  location_iframe: z
    .string()
    .transform((v) => v.replace(/.*src="(.[^"]*)".*/gm, '$1'))
    .refine((v) => z.string().url().safeParse(v).success, {
      message: 'Insira um iframe com uma URL válida',
    }),
  district_desc: z.string(),
});

export type FormSchemaProps = z.infer<typeof FormSchema>;

export const EnterpriseForm = ({
  states,
  id,
  enterprise,
}: {
  states: any[];
  id: string;
  enterprise?: Enterprise;
}) => {
  const { supabase } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerEmphasis, setBannerEmphasis] = useState<File | null>(null);
  const [galleria, setGalleria] = useState<DropzoneFields[] | undefined>(
    enterprise?.galleria.map(({ url, ...item }) => ({ file: url, ...item })),
  );
  const [plans, setPlans] = useState<DropzoneFields[] | undefined>(
    enterprise?.plans.map(({ url, ...item }) => ({ file: url, ...item })),
  );
  const [differential, setDifferentials] = useState<DropzoneFields[] | undefined>(
    enterprise?.differential.map(({ url, ...item }) => ({ file: url, ...item })),
  );
  const [additionalInfo, setAdditionalInfo] = useState<
    (DropzoneFields & { banner_include: boolean })[] | undefined
  >(enterprise?.additional.map(({ url, ...item }) => ({ file: url, ...item })));
  const [datasheet, setDatasheet] = useState<Datasheet[]>(
    enterprise?.datasheet
      ? enterprise.datasheet
      : [{ id: Date.now().toString(), label: '', value: '', eid: '' }],
  );

  async function uploadFile(eid: string, file: File, name: string) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${name}.${fileExt}`;

    await supabase.storage.from(eid).upload(filePath, file);

    return supabase.storage.from(eid).getPublicUrl(filePath).data.publicUrl;
  }

  async function handleImages(images: DropzoneFields[], key: string) {
    const imagesUploaded = await Promise.all(
      (images || []).map(async ({ file, ...item }) =>
        typeof file !== 'string'
          ? {
              url: await uploadFile(`enterprise-${id}`, file, `${key}/${item.id}`),
              eid: id,
              ...item,
            }
          : { url: file, ...item },
      ),
    );
    const imagesIds = imagesUploaded.map((item) => item.id);
    if (enterprise?.[key as 'galleria']?.length)
      await supabase
        .from(key)
        .delete()
        .in(
          'id',
          enterprise[key as 'galleria']
            .map((item) => item.id)
            .filter((item_id) => !imagesIds.includes(item_id)),
        );
    await supabase.from(key).upsert(imagesUploaded);
  }

  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema as any),
    defaultValues: enterprise,
  });

  return (
    <Form {...form}>
      <span className="text-xl uppercase block text-center mt-8">
        {enterprise ? 'Atualizar' : 'Criar'}
      </span>

      <form
        onSubmit={form.handleSubmit(async (data) => {
          setLoading(true);
          const id = enterprise?.id || uuid();
          try {
            if (!enterprise)
              await supabase.storage.createBucket(`enterprise-${id}`, { public: true });

            await supabase.from('enterprises').upsert({
              ...data,
              id,
              datasheet,
              banner: banner
                ? {
                    url: await uploadFile(
                      `enterprise-${id}`,
                      banner,
                      Date.now().toString(),
                    ),
                    eid: id,
                    id: Date.now().toString(),
                    label: '',
                  }
                : undefined,
              banner_emphasis: bannerEmphasis
                ? {
                    url: await uploadFile(
                      `enterprise-${id}`,
                      bannerEmphasis,
                      Date.now().toString(),
                    ),
                    eid: id,
                    id: Date.now().toString(),
                    label: '',
                  }
                : undefined,
            });

            additionalInfo &&
              (await handleImages(additionalInfo as DropzoneFields[], 'additional'));
            differential &&
              (await handleImages(differential as DropzoneFields[], 'differential'));
            galleria && (await handleImages(galleria as DropzoneFields[], 'galleria'));
            plans && (await handleImages(plans as DropzoneFields[], 'plans'));

            setLoading(false);
            toast.success(
              `Empreendimento ${!enterprise ? 'cadastrado' : 'atualizado'} com sucesso!`,
            );
            router.refresh();
            router.push('/admin/dash/enterprises');
          } catch {
            toast.error(
              `Ocorreu um erro ao ${
                !enterprise ? 'cadastrar' : 'atualizar'
              } o empreendimento!`,
            );
            if (!enterprise) await deleteEnterprise(id, supabase);
          }
        })}
        className="space-y-6 pb-8 pt-2 flex flex-col w-full mx-auto max-w-7xl"
      >
        <div className="flex w-full space-x-4">
          <Banner
            disabled={loading}
            banner={banner || enterprise?.banner?.url || null}
            handleBanner={setBanner}
            id="banner"
            text="Banner da Página"
            desc='(1920x1080) A imagem selecionada será utilizada como banner da página "/empreendimentos/<id>"'
          />
          <Banner
            disabled={loading}
            banner={bannerEmphasis || enterprise?.banner_emphasis?.url || null}
            handleBanner={setBannerEmphasis}
            id="banner_emphasis"
            text="Banner Destaque"
            desc="(720x1080) A imagem selecionada será utilizada como banner para os cards do empreendimento no site"
          />
        </div>

        <div className="flex space-x-8">
          <div
            aria-hidden={loading}
            className={cn('w-full', {
              'pointer-events-none opacity-50': loading,
            })}
          >
            <EnterpriseInfo form={form} />
            <EnterpriseLocation form={form} states={states} />
            <EnterpriseDatasheet
              form={form}
              handleDatasheet={setDatasheet}
              datasheet={datasheet}
            />
          </div>
          <div
            aria-hidden={loading}
            className={cn('w-full h-fit mt-6 flex flex-col space-y-8', {
              'pointer-events-none opacity-50': loading,
            })}
          >
            <CardImageDropzone handleImages={setGalleria} images={galleria} id="galleria">
              Galeria DropZone
            </CardImageDropzone>
            <CardImageDropzone handleImages={setPlans} images={plans} id="plans">
              Plantas DropZone
            </CardImageDropzone>
            <CardImageDropzone
              handleImages={setAdditionalInfo}
              images={additionalInfo}
              id="additional"
              fileSizeType="Kb"
              accept=".svg"
              info="Envie apenas vetores (.svg)."
              renderForm={(image) => (
                <label
                  htmlFor={`${image.id}-checkbox`}
                  className="flex items-center py-2 space-x-4 cursor-pointer"
                >
                  <Checkbox
                    id={`${image.id}-checkbox`}
                    name="banner_include"
                    defaultChecked={image.banner_include}
                    onCheckedChange={(c) => {
                      image.banner_include = c === true ? true : false;
                    }}
                  />
                  <span className="italic opacity-60">Incluir informação ao banner</span>
                </label>
              )}
            >
              Informações com Icones DropZone
            </CardImageDropzone>
            <CardImageDropzone
              handleImages={setDifferentials}
              images={differential}
              id="differentials"
              accept=".svg"
              fileSizeType="Kb"
              info="Envie apenas vetores (.svg)."
            >
              Diferenciais DropZone
            </CardImageDropzone>
          </div>
        </div>
        <Button variant="fill" size="lg" className="text-xl uppercase" disabled={loading}>
          {enterprise ? (
            <>
              Editar Empreendimento <Pencil className="ml-4 h-6 w-6" />
            </>
          ) : (
            <>
              Criar Empreendimento <Plus className="ml-4 h-6 w-6" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
