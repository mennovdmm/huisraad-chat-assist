import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSidebar } from './ChatSidebar';
import LangflowChat from './LangflowChat';
import { cn } from '@/lib/utils';
import HuisraadLogo from '@/assets/huisraad-logo.svg';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

export function ChatInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      name: 'Marktanalyse Amsterdam Noord',
      lastMessage: 'Wat zijn de gemiddelde prijzen per m²?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      messages: []
    },
    {
      id: '2',
      name: 'Offerte Vondelpark appartement',
      lastMessage: 'Kun je een offerte maken voor een 3-kamer appartement?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messages: []
    },
    {
      id: '3',
      name: 'Verhuurstrategie Jordaan',
      lastMessage: 'Wat is de beste verhuurstrategie voor deze buurt?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messages: []
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>('1');


  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: 'Nieuwe Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: []
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleRenameSession = (sessionId: string, newName: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, name: newName } : session
    ));
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (activeSessionId === sessionId && sessions.length > 1) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      setActiveSessionId(remainingSessions[0]?.id || '');
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-0",
        "lg:relative absolute lg:translate-x-0 z-20"
      )}>
        {isSidebarOpen && (
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSessionSelect={setActiveSessionId}
            onNewSession={handleNewSession}
            onRenameSession={handleRenameSession}
            onDeleteSession={handleDeleteSession}
            className="h-full"
          />
        )}
      </div>

      {/* Main Chat Area - Clean with sticky header */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header - Clean without border */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 pl-4 pr-4">
          <div className="flex items-center justify-between">
            {/* Logo helemaal links en heel groot */}
            <div className="flex items-center">
              {/* Logo eerst op mobile, hamburger menu op desktop verborgen */}
              <img 
                src={HuisraadLogo} 
                alt="HuisRaad" 
                className="h-14 md:h-28 w-auto lg:hidden mr-1"
              />
              
              {/* Mobile menu button */}
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden h-12 w-12 p-0"
                >
                  <Menu size={32} />
                </Button>
              )}
              
              {/* Desktop menu button when sidebar is closed */}
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  className="hidden lg:block p-2 mr-4"
                >
                  <Menu size={24} />
                </Button>
              )}
              
              {/* Desktop logo */}
              <img 
                src={HuisraadLogo} 
                alt="HuisRaad" 
                className="h-28 w-auto hidden lg:block"
              />
            </div>
            
            {/* New Chat Button */}
            <Button 
              onClick={handleNewSession}
              variant="outline"
              className="gap-2"
            >
              <Plus size={16} />
              Nieuwe Chat
            </Button>
          </div>
        </div>

        {/* Langflow Chat Widget */}
        <div className="flex-1 relative">
          <LangflowChat />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}