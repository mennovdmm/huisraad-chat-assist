import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'langflow-chat': any;
    }
  }
}

const LangflowChat: React.FC = () => {
  useEffect(() => {
    // Dynamically load the widget to prevent SSR issues
    import("langflow-chat-widget").catch((error) => {
      console.warn("Failed to load langflow-chat-widget:", error);
    });
  }, []);

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

  return (
    <div className="langflow-container h-full w-full">
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
    </div>
  );
};

export default LangflowChat;