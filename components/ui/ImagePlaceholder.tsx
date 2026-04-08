import clsx from "clsx";

interface ImagePlaceholderProps {
  className?: string;
  aspectRatio?: string;
  label?: string;
  rounded?: string;
  accentBottom?: boolean;
}

export default function ImagePlaceholder({
  className,
  aspectRatio = "aspect-[4/3]",
  label = "Imagem",
  rounded = "rounded-2xl",
  accentBottom = false,
}: ImagePlaceholderProps) {
  return (
    <div className={clsx("relative w-full overflow-hidden", aspectRatio, rounded, className)}>
      <div className="img-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* Camera / image icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-slate-400 z-10"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <span className="text-xs font-medium text-slate-400 z-10 tracking-wide uppercase">
          {label}
        </span>
      </div>

      {accentBottom && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary z-20" />
      )}
    </div>
  );
}
