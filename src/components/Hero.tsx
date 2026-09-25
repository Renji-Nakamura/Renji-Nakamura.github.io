import { Badge } from '@/components/ui/badge';
import DecryptedText from '@/components/DecryptedText';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-background px-6 py-24 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle premium label with MFP Decrypt */}
        <Badge
          variant="outline"
          className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6 tracking-[0.2em] py-1 px-4 border-border/80"
        >
          <DecryptedText duration={900} delay={100}>
            CS Student & Software Developer
          </DecryptedText>
        </Badge>
        
        {/* Main striking headline with MFP Decrypt */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1] mb-8">
          <DecryptedText duration={1600} delay={300}>
            Learning software logic and exploring real-world AI implementation.
          </DecryptedText>
        </h1>
        
        {/* Light body subtext with MFP Decrypt */}
        <p className="text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl leading-relaxed mb-16">
          <DecryptedText duration={1900} delay={600}>
            Based in Morioka, Iwate. Computer Science student exploring convolutional neural networks and solid code design.
          </DecryptedText>
        </p>
      </div>

      {/* Floating ambient bottom spacer/indicator */}
      <div className="absolute bottom-12 text-border animate-pulse hidden sm:block">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/40 to-transparent mx-auto" />
      </div>
    </section>
  );
}
