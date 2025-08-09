import React, { useEffect, useState } from "react";
import { ChevronRight, Mail, Bot, Trash2, PlusCircle, Settings, Users, Layers, LogOut } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import logo from "@/assets/huisraad-logo.svg";
import { useNavigate } from "react-router-dom";

interface FlowItem {
  id: string;
  icon: string; // emoji
  title: string;
  subtitle?: string;
  streaming?: boolean;
  interfaceMode?: "widget" | "streaming";
}

const ClientDashboard: React.FC = () => {
  useSEO({
    title: "Super User Dashboard - Huisraad Agents",
    description: "Bekijk en start beschikbare agents in jouw Huisraad omgeving.",
    canonicalPath: "/super-user-dashboard",
  });

  const navigate = useNavigate();

  const [userName] = useState<string>("");
  const [flows, setFlows] = useState<FlowItem[]>([]);

  // SHARED FUNCTIONS (placeholders)
  function logout() {
    console.log("TODO: POST /api/auth/logout");
    // navigate to /login in the future
    window.location.href = "/login";
  }

  function loadUserFlows() {
    console.log("TODO: GET /api/user/flows");
    setFlows([
      {
        id: "huurmarkt-research-assistant",
        icon: "🤖",
        title: "Huurmarkt Research Assistant",
        subtitle: "Direct toegang tot huurnieuws database en actuele marktinformatie",
        streaming: true,
        interfaceMode: "streaming",
      },
    ]);
  }

  function openFlow(flowId: string, interfaceMode?: FlowItem["interfaceMode"]) {
    navigate(`/standalone?agent=${flowId}`);
  }

  useEffect(() => {
    loadUserFlows();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 bg-background/80 backdrop-blur p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-6 md:px-10">
          <img src={logo} alt="Huisraad logo" className="h-20 md:h-24" />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => (window.location.href = '/super-user-dashboard?section=create')} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Nieuwe Agent</span>
              </button>
              <button onClick={() => (window.location.href = '/super-user-dashboard?section=agents')} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition">
                <Settings className="w-3.5 h-3.5" />
                <span>Agent Management</span>
              </button>
              <button onClick={() => (window.location.href = '/super-user-dashboard?section=users')} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition">
                <Users className="w-3.5 h-3.5" />
                <span>User Management</span>
              </button>
              <button onClick={() => (window.location.href = '/super-user-dashboard?section=platforms')} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition">
                <Layers className="w-3.5 h-3.5" />
                <span>Platform Management</span>
              </button>
            </nav>
            <span id="userName" className="text-xs text-muted-foreground">
              {userName}
            </span>
            <button onClick={logout} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition">
              <LogOut className="w-3.5 h-3.5" />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-semibold mb-8">Beschikbare Agents</h1>

            <section aria-labelledby="flows-heading">
              <h2 id="flows-heading" className="sr-only">Flows</h2>
              <div id="flowsList" className="space-y-3">
                {flows.map((flow) => (
                  <article
                    key={flow.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openFlow(flow.id, flow.interfaceMode)}
                    onKeyDown={(e) => e.key === "Enter" && openFlow(flow.id, flow.interfaceMode)}
                    className="bg-[hsl(var(--tile))] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-semibold text-primary">{flow.title}</h3>
                          {flow.subtitle && (
                            <p className="text-sm text-muted-foreground">{flow.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <button
                          onClick={(e) => { e.stopPropagation(); console.log('delete flow', flow.id); }}
                          aria-label="Verwijderen"
                          className="text-destructive/60 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {flows.length === 0 && (
                <div id="emptyState" className="text-center py-12">
                  <p className="text-muted-foreground">Geen agents beschikbaar</p>
                </div>
              )}
            </section>


            <aside className="mt-12 rounded-lg p-6 text-center bg-[hsl(var(--apricot))] text-[hsl(var(--apricot-foreground))]">
              <p className="font-medium mb-2">Nieuw idee voor een Agent?</p>
              <p className="text-sm">
                <Mail className="inline w-4 h-4 mr-1" aria-hidden="true" />
                <a href="mailto:menno@dehuisraad.com" className="underline underline-offset-2 hover:opacity-90">
                  menno@dehuisraad.com
                </a>
              </p>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
