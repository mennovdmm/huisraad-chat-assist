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
          className="lg:hidden p-2 mr-2"
        >
          <Menu size={24} />
        </Button>
        
        <div className="flex items-center gap-3">
          {/* Dynamic client logo - placeholder for CMS/Langflow */}
          <img 
            src="https://www.keij-stefels.nl/layouts/main/images/logo.svg"
            alt="Client Logo" 
            className="h-8 w-auto md:h-8 h-6"
            data-dynamic-content="CLIENT_LOGO_URL"
          />
          <div className="h-6 w-px bg-border" />
          <div className="text-sm">
            <span className="font-medium text-foreground" data-dynamic-content="COMPANY_NAME">{clientName}</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-muted-foreground" data-dynamic-content="FLOW_NAME">{flowName}</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground hidden sm:block">
        AI Marketing Assistent
      </div>
    </header>
  );
}