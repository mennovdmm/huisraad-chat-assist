import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HuisraadLogo from '@/assets/huisraad-logo.svg';

interface ChatHeaderProps {
  clientName: string;
  flowName: string;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function ChatHeader({ 
  clientName, 
  flowName, 
  onToggleSidebar, 
  isSidebarOpen 
}: ChatHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu size={20} />
        </Button>
        
        <div className="flex items-center gap-3">
          <img 
            src={HuisraadLogo} 
            alt="HuisRaad" 
            className="h-8 w-auto"
          />
          <div className="h-6 w-px bg-border" />
          <div className="text-sm">
            <span className="font-medium text-foreground">{clientName}</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-muted-foreground">{flowName}</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground hidden sm:block">
        AI Marketing Assistent
      </div>
    </header>
  );
}