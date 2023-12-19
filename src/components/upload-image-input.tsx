'use client';
import { Image as ImageIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Progress } from 'components/ui/progress';
import { cn } from 'utils/cn';
import Image from 'next/image';

export const UploadImageInput = ({
  required = true,
  file,
  id,
  disabled,
  progress,
  handleFile,
  accept,
}: {
  id: string;
  accept?: string;
  required?: boolean;
  file: File | string | null;
  progress?: number;
  disabled?: boolean;
  handleFile: (file: File | null) => void;
}) => {
  function handleFileSelected(files: FileList | null) {
    if (!files) return;
    const selectedFile = files[0];
    handleFile(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (!file) return null;
    return typeof file === 'string' ? file : URL.createObjectURL(file);
  }, [file]);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={cn(
          'relative border-gold border-2 flex rounded-md aspect-video cursor-pointer border-dashed text-sm gap-2 justify-center items-center text-muted-foreground hover:bg-primary/5',
          {
            'hover:cursor-wait': !!progress,
            'hover:bg-transparent opacity-50 pointer-events-none': !!progress || disabled,
          },
        )}
      >
        {progress ? (
          <div className="flex flex-col w-full items-center space-y-2" role="status">
            <p>Carregando...</p>
            <Progress value={progress} className="!w-9/12" />
          </div>
        ) : previewURL ? (
          <Image
            src={`${previewURL}?d=${Date.now()}`}
            alt=""
            className="pointer-events-none absolute h-[95%] w-[95%] rounded-md object-center object-cover"
            width={2000}
            height={2000}
          />
        ) : (
          <>
            Carregar Imagem
            <ImageIcon className="w-4 h-4" />
          </>
        )}
      </label>
      <input
        type="file"
        id={id}
        accept={accept ? accept : 'image/*'}
        className="sr-only"
        required={required}
        disabled={!!progress}
        onChange={(ev) => handleFileSelected(ev.currentTarget.files)}
      />
    </div>
  );
};
