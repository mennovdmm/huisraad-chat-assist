import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Je kunt mij vragen stellen over offertes, marktanalyses of vastgoed content. Start bijvoorbeeld met 'Ik wil een offerte maken voor [adres]'..."
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-h-[56px] max-h-[120px] resize-none rounded-lg border-2 border-border/40",
                "focus:ring-0 focus:border-primary/60 focus:outline-none",
                "pr-12 py-4 px-4 text-[15px] leading-normal font-normal",
                "bg-background shadow-sm placeholder:text-muted-foreground/70",
                "transition-all duration-150 ease-out",
                "font-sans"
              )}
              rows={1}
            />
            
            {/* Voice input button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 p-0 opacity-50 hover:opacity-100"
              disabled={disabled}
            >
              <Mic size={16} />
            </Button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="huisraad-send-btn h-[56px] w-12 rounded-lg p-0 flex-shrink-0 shadow-sm transition-all duration-150 border-0 flex items-center justify-center disabled:opacity-50"
            style={{ 
              backgroundColor: '#F74E06 !important', 
              borderColor: 'transparent !important',
              border: 'none !important'
            }}
          >
            <Send size={18} style={{ color: '#FBC27F !important' }} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Gebruik Shift+Enter voor een nieuwe regel
        </div>
      </div>
    </div>
  );
}