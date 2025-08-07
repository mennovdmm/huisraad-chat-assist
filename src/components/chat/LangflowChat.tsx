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
    // Load widget via CDN script tag approach
    if (typeof window !== 'undefined') {
      const checkForWidget = () => {
        // Check if langflow-chat web component is available
        if (window.customElements && window.customElements.get('langflow-chat')) {
          setWidgetLoaded(true);
          return;
        }
        
        // If not available, show placeholder (ready for manual script loading)
        setLoadError("Widget ready for script loading");
      };

      checkForWidget();
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

  // Show placeholder until widget is properly configured
  if (loadError) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3">Langflow Integration Ready</h2>
          <p className="text-muted-foreground mb-6">
            De chat interface is geconfigureerd en klaar om te verbinden met je Langflow instance.
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Implementatie opties:</h3>
            
            <div className="space-y-4 text-sm text-left">
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium mb-2">Option 1: CDN Script (Recommended)</p>
                <code className="text-xs bg-muted p-2 rounded block text-muted-foreground">
                  {`<script src="https://cdn.jsdelivr.net/npm/langflow-embedded-chat@1.0.0/dist/build/static/js/bundle.min.js"></script>`}
                </code>
              </div>
              
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium mb-2">Option 2: Self-hosted</p>
                <p className="text-muted-foreground text-xs">
                  Download van GitHub en host lokaal
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">Configuratie klaar:</p>
            <ul className="text-left space-y-1 text-muted-foreground">
              <li>• Host URL: YOUR_LANGFLOW_HOST</li>
              <li>• Flow ID: YOUR_FLOW_ID</li>
              <li>• API Key: YOUR_API_KEY</li>
              <li>• Styling: Volledig geconfigureerd</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Render widget when loaded and configured
  return (
    <div className="langflow-container h-full w-full">
      {widgetLoaded ? (
        <langflow-chat
          host_url="YOUR_LANGFLOW_HOST"
          flow_id="YOUR_FLOW_ID"
          api_key="YOUR_API_KEY"
          start_open="true"
          chat_window_style={chatWindowStyle}
          bot_message_style={botMessageStyle}
          user_message_style={userMessageStyle}
          input_style={inputStyle}
          chat_trigger_style={chatTriggerStyle}
          window_title=""
          tweaks="{}"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default LangflowChat;