import { UploadImageInput } from 'components/upload-image-input';

export const Banner = ({
  disabled,
  banner,
  id,
  handleBanner,
  text,
  desc,
}: {
  disabled?: boolean;
  text: string;
  desc?: string;
  id: string;
  banner: File | string | null;
  handleBanner: (f: File | null) => void;
}) => (
  <div className="flex flex-col flex-1">
    <h1 className="text-center">{text}</h1>
    <span className="text-sm italic opacity-60 block text-center">{desc}</span>

    <div className="max-w-2xl h-full w-full mx-auto mt-4 mb-8">
      <UploadImageInput
        file={banner}
        disabled={disabled}
        required={!banner}
        handleFile={(file) => handleBanner(file)}
        id={id}
      />
    </div>
  </div>
);
