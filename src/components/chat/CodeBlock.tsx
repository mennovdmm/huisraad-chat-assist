import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={cn(
      "relative bg-muted/50 border border-border rounded-lg overflow-hidden my-4",
      className
    )}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background border border-border rounded-md transition-colors z-10"
        title={copied ? "Gekopieerd!" : "Kopieer code"}
      >
        {copied ? (
          <Check size={14} className="text-success" />
        ) : (
          <Copy size={14} className="text-muted-foreground" />
        )}
      </button>

      {/* Language label */}
      {language && (
        <div className="px-4 py-2 border-b border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          {language}
        </div>
      )}

      {/* Code content */}
      <pre className="p-4 pr-16 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed text-foreground">
          {code}
        </code>
      </pre>
    </div>
  );
}