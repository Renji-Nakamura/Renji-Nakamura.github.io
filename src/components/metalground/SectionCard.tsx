import { SectionItem } from '@/data/reportData';
import { Hash } from 'lucide-react';

interface SectionCardProps {
  section: SectionItem;
}

export default function SectionCard({ section }: SectionCardProps) {
  // Split section body into paragraphs
  const paragraphs = section.body.split('\n\n').filter(p => p.trim().length > 0);

  // Helper to render text with highlighted code spans, bold, and experiment tags
  const renderFormattedText = (text: string) => {
    // Split by backticks for inline code
    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1);
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 text-xs font-mono font-medium rounded bg-secondary text-orange-600 dark:text-orange-400 border border-border/80"
          >
            {code}
          </code>
        );
      }

      // Handle bold **text**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          const boldText = bPart.slice(2, -2);
          return (
            <strong key={`${idx}-${bIdx}`} className="font-bold text-foreground">
              {boldText}
            </strong>
          );
        }
        return bPart;
      });
    });
  };

  return (
    <article id={section.id} className="py-12 border-b border-border/60 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-start justify-between mb-6 group">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-mono font-bold text-orange-500 border border-border/80 shrink-0">
            {String(section.number).padStart(2, '0')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {section.title}
          </h2>
        </div>
        <a
          href={`#${section.id}`}
          className="text-muted-foreground/40 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          title="セクションへのパーマリンク"
          aria-label={`${section.title}へのリンク`}
        >
          <Hash size={18} />
        </a>
      </div>

      {/* Section Body */}
      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
        {paragraphs.map((p, pIdx) => {
          const trimmed = p.trim();

          // Check if paragraph is bullet list
          if (trimmed.startsWith('- ')) {
            const listItems = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
            return (
              <ul key={pIdx} className="my-4 space-y-2.5 pl-2">
                {listItems.map((item, lIdx) => {
                  const itemText = item.replace(/^- /, '').trim();
                  return (
                    <li key={lIdx} className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                      <span className="leading-relaxed">
                        {renderFormattedText(itemText)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          // Regular paragraph
          return (
            <p key={pIdx} className="leading-relaxed">
              {renderFormattedText(trimmed)}
            </p>
          );
        })}
      </div>
    </article>
  );
}
