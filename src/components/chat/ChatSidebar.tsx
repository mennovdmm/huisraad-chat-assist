
import React, { useState } from 'react';
import { MessageSquare, Plus, MoreHorizontal, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  messages: any[];
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
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
  const navigate = useNavigate();
  const handleRename = (sessionId: string, currentName: string) => {
    setEditingId(sessionId);
    setEditingName(currentName);
  };

  const handleSaveRename = (sessionId: string) => {
    onRenameSession(sessionId, editingName);
    setEditingId(null);
    setEditingName('');
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className={cn("w-64 bg-muted/30 border-r border-border flex flex-col h-full", className)}>
      {/* Branding Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          {/* Dynamic client logo - placeholder for CMS/Langflow - Now smaller */}
          <img 
            src="https://www.keij-stefels.nl/layouts/main/images/logo.svg" 
            alt="Client Logo" 
            className="h-6 w-auto"
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
          <div className="text-xl font-semibold text-foreground mb-1" data-dynamic-content="AGENT_TITLE">Makelaar Amsterdam</div>
          <div className="text-sm text-muted-foreground" data-dynamic-content="AGENT_SUBTITLE">Marketing Assistent</div>
        </div>

        {/* New Chat Button */}
        <Button 
          onClick={onNewSession}
          className="w-full gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus size={16} />
          Nieuwe Chat
        </Button>
      </div>

      {/* Chat Sessions List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {sessions.map((session) => (
            <div 
              key={session.id}
              className={cn(
                "group relative rounded-lg p-3 cursor-pointer transition-colors",
                activeSessionId === session.id 
                  ? "bg-[hsl(var(--apricot))]" 
                  : "hover:bg-muted/50"
              )}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-2">
                  {editingId === session.id ? (
                    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="h-8 text-sm"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(session.id);
                          if (e.key === 'Escape') handleCancelRename();
                        }}
                      />
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleSaveRename(session.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs"
                          onClick={handleCancelRename}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={14} className="text-primary flex-shrink-0" />
                        <h3 className="font-medium text-sm truncate text-foreground">
                          {session.name}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {session.lastMessage || 'No messages yet'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.timestamp.toLocaleDateString('nl-NL', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </>
                  )}
                </div>

                {editingId !== session.id && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show dropdown menu or actions
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </Button>
                    
                    {/* Quick action buttons */}
                    <div className="absolute right-2 top-8 bg-popover border rounded-md shadow-md p-1 z-10 opacity-0 group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 mb-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(session.id, session.name);
                        }}
                      >
                        <Edit2 size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button onClick={() => navigate('/user-dashboard')} variant="secondary" className="w-full justify-start">
          ← Dashboard
        </Button>
      </div>
    </div>
  );
}
