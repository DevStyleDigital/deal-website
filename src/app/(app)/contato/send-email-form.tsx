'use client';
import { Button } from 'components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input, InputMask } from 'components/ui/input';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { Textarea } from 'components/ui/textarea';

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Insira um e-mail valido.' }),
  phone: z.string().length(15, { message: 'Insira um telefone valido.' }).optional(),
  message: z.string(),
});
export const SendEmailForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema as any),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('Seu e-mail foi enviado com sucesso! Em breve entraremos em contato.', {
      pauseOnHover: false,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col w-full max-w-2xl pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Seu Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jhon"
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
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="exemplo@dominio.com"
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
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <InputMask
                  mask={[
                    '(',
                    /\d/,
                    /\d/,
                    ')',
                    ' ',
                    '9',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="(11) 91111-1111"
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
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Messagem</FormLabel>
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
        <Button className="uppercase text-2xl self-end" variant="fill" size="lg">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
