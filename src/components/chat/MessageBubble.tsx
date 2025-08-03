import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

export function MessageBubble({ message, isLatest = false }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  
  // Check if message contains code blocks
  const hasCodeBlock = message.content.includes('```');
  
  const renderMessageContent = () => {
    if (hasCodeBlock) {
      const parts = message.content.split(/(```[\s\S]*?```)/);
      return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).split('\n');
          const language = lines[0].trim();
          const code = lines.slice(1).join('\n');
          return (
            <CodeBlock 
              key={index} 
              code={code} 
              language={language || undefined}
            />
          );
        }
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part}
          </div>
        );
      });
    }
    return (
      <div className="whitespace-pre-wrap">
        {message.content}
      </div>
    );
  };
  
  if (isUser) {
    // User message: Subtle orange styling, right-aligned
    return (
      <div className={cn(
        "flex w-full mb-6 justify-end animate-fade-in",
        isLatest && "animate-scale-in"
      )}>
        <div className="flex max-w-[80%] sm:max-w-[70%] gap-3 flex-row-reverse">
          {/* Avatar */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          
          {/* Message Content */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl rounded-br-md px-4 py-3">
            <div className="text-sm leading-relaxed text-foreground">
              {renderMessageContent()}
            </div>
            <div className="text-xs mt-2 text-muted-foreground">
              {message.timestamp.toLocaleTimeString('nl-NL', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // AI message: No bubble, flowing with background
  return (
    <div className={cn(
      "flex w-full mb-6 animate-fade-in",
      isLatest && "animate-scale-in"
    )}>
      <div className="flex w-full max-w-none gap-3">
        {/* Avatar - HuisRaad logo style */}
        <div className="flex-shrink-0 w-10 h-16 rounded-lg flex items-center justify-center mt-1 shadow-sm" style={{ backgroundColor: '#FBC27F' }}>
          <Bot size={20} style={{ color: '#F74E06' }} />
        </div>
        
        {/* Message Content - No bubble, flows with background */}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] leading-[1.6] text-foreground font-normal">
            {renderMessageContent()}
          </div>
          <div className="text-xs mt-3 text-muted-foreground font-normal">
            {message.timestamp.toLocaleTimeString('nl-NL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}