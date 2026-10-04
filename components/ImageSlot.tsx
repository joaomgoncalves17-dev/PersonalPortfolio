import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  ratio: string;
  pending: string;
  sizes: string;
  priority?: boolean;
};

// Imagem com proporção reservada. Sem `src` mostra um bloco provisório (TODO: imagem real).
export function ImageSlot({ src, alt, ratio, pending, sizes, priority }: Props) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden border border-line bg-panel`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:24px_24px] p-4"
        >
          <span className="bg-panel px-2 py-1 font-mono text-xs text-muted">{pending}</span>
        </div>
      )}
    </div>
  );
}
