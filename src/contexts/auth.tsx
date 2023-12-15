/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SupabaseClient, type User as SBUser, type Session } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type User = { id: string; email: string };
type AuthContextProps = {
  signIn: (e: string, p: string) => Promise<string>;
  signOut: () => Promise<void>;
  user: User | null;
  loading: boolean;
  supabase: SupabaseClient<any, 'public', any>;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: BTypes.FCChildren) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthContextProps['user']>(null);
  const [loading, setLoading] = useState<AuthContextProps['loading']>(false);

  function handleUser(data: { session: Session | null; user: SBUser | null } | null) {
    if (data?.user && data?.session) {
      setUser({ email: data.user.email!, id: data.user.id });
      return;
    }
    setUser(null);
    if (pathname.includes('/admin')) router.push('/admin');
    else router.push('/');
  }

  const signIn: AuthContextProps['signIn'] = async (email, password) => {
    setLoading(true);
    return await supabase.auth
      .signInWithPassword({ email, password })
      .then((res) => {
        if (res.error) throw res.error.name;
        handleUser(res.data);
        return 'success';
      })
      .finally(() => setLoading(false));
  };

  const signOut = async () => {
    setLoading(true);
    return supabase.auth
      .signOut()
      .then(() => handleUser(null))
      .catch(() => handleUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) =>
      handleUser({ user: session?.user || null, session }),
    );
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signOut, supabase }),
    [user, loading, supabase],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
