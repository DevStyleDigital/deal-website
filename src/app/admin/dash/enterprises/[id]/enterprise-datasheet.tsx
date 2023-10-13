import { FormControl, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { type UseFormReturn } from 'react-hook-form';
import { type FormSchemaProps } from './enterprise-form';
import { PlusCircle, Trash } from 'lucide-react';
import { Datasheet } from 'types/enterprise';
import { handleDeleteItem } from 'utils/handle-delete-item';

export const EnterpriseDatasheet = ({
  form,
  datasheet,
  handleDatasheet,
}: {
  form: UseFormReturn<FormSchemaProps, any, undefined>;
  handleDatasheet: React.Dispatch<React.SetStateAction<Datasheet[]>>;
  datasheet: Datasheet[];
}) => (
  <div className="w-full space-y-4 mt-8">
    <div>
      <h3>Ficha Técnica</h3>
    </div>

    {datasheet.map((item, i) => (
      <div key={item.id} className="flex space-x-4">
        <FormItem className="w-full">
          <FormLabel>Item {i + 1}</FormLabel>
          <FormControl>
            <Input
              placeholder="Área do terreno"
              required
              defaultValue={item.label}
              onChange={({ target: { value } }) => {
                handleDatasheet((prev) => {
                  prev[i].label = value;
                  return prev;
                });
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem className="w-full">
          <FormLabel>Valor</FormLabel>
          <FormControl>
            <Input
              placeholder="20000m²"
              required
              defaultValue={item.value}
              onChange={({ target: { value } }) => {
                handleDatasheet((prev) => {
                  prev[i].value = value;
                  return prev;
                });
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <button
          type="button"
          className="text-red-500 h-fit self-end hover:bg-red-500/10 rounded-md p-3"
          onClick={() => handleDatasheet((prev) => handleDeleteItem(i, prev!))}
        >
          <span className="sr-only">Deletar imagem</span>
          <Trash />
        </button>
      </div>
    ))}

    <button
      type="button"
      className="flex w-fit mx-auto justify-center p-2 hover:bg-gray-100 rounded-md"
      onClick={() =>
        handleDatasheet((prev) => [
          ...prev,
          { id: Date.now().toString(), label: '', value: '', eid: '' },
        ])
      }
    >
      <span className="sr-only">Adicionar item</span>
      <PlusCircle className="w-8 h-8 text-gold" />{' '}
    </button>
  </div>
);
