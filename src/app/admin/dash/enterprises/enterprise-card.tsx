'use client';
import { EnterpriseCard as EnterpriseDefaultCard } from 'components/enterprise-card';

import { type EnterprisePartial } from 'types/enterprise';
import { Pencil, Trash } from 'lucide-react';
import { deleteEnterprise } from 'utils/enterprises-func';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EnterpriseCardProps {
  enterprise: EnterprisePartial;
  aspectRatio?: 'portrait' | 'square';
}

export const EnterpriseCard = ({
  enterprise,
  aspectRatio = 'portrait',
  ...props
}: EnterpriseCardProps) => {
  const router = useRouter();
  return (
    <div className="relative" {...props}>
      <div className="flex absolute z-10 w-full bg-blue/90 space-x-4 p-2 justify-between">
        <div>
          <Link
            href={`/admin/dash/enterprises/${enterprise.id}`}
            className="flex text-white items-center w-full space-x-4 p-4 hover:bg-blue rounded-sm"
          >
            <span className="block">Editar</span>
            <Pencil className="w-4 h-4" />
          </Link>
        </div>
        <div>
          <button
            className="text-red-500 p-4 space-x-4 flex items-center w-full hover:bg-blue rounded-sm"
            onClick={() => {
              deleteEnterprise(enterprise.id)
                .then(() => {
                  router.refresh();
                  toast.success('Empreendimento deletado com sucesso!');
                })
                .catch(() =>
                  toast.error(
                    'Ocorreu um erro ao deletar o empreendimento! Tente novamente mais tarde.',
                  ),
                );
            }}
          >
            <span className="block">Deletar</span>
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      <EnterpriseDefaultCard
        enterprise={enterprise}
        className="max-w-full w-full"
        href={`/admin/dash/enterprises/${enterprise.id}`}
      />
    </div>
  );
};
