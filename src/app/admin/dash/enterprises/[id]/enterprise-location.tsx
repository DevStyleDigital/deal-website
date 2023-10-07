import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { type UseFormReturn } from 'react-hook-form';
import { type FormSchemaProps } from './enterprise-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const EnterpriseLocation = ({
  form,
  states,
}: {
  form: UseFormReturn<FormSchemaProps, any, undefined>;
  states: { id: number; name: string; short: string }[];
}) => {
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [state, setState] = useState<string>(form.getValues('state') || '');
  const [cities, setCities] = useState<{ name: string; id: string }[]>([]);
  useEffect(() => {
    if (!state.length) return;
    setLoading(true);
    !firstTime && form.setValue('city', '');
    firstTime && setFirstTime(false);
    fetch(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`,
    )
      .then((res) => res.json())
      .then((res) => {
        setCities(
          res.map(({ nome, codigo_ibge }: any) => ({ id: codigo_ibge, name: nome })),
        );
      })
      .catch(() =>
        toast.error(
          'Ocorreu um erro ao procurar pelas cidades. Tente novamente mais tarde.',
        ),
      )
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-full space-y-8 mt-12">
      <div className="flex space-x-4 w-full">
        <FormField
          control={form.control}
          name="state"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select
                  required
                  {...field}
                  onValueChange={(v) => {
                    setState(v);
                    field.onChange({ target: { value: v } });
                  }}
                >
                  <SelectTrigger error={!!fieldState.error}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(({ id, name, short }) => (
                      <SelectItem key={id} value={short}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Select
                  required
                  {...field}
                  disabled={!state.length || loading}
                  onValueChange={(v) => field.onChange({ target: { value: v } })}
                >
                  <SelectTrigger error={!!fieldState.error}>
                    <SelectValue
                      placeholder={loading ? 'Carregando...' : 'Selecione...'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(({ id, name }) => (
                      <SelectItem key={id} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="address"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input
                placeholder="Rua, Número, Bairro"
                required
                error={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location_iframe"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Loacalização Google Maps</FormLabel>
            <FormControl>
              <Input
                placeholder={'<iframe src="https://...'}
                required
                error={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage>
              <span className="text-sm font-normal italic opacity-60 block">
                Copie o iframe disponbilizado pelo google maps em {'"Incorporar um mapa"'}
              </span>
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="district_desc"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Descrição do bairro</FormLabel>
            <FormControl>
              <Textarea
                placeholder="..."
                className="resize-none"
                error={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
