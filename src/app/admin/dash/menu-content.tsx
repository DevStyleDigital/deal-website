'use client';

import {
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
} from 'components/ui/menubar';
import { useAuth } from 'contexts/auth';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export const MenuContent = () => {
  const { signOut, user } = useAuth();

  return (
    <MenubarContent forceMount align="end">
      <MenubarLabel className="truncate max-w-[150px]">{user?.email}</MenubarLabel>
      <MenubarSeparator />
      <MenubarItem asChild>
        <button onClick={signOut} className="w-full">
          Sair{' '}
          <MenubarShortcut>
            <LogOut className="w-4 h-4" />
          </MenubarShortcut>
        </button>
      </MenubarItem>
    </MenubarContent>
  );
};
