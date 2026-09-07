interface Props {
  hex: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  rounded?: string;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
  xl: 'w-32 h-32',
  hero: 'w-full aspect-[4/5] max-h-[min(52vh,420px)] lg:max-h-[min(56vh,520px)]',
};

export function ColorSwatch({
  hex,
  size = 'md',
  className = '',
  rounded = 'rounded-3xl',
}: Props) {
  return (
    <div
      className={[
        sizes[size],
        rounded,
        'shadow-inner ring-1 ring-black/5 dark:ring-white/10',
        className,
      ].join(' ')}
      style={{ backgroundColor: hex }}
      aria-hidden
    />
  );
}
