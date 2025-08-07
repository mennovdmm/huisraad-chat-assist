import React, { useEffect, useState } from "react";

const LangflowDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [widgetElement, setWidgetElement] = useState<HTMLElement | null>(null);

  const addDebug = (message: string) => {
    console.log(`🔍 LANGFLOW DEBUG: ${message}`);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebug("Starting Langflow debug session");
    
    const runDebug = async () => {
      // 1. Check if script loads
      addDebug("Checking script loading...");
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/langflow-embedded-chat@0.1.1/dist/build/static/js/bundle.min.js';
      
      script.onload = () => {
        addDebug("✅ Script loaded successfully");
        
        // 2. Check custom elements
        setTimeout(() => {
          const customElementExists = window.customElements?.get('langflow-chat');
          addDebug(`Custom element exists: ${!!customElementExists}`);
          
          if (customElementExists) {
            addDebug("✅ langflow-chat web component registered");
            
            // 3. Create and test widget element
            const testWidget = document.createElement('langflow-chat') as any;
            testWidget.setAttribute('host_url', 'https://langflow-ogonline-v2-u36305.vm.elestio.app');
            testWidget.setAttribute('flow_id', '62f396d2-3e45-4265-b10c-b18a63cd2b07');
            testWidget.setAttribute('api_key', 'sk-bjc2tlJcQqNE4YmnzotJfsdM35q_OjgT_U_SUgYYpIc');
            testWidget.setAttribute('start_open', 'true');
            
            addDebug("Created test widget element");
            
            // 4. Monitor widget for changes
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                  addDebug(`Widget DOM changed: ${mutation.addedNodes.length} nodes added`);
                }
                if (mutation.type === 'attributes') {
                  addDebug(`Widget attribute changed: ${mutation.attributeName}`);
                }
              });
            });
            
            observer.observe(testWidget, { 
              childList: true, 
              subtree: true, 
              attributes: true 
            });
            
            // 5. Check shadow DOM
            setTimeout(() => {
              if (testWidget.shadowRoot) {
                addDebug(`✅ Shadow DOM exists with ${testWidget.shadowRoot.children.length} children`);
                const shadowContent = testWidget.shadowRoot.innerHTML;
                addDebug(`Shadow DOM content length: ${shadowContent.length} chars`);
                
                if (shadowContent.length < 100) {
                  addDebug(`⚠️ Shadow DOM seems empty: ${shadowContent.substring(0, 200)}`);
                } else {
                  addDebug("✅ Shadow DOM has content");
                }
              } else {
                addDebug("❌ No shadow DOM found");
              }
              
              // 6. Check console for widget errors
              const originalError = console.error;
              console.error = (...args) => {
                if (args.some(arg => String(arg).toLowerCase().includes('langflow'))) {
                  addDebug(`🚨 Widget Error: ${args.join(' ')}`);
                }
                originalError.apply(console, args);
              };
              
            }, 2000);
            
            // 7. Add to DOM
            document.body.appendChild(testWidget);
            setWidgetElement(testWidget);
            addDebug("Widget added to DOM");
            
          } else {
            addDebug("❌ langflow-chat web component NOT registered");
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        addDebug(`❌ Script failed to load: ${error}`);
      };
      
      document.head.appendChild(script);
    };

    runDebug();

    return () => {
      if (widgetElement && widgetElement.parentNode) {
        widgetElement.parentNode.removeChild(widgetElement);
      }
    };
  }, []);

  return (
    <div className="p-6 bg-background border border-border rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔍 Langflow Widget Debugger</h2>
      
      <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto font-mono text-sm">
        {debugInfo.length === 0 ? (
          <p className="text-muted-foreground">Starting debug session...</p>
        ) : (
          debugInfo.map((info, index) => (
            <div key={index} className="mb-1">
              {info}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Dit script test alle aspecten van de Langflow widget loading.</p>
        <p>Check console voor extra details en errors.</p>
      </div>
    </div>
  );
};

export default LangflowDebugger;