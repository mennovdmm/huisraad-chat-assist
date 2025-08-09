import React, { useEffect, useState } from "react";
import { ChevronRight, Mail, Bot, Trash2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import logo from "@/assets/huisraad-logo.svg";

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
    title: "Client Dashboard - Huisraad Agents",
    description: "Bekijk en start beschikbare agents in jouw Huisraad omgeving.",
    canonicalPath: "/dashboard",
  });

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
    if (interfaceMode === "streaming") {
      window.open(`/standalone?agent=${flowId}`, "_blank");
    } else {
      // Placeholder for widget mode
      window.open(`/standalone?agent=${flowId}`, "_blank");
    }
  }

  useEffect(() => {
    loadUserFlows();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 border-b border-border bg-background/80 backdrop-blur p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <img src={logo} alt="Huisraad logo" className="h-12" />
          <div className="flex items-center gap-4">
            <span id="userName" className="text-sm text-muted-foreground">
              {userName}
            </span>
            <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-xl mr-auto ml-4 md:ml-12 p-8">
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
                className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 text-primary grid place-items-center">
                      <Bot className="w-5 h-5" />
                    </div>
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

        <aside className="mt-12 bg-accent/20 rounded-lg p-6 text-center">
          <p className="font-medium mb-2">Nieuw idee voor een Agent?</p>
          <p className="text-sm text-muted-foreground">
            <Mail className="inline w-4 h-4 mr-1" aria-hidden="true" />
            <a href="mailto:menno@dehuisraad.com" className="underline-offset-2 hover:underline">
              menno@dehuisraad.com
            </a>
          </p>
        </aside>
      </main>
    </div>
  );
};

export default ClientDashboard;
