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
                "min-h-[52px] max-h-[120px] resize-none rounded-xl border border-border/60",
                "focus:ring-1 focus:ring-primary/30 focus:border-primary/50",
                "pr-12 py-4 px-4 text-sm leading-normal font-medium",
                "bg-background/80 backdrop-blur-sm shadow-sm",
                "transition-all duration-200"
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
          
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            size="sm"
            className="h-[52px] w-12 rounded-xl p-0 flex-shrink-0 shadow-sm transition-all duration-200"
          >
            <Send size={18} />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Gebruik Shift+Enter voor een nieuwe regel
        </div>
      </div>
    </div>
  );
}