import React, { useEffect } from "react";

const LangflowLoader: React.FC = () => {
  useEffect(() => {
    // Verbeterde Langflow widget loader met betere fallback
    const scriptSources = [
      'https://cdn.jsdelivr.net/gh/langflow-ai/langflow-embedded-chat@main/dist/build/static/js/bundle.min.js',
      'https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js',
      'https://unpkg.com/langflow-embedded-chat@latest/dist/build/static/js/bundle.min.js'
    ];

    let currentIndex = 0;

    const loadScript = (index: number) => {
      if (index >= scriptSources.length) {
        console.error('Failed to load Langflow widget from all sources');
        return;
      }

      // Remove existing scripts first
      const existingScripts = document.querySelectorAll('script[src*="langflow-embedded-chat"]');
      existingScripts.forEach(script => script.remove());

      const script = document.createElement('script');
      script.src = scriptSources[index];
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log(`Langflow widget loaded successfully from source ${index + 1}`);
      };
      
      script.onerror = () => {
        console.warn(`Failed to load Langflow widget from source ${index + 1}, trying next...`);
        script.remove();
        loadScript(index + 1);
      };
      
      document.head.appendChild(script);
    };

    // Only load if not already present
    if (!document.querySelector('script[src*="langflow-embedded-chat"]')) {
      loadScript(0);
    }
  }, []);

  return null;
};

export default LangflowLoader;