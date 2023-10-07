import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserAuthForm } from './user-auth-form';
import { Logo } from 'assets/logo';

const Admin: BTypes.NPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('__AUTH')?.value;
  if (token && token !== 'null' && token.length) return redirect('/admin/dash');

  return (
    <main className="flex-1 p-6 flex gap-6 items-center justify-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-96">
          <div className="flex flex-col space-y-2 items-center text-blue">
            <div>
              <span className="sr-only">Deal Empreendimentos</span>
              <Logo aria-hidden className="fill-blue" />
            </div>
            <p className="opacity-60">Acesso ao painel administrativo.</p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </main>
  );
};

export default Admin;
