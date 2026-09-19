import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl mb-16 md:mb-20", className)}>
      <h2 className="text-caption font-semibold tracking-widest text-muted-foreground uppercase mb-3 tracking-[0.2em]">
        {label}
      </h2>
      <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </p>
    </div>
  );
}
