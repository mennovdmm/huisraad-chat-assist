import React, { useEffect } from "react";

const LangflowLoader: React.FC = () => {
  useEffect(() => {
    // Officiële Langflow widget CDN URLs (in volgorde van prioriteit)
    const scriptSources = [
      'https://cdn.jsdelivr.net/gh/langflow-ai/langflow-embedded-chat@main/dist/build/static/js/bundle.min.js',
      'https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js',
      'https://unpkg.com/langflow-embedded-chat@latest/dist/build/static/js/bundle.min.js'
    ];

    if (!document.querySelector('script[src*="langflow-embedded-chat"]')) {
      const script = document.createElement('script');
      script.src = scriptSources[0]; // Start with first priority
      script.async = true;
      
      script.onerror = () => {
        // Try next source on error
        script.remove();
        if (scriptSources[1]) {
          const fallbackScript = document.createElement('script');
          fallbackScript.src = scriptSources[1];
          fallbackScript.async = true;
          document.head.appendChild(fallbackScript);
        }
      };
      
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default LangflowLoader;