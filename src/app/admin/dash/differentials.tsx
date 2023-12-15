'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';
import { PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { handleDeleteItem } from 'utils/handle-delete-item';
import { v4 as uuid } from 'uuid';

export const Differentials = ({
  differentials: differentialsDb,
}: {
  differentials?: { id: string; desc: string }[];
}) => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [differentials, setDifferentials] = useState<{ id: string; desc: string }[]>(
    differentialsDb && differentialsDb.length
      ? differentialsDb
      : [{ id: uuid(), desc: '' }],
  );
  return (
    <form
      className="flex flex-col"
      onSubmit={async (ev) => {
        ev.preventDefault();
        try {
          setLoading(true);
          const differentialsRemove = differentials.reduce((acc, item) => {
            const defaultDataIds = differentialsDb?.map(({ id }) => id) || [];
            defaultDataIds.findIndex((id) => id === item.id) === -1 && acc.push(item.id);
            return acc;
          }, [] as string[]);
          let err = null;

          if (differentialsRemove.length)
            err = await supabase
              .from('section_differentials')
              .delete()
              .in('id', differentialsRemove)
              .then((res) => {
                err = res.error;
              });

          if (err) throw 'err';
          if (differentials.length)
            await supabase
              .from('section_differentials')
              .upsert(differentials)
              .then((res) => {
                err = res.error;
              });
          if (err) throw 'err';

          toast.success('Diferenciais atualizados!', {
            pauseOnHover: false,
          });
          return true;
        } catch {
          toast.error(
            'Ocorreu algum erro ao atuaizar os diferenciais. Tente novamente mais tarde.',
          );
          throw false;
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="w-full space-y-4 mt-8">
        {differentials.map((item, i) => (
          <div key={item.id} className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor={`${item.id}`}>Diferencial {i + 1}</Label>
              <Textarea
                id={`${item.id}`}
                placeholder="..."
                className="resize-none max-h-[100px] min-h-[100px]"
                required
                defaultValue={item.desc}
                onChange={({ target: { value } }) => {
                  setDifferentials((prev) => {
                    prev[i].desc = value;
                    return prev;
                  });
                }}
              />
            </div>
            <button
              type="button"
              className="text-red-500 hover:bg-red-500/10 rounded-md p-3"
              onClick={() => setDifferentials((prev) => handleDeleteItem(i, prev!))}
            >
              <span className="sr-only">Deletar diferencial</span>
              <Trash />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="flex w-fit mx-auto justify-center p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setDifferentials((prev) => [...prev, { id: uuid(), desc: '' }])}
        >
          <span className="sr-only">Adicionar item</span>
          <PlusCircle className="w-8 h-8 text-gold" />{' '}
        </button>
      </div>
      <Button
        variant="fill"
        size="lg"
        className="text-xl uppercase self-center mt-10 block"
        disabled={loading}
      >
        Atualizar
      </Button>
    </form>
  );
};
