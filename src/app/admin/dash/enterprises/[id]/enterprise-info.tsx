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

export const EnterpriseInfo = ({
  form,
}: {
  form: UseFormReturn<FormSchemaProps, any, undefined>;
}) => (
  <div className="w-full space-y-8">
    <FormField
      control={form.control}
      name="name"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Nome do empreendimento</FormLabel>
          <FormControl>
            <Input
              placeholder="Empreendimento"
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
      name="type"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Tipo de empreendimento</FormLabel>
          <FormControl>
            <Input
              placeholder="Residence Club"
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
      name="video"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Video do empreendimento</FormLabel>
          <FormControl>
            <Input
              placeholder={'<iframe src="https://...'}
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
      name="status"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Status do empreendimento</FormLabel>
          <FormControl>
            <Select
              required
              {...field}
              defaultValue="new"
              onValueChange={(v) => field.onChange({ target: { value: v } })}
            >
              <SelectTrigger error={!!fieldState.error}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nennhum</SelectItem>
                <SelectItem value="new">Lançamento</SelectItem>
                <SelectItem value="close">100% Vendido</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="desc"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Descrição do empreendimento</FormLabel>
          <FormControl>
            <Textarea
              placeholder="..."
              className="resize-none"
              required
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
