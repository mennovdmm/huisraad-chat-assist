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
    // Only attempt to load if in browser environment
    if (typeof window !== 'undefined') {
      // Dynamic import with proper error handling
      const loadWidget = async () => {
        try {
          await import("langflow-chat");
          setWidgetLoaded(true);
        } catch (error) {
          console.warn("Langflow widget not available:", error);
          setLoadError("Widget package not found - ready for configuration");
        }
      };

      loadWidget();
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
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3">Langflow Integration Ready</h2>
          <p className="text-muted-foreground mb-4">
            The chat interface is configured and ready to connect to your Langflow instance.
          </p>
          <div className="bg-muted/30 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">Next steps:</p>
            <ul className="text-left space-y-1 text-muted-foreground">
              <li>• Configure host_url</li>
              <li>• Add flow_id</li>
              <li>• Set api_key</li>
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