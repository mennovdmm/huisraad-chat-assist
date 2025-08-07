import React, { useState, useRef, useEffect } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSidebar } from './ChatSidebar';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  const handleSendMessage = async (content: string) => {
    if (!activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { 
            ...session, 
            messages: [...session.messages, userMessage],
            lastMessage: content,
            timestamp: new Date()
          }
        : session
    ));

    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: 'ai',
        timestamp: new Date()
      };

      setSessions(prev => prev.map(session => 
        session.id === activeSessionId 
          ? { 
              ...session, 
              messages: [...session.messages, aiMessage],
              lastMessage: 'AI heeft geantwoord...'
            }
          : session
      ));

      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    // Simple AI response simulation
    if (userMessage.toLowerCase().includes('offerte')) {
      return 'Ik help je graag met het maken van een offerte! Voor welk adres wil je een offerte opstellen? Ik heb de volgende informatie nodig:\n\n• Het volledige adres\n• Type dienstverlening (verkoop/verhuur/taxatie)\n• Gewenste startdatum\n\nMet deze gegevens kan ik een professionele offerte voor je genereren.';
    }
    
    if (userMessage.toLowerCase().includes('marktanalyse')) {
      return 'Voor een grondige marktanalyse verzamel ik de volgende informatie:\n\n• Recente verkopen in de buurt\n• Gemiddelde prijzen per m²\n• Markttrends en vooruitzichten\n• Vergelijkbare objecten\n\nWelke specifieke locatie wil je analyseren?';
    }

    return 'Dank je voor je vraag! Ik ben gespecialiseerd in het helpen van makelaars met offertes, marktanalyses en vastgoed content. Kun je me meer vertellen over wat je precies nodig hebt?';
  };


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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            {activeSession?.messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <img 
                    src="https://www.keij-stefels.nl/layouts/main/images/logo.svg" 
                    alt="Client Logo" 
                    className="h-16 w-auto mx-auto"
                    data-dynamic-content="CLIENT_LOGO_URL"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2" data-dynamic-content="WELCOME_TITLE">Welkom bij ai.huisraad.com</h2>
                <p className="text-muted-foreground max-w-md mx-auto" data-dynamic-content="WELCOME_MESSAGE">
                  Begin een gesprek door een vraag te stellen over offertes, marktanalyses of vastgoed content.
                </p>
                <div className="mt-4 p-3 bg-green-100 rounded-lg text-sm">
                  <p className="font-medium text-green-800">🚀 Langflow integratie gereed!</p>
                  <p className="text-green-700">Script laadt succesvol - klaar voor configuratie</p>
                </div>
              </div>
            ) : (
              <>
                {activeSession?.messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isLatest={index === activeSession.messages.length - 1}
                  />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
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