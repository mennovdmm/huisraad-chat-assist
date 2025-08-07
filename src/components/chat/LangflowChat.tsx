import React, { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'langflow-chat': any;
    }
  }
}

const LangflowChat: React.FC = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Load widget via CDN script tag
    if (typeof window !== 'undefined') {
      const loadLangflowScript = () => {
        // Check if script already exists
        if (document.querySelector('script[src*="langflow"]')) {
          console.log("Langflow script already loaded");
          checkForWidget();
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/langflow-embedded-chat@0.1.1/dist/build/static/js/bundle.min.js';
        script.onload = () => {
          console.log("✅ Langflow script loaded successfully");
          checkForWidget();
        };
        script.onerror = (error) => {
          console.error("❌ Langflow script BLOCKED or failed:", error);
          console.log("🛡️ Mogelijk adblocker probleem - probeer adblocker uit te zetten");
          setLoadError("Script blocked by adblocker - try disabling extensions");
        };
        
        document.head.appendChild(script);
      };

      const checkForWidget = () => {
        // Check if langflow-chat web component is available
        setTimeout(() => {
          console.log("Checking for widget...", {
            customElements: !!window.customElements,
            langflowChat: window.customElements?.get('langflow-chat'),
            widgetInDOM: document.querySelector('langflow-chat')
          });
          
          if (window.customElements && window.customElements.get('langflow-chat')) {
            console.log("Langflow widget ready");
            setWidgetLoaded(true);
          } else {
            console.log("Widget not ready, showing preview");
            setLoadError("Widget preview - script might have failed");
          }
        }, 1000); // Longer timeout
      };

      loadLangflowScript();
    }
  }, []);

  // Styling configuration ready for when widget loads
  const chatWindowStyle = JSON.stringify({
    position: "fixed",
    top: "80px",
    left: "0",
    right: "0", 
    bottom: "0",
    width: "100%",
    height: "calc(100vh - 80px)",
    border: "none",
    boxShadow: "none",
    backgroundColor: "hsl(var(--background))",
    borderRadius: "0"
  });

  const botMessageStyle = JSON.stringify({
    backgroundColor: "hsl(var(--card))",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "1rem",
    borderBottomLeftRadius: "0.375rem",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    maxWidth: "80%"
  });

  const userMessageStyle = JSON.stringify({
    backgroundColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    borderRadius: "1rem",
    borderBottomRightRadius: "0.375rem", 
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    maxWidth: "80%",
    marginLeft: "auto"
  });

  const inputStyle = JSON.stringify({
    backgroundColor: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "0.5rem",
    color: "hsl(var(--foreground))",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    width: "100%",
    marginBottom: "1rem"
  });

  const chatTriggerStyle = JSON.stringify({
    display: "none"
  });

  // Show preview/demo of configured styling
  if (loadError) {
    return (
      <div className="flex-1 flex flex-col h-full">
        {/* Demo Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center py-4">
            <div className="inline-block bg-muted/50 rounded-lg px-3 py-1 text-sm text-muted-foreground">
              Langflow Widget Preview - Configured Styling
            </div>
          </div>
          
          {/* Bot Message */}
          <div className="flex justify-start">
            <div 
              className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 border"
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                borderColor: "hsl(var(--border))"
              }}
            >
              <p className="text-sm">
                Hallo! Ik ben je AI assistent geïntegreerd via Langflow. Ik kan je helpen met vragen over makelaardij, marktanalyses en offertes. Wat kan ik voor je doen?
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div 
              className="max-w-[80%] rounded-2xl rounded-br-md px-4 py-3"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))"
              }}
            >
              <p className="text-sm">
                Kun je me helpen met een marktanalyse voor Amsterdam Noord?
              </p>
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex justify-start">
            <div 
              className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 border"
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                borderColor: "hsl(var(--border))"
              }}
            >
              <p className="text-sm mb-2">
                Natuurlijk! Voor een marktanalyse van Amsterdam Noord verzamel ik de volgende informatie:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Recente verkopen in de buurt</li>
                <li>• Gemiddelde prijzen per m²</li>
                <li>• Markttrends en vooruitzichten</li>
                <li>• Vergelijkbare objecten</li>
              </ul>
              <p className="text-sm mt-2">
                Heb je een specifiek adres in gedachten?
              </p>
            </div>
          </div>

          {/* Configuration Notice */}
          <div className="text-center py-4">
            <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
              <h3 className="font-medium mb-2 text-sm">Widget Configuratie</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>✓ Styling geconfigureerd met design system</div>
                <div>✓ Shadow DOM compatible</div>
                <div>✓ Responsive layout</div>
                <div>⚠️ Host URL, Flow ID & API Key nodig</div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Input Field */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <div 
              className="flex-1 rounded-lg px-4 py-3 border text-sm"
              style={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--muted-foreground))"
              }}
            >
              Type je vraag hier... (demo styling)
            </div>
            <button 
              className="px-4 py-3 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))"
              }}
              disabled
            >
              Verstuur
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <span className="text-xs text-muted-foreground">
              Preview van Langflow widget styling - Ready for configuration
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render widget when loaded and configured
  return (
    <div className="langflow-container h-full w-full bg-red-100">
      <div className="p-4 text-center bg-yellow-100">
        <p>Debug: widgetLoaded={String(widgetLoaded)}, loadError={loadError}</p>
      </div>
      
      {widgetLoaded ? (
        <div className="bg-green-100 p-2 h-full">
          <p className="text-xs mb-2">🔴 TESTING met tijdelijke credentials:</p>
          <div className="border-2 border-red-500 h-96 relative">
            <langflow-chat
              host_url="https://langflow-ogonline-v2-u36305.vm.elestio.app"
              flow_id="62f396d2-3e45-4265-b10c-b18a63cd2b07"
              api_key="sk-bjc2tlJcQqNE4YmnzotJfsdM35q_OjgT_U_SUgYYpIc"
              start_open="true"
              chat_window_style={chatWindowStyle}
              bot_message_style={botMessageStyle}
              user_message_style={userMessageStyle}
              input_style={inputStyle}
              chat_trigger_style={chatTriggerStyle}
              window_title=""
              tweaks="{}"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                border: '2px solid blue'
              }}
            />
          </div>
          <div className="mt-2 text-xs">
            <p>⚠️ Met echte credentials - zou nu moeten werken!</p>
            <p>🔒 In productie: gebruik Supabase secrets</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-blue-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading Langflow widget...</p>
            <p className="text-xs text-muted-foreground mt-2">State: {loadError || "initializing"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangflowChat;