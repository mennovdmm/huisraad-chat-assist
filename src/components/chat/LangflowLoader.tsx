import React, { useEffect } from "react";

const LangflowLoader: React.FC = () => {
  useEffect(() => {
    // Simple script loader - no debugging interference
    if (!document.querySelector('script[src*="langflow-embedded-chat"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/langflow-embedded-chat@0.1.1/dist/build/static/js/bundle.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component only loads the script
};

export default LangflowLoader;