'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAuth } from 'contexts/auth';
import { cn } from 'utils/cn';
import { toast } from 'react-toastify';

export const UserAuthForm = () => {
  const router = useRouter();
  const { loading, signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = () => setError(null);
  const handleSignIn = () => router.push('/admin/dash');

  async function onSubmit(ev: React.SyntheticEvent) {
    ev.preventDefault();
    setIsLoading(true);

    const {
      email: { value: email },
      password: { value: password },
    } = ev.currentTarget as EventTarget &
      Element & { [key in 'email' | 'password']: { value: string } };

    signIn(email, password)
      .then(handleSignIn)
      .catch((err: string) => {
        console.log(err);
        // if (err.includes('auth/invalid-login-credentials'))
        //   return setError('E-mail ou senha inválidos, verifique-os e tente novamente.');

        toast.error(
          'Ocorreu um erro ao entrar na sua conta, tente novamente mais tarde.',
        );
        return err;
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} onInput={clearError}>
        <div className="grid gap-4">
          <p className="text-sm text-destructive italic">{error}</p>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="E-mail"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
              className={cn({ 'border-destructive': !!error })}
              disabled={loading || isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              name="password"
              required
              className={cn({ 'border-destructive': !!error })}
              disabled={loading || isLoading}
            />
          </div>

          <Button disabled={loading || isLoading} variant="gold" size="lg">
            {(loading || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
};
