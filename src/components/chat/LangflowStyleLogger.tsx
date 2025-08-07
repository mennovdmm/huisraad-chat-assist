import React, { useEffect } from 'react';

const LangflowStyleLogger: React.FC = () => {
  useEffect(() => {
    console.log('🎨 LANGFLOW STYLE LOGGER ACTIVE');
    
    const checkWidget = () => {
      const widgets = document.querySelectorAll('langflow-chat');
      console.log(`📋 Found ${widgets.length} langflow-chat elements`);
      
      widgets.forEach((widget, index) => {
        console.log(`\n🔍 WIDGET ${index} INSPECTION:`);
        console.log('- Element:', widget);
        console.log('- Shadow Root:', widget.shadowRoot);
        console.log('- Style attribute:', widget.getAttribute('style'));
        console.log('- Computed style background:', getComputedStyle(widget).backgroundColor);
        
        // Check if shadow DOM exists
        if (widget.shadowRoot) {
          console.log('🌟 SHADOW DOM FOUND!');
          const allElements = widget.shadowRoot.querySelectorAll('*');
          console.log(`- Total elements in shadow: ${allElements.length}`);
          
          // Look for message containers
          const messageContainers = widget.shadowRoot.querySelectorAll('[class*="message"], [class*="chat"], [class*="container"], [class*="window"]');
          console.log(`- Message-related elements: ${messageContainers.length}`);
          
          messageContainers.forEach((el, i) => {
            console.log(`  📦 Element ${i}:`, {
              tagName: el.tagName,
              className: el.className,
              style: el.getAttribute('style'),
              computedBg: getComputedStyle(el).backgroundColor
            });
          });
          
          // Try to force background color via shadow DOM hack
          console.log('🔧 Attempting shadow DOM background hack...');
          const possibleTargets = [
            '.chat-window',
            '.messages',
            '.message-container',
            '.chat-container',
            '[class*="chat"]',
            '[class*="message"]'
          ];
          
          possibleTargets.forEach(selector => {
            const elements = widget.shadowRoot!.querySelectorAll(selector);
            if (elements.length > 0) {
              console.log(`✅ Found elements for selector ${selector}:`, elements.length);
              elements.forEach(el => {
                (el as HTMLElement).style.backgroundColor = '#FDF6F0';
                console.log(`🎯 Applied #FDF6F0 to element with selector ${selector}`);
              });
            }
          });
        } else {
          console.log('❌ No shadow DOM found');
        }
      });
    };

    // Check immediately
    setTimeout(checkWidget, 100);
    
    // Check periodically
    const interval = setInterval(checkWidget, 2000);
    
    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && (node as Element).tagName === 'LANGFLOW-CHAT') {
              console.log('🆕 New langflow-chat element detected!');
              setTimeout(checkWidget, 500);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default LangflowStyleLogger;