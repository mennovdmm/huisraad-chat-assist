import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface SessionItem {
  id: string;
  title: string;
  createdAt: number;
}

const StandaloneChat: React.FC = () => {
  // URL params for agent ID
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent") || "default";

  // UI State
  const [isTyping, setIsTyping] = useState(false);
  const [statusText, setStatusText] = useState("Ready");
  const [responseTime, setResponseTime] = useState<string>("--");
  const [speed, setSpeed] = useState<string>("--");

  // Data State (placeholder content – user can replace later)
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Input
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Derived agent info (placeholder mapping)
  const agentInfo = useMemo(() => {
    const map: Record<string, { title: string; subtitle: string; emoji: string }> = {
      default: {
        title: "AI Marketing Assistent",
        subtitle: "Klaar om te helpen",
        emoji: "🤖",
      },
    };
    return map[agentId] || map.default;
  }, [agentId]);

  // SEO basics for the page
  useEffect(() => {
    document.title = `${agentInfo.title} | Standalone Chat`;
    // Meta description
    const desc = document.querySelector('meta[name="description"]');
    const desired = `${agentInfo.title} – Snelle AI chat interface met sessies en typ-indicator.`;
    if (desc) desc.setAttribute("content", desired);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desired;
      document.head.appendChild(m);
    }
  }, [agentInfo.title]);

  // Auto-resize textarea
  useEffect(() => {
    if (!inputRef.current) return;
    const el = inputRef.current;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [inputValue]);

  // Scroll to bottom on messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Placeholder: Agent Configuration
  function loadAgent(id: string) {
    // TODO: Load agent metadata from backend
    console.log("loadAgent", id);
  }

  // Placeholder: Session Management
  function loadUserSessions() {
    // TODO: Fetch sessions
    console.log("loadUserSessions");
  }
  function createNewSession() {
    // TODO: Persist new session
    console.log("createNewSession");
    const newId = Math.random().toString(36).slice(2);
    const newSession: SessionItem = {
      id: newId,
      title: "Nieuwe chat",
      createdAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setMessages([]);
  }
  function loadSession(sessionId: string) {
    // TODO: Load messages for session
    console.log("loadSession", sessionId);
    setActiveSessionId(sessionId);
    setMessages([]);
  }

  // Placeholder: Chat Functionality
  function sendMessage() {
    // TODO: Replace with backend call/stream
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setStatusText("Voer een bericht in");
      return;
    }

    setStatusText("Verzenden...");
    const start = performance.now();

    addMessage("user", trimmed, Date.now());
    setInputValue("");

    showTyping();

    // Simulated assistant reply
    window.setTimeout(() => {
      hideTyping();
      const content = "(Placeholder) Bedankt voor je bericht – backend komt hier.";
      addMessage("assistant", content, Date.now());
      const end = performance.now();
      const ms = end - start;
      setResponseTime(`${Math.round(ms)} ms`);
      const tokenCount = Math.max(20, content.length / 4);
      setSpeed(`${(tokenCount / (ms / 1000)).toFixed(1)} tok/s`);
      setStatusText("Gereed");
    }, 600);
  }

  function streamResponse(_message: string, _contentElement?: HTMLElement) {
    // TODO: Implement streaming UI if needed
  }

  function saveMessage(_role: ChatMessage["role"], _content: string) {
    // TODO: Persist message to storage
  }

  // UI Helpers
  function addMessage(role: ChatMessage["role"], content: string, timestamp: number) {
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), role, content, timestamp },
    ]);
    saveMessage(role, content);
  }
  function showTyping() {
    setIsTyping(true);
  }
  function hideTyping() {
    setIsTyping(false);
  }
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  function goBackToDashboard() {
    // TODO: Navigate back to dashboard route
    window.history.back();
  }

  // init
  useEffect(() => {
    loadAgent(agentId);
    loadUserSessions();
  }, [agentId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-0">
        {/* Sidebar Component */}
        <aside id="sidebar" className="border-r border-border bg-card/50">
          <div className="sticky top-0 z-10 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
            <div className="flex items-center justify-between p-3 gap-2">
              <Button id="backBtn" variant="ghost" size="sm" onClick={goBackToDashboard}>
                ← Dashboard
              </Button>
              <Button id="newChatBtn" onClick={createNewSession} size="sm">
                + New Chat
              </Button>
            </div>
          </div>
          <div id="sessionsList" className="h-[calc(100vh-56px)] overflow-y-auto p-2 space-y-1">
            {sessions.length === 0 ? (
              <div className="text-muted-foreground text-sm p-3">Geen sessies</div>
            ) : (
              sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSession(s.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md border border-transparent hover:border-border transition-colors",
                    activeSessionId === s.id ? "bg-muted" : "bg-transparent"
                  )}
                >
                  <div className="text-sm font-medium truncate">{s.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(s.createdAt).toLocaleString()}
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main id="chatContainer" className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3 p-4">
              <div id="agentLogo" className="h-10 w-10 grid place-items-center rounded-md bg-primary/10 text-primary text-xl">
                {agentInfo.emoji}
              </div>
              <div className="agent-info">
                <h1 id="agentTitle" className="text-lg font-semibold leading-tight">
                  {agentInfo.title}
                </h1>
                <p id="agentSubtitle" className="text-sm text-muted-foreground">
                  {agentInfo.subtitle}
                </p>
              </div>
            </div>
          </header>

          {/* Messages */}
          <section id="messagesContainer" className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {messages.map((m) => (
              <article key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                  aria-label={m.role === "user" ? "User message" : "Assistant message"}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  <time className={cn("block mt-1 text-[10px] opacity-75", m.role === "user" ? "text-primary-foreground" : "text-muted-foreground")}
                    dateTime={new Date(m.timestamp).toISOString()}
                  >
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </time>
                </div>
              </article>
            ))}
            {isTyping && (
              <div id="typingIndicator" className="flex items-center gap-2 text-muted-foreground pl-1">
                <div className="h-6 w-6 grid place-items-center rounded-md bg-muted" aria-hidden>
                  <span className="sr-only">Assistant is typing</span>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse [animation-delay:200ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
                <div className="text-xs">Aan het typen…</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="input-container flex items-end gap-2">
              <textarea
                id="messageInput"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button id="sendBtn" onClick={sendMessage} className="huisraad-send-btn">
                Send
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Enter om te verzenden • Shift+Enter voor nieuwe regel</p>
          </div>

          {/* Status Bar */}
          <footer className="status-bar border-t border-border bg-card/50 text-muted-foreground text-xs px-3 py-2 flex items-center justify-between">
            <span id="statusText">{statusText}</span>
            <div className="metrics flex items-center gap-3">
              <span id="responseTime">Response time: {responseTime}</span>
              <span id="tokensPerSecond">Speed: {speed}</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default StandaloneChat;
