import { cn } from '@/lib/utils';
import DecryptedText from '@/components/DecryptedText';

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl mb-16 md:mb-20", className)}>
      <h2 className="text-caption font-semibold tracking-widest text-muted-foreground uppercase mb-3 tracking-[0.2em]">
        <DecryptedText triggerOnView duration={900}>
          {label}
        </DecryptedText>
      </h2>
      <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        <DecryptedText triggerOnView duration={1300} delay={150}>
          {title}
        </DecryptedText>
      </p>
    </div>
  );
}
