import React, { useState } from 'react';
import { MessageSquare, Plus, MoreHorizontal, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HuisraadLogo from '@/assets/huisraad-logo.svg';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
  onRenameSession: (sessionId: string, newName: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onCloseSidebar?: () => void;
  className?: string;
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onRenameSession,
  onDeleteSession,
  onCloseSidebar,
  className
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleRename = (session: ChatSession) => {
    setEditingId(session.id);
    setEditingName(session.name);
  };

  const handleRenameSubmit = () => {
    if (editingId && editingName.trim()) {
      onRenameSession(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className={cn("w-64 bg-muted/30 border-r border-border flex flex-col h-full", className)}>
      {/* Branding Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          {/* Dynamic client logo - placeholder for CMS/Langflow */}
          <img 
            src="https://www.keij-stefels.nl/layouts/main/images/logo.svg" 
            alt="Client Logo" 
            className="h-8 w-auto"
            data-dynamic-content="CLIENT_LOGO_URL"
          />
          {onCloseSidebar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCloseSidebar}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <X size={16} className="text-muted-foreground" />
            </Button>
          )}
        </div>
        <div className="mb-4">
          <div className="text-xl font-semibold text-foreground mb-1" data-dynamic-content="COMPANY_NAME">Makelaar Amsterdam</div>
          <div className="text-sm text-muted-foreground" data-dynamic-content="COMPANY_TAGLINE">Marktanalyse & Offertes</div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-foreground">Chats</h3>
        </div>
        <div className="p-2 space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative rounded-lg p-3 cursor-pointer transition-colors",
                "hover:bg-accent/50",
                activeSessionId === session.id && "text-white"
              )}
              style={activeSessionId === session.id ? { backgroundColor: '#FBC27F' } : {}}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare size={14} className="text-muted-foreground flex-shrink-0" />
                    {editingId === session.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit();
                          if (e.key === 'Escape') handleRenameCancel();
                        }}
                        onBlur={handleRenameSubmit}
                        className="h-6 text-sm py-0 px-1"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span 
                        className="text-sm font-medium truncate"
                        style={activeSessionId === session.id ? { color: '#F74E06' } : {}}
                      >
                        {session.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {session.timestamp.toLocaleDateString('nl-NL')}
                  </p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={12} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRename(session)}>
                      <Edit2 size={14} className="mr-2" />
                      Hernoemen
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteSession(session.id)}
                      className="text-destructive"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Verwijderen
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}