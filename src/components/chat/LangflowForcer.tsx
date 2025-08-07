import { useEffect } from 'react';

// Aggressive background color forcer for Langflow widget
export const LangflowForcer = () => {
  useEffect(() => {
    const forceBackgroundColor = () => {
      // Find all langflow-chat elements
      const widgets = document.querySelectorAll('langflow-chat');
      
      widgets.forEach(widget => {
        // Force background on main widget
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
        }
        
        // Force background on ALL child elements - no exceptions
        const allChildren = widget.querySelectorAll('*');
        allChildren.forEach(child => {
          if (child instanceof HTMLElement) {
            // Force background on EVERY element
            child.style.setProperty('background', '#FDF6F0', 'important');
            child.style.setProperty('background-color', '#FDF6F0', 'important');
            child.style.setProperty('background-image', 'none', 'important');
            
            // Special targeting for text elements that might be headers
            const text = child.textContent?.toLowerCase() || '';
            if (text.includes('reply') || text.includes('soon') || text.includes('can') || 
                text.includes('help') || text.includes('message') || text.includes('chat')) {
              child.style.setProperty('background', '#FDF6F0', 'important');
              child.style.setProperty('background-color', '#FDF6F0', 'important');
              child.style.setProperty('color', '#1f2937', 'important');
            }
          }
        });
      });
    };

    // Force immediately
    forceBackgroundColor();
    
    // Force after widget loads
    const intervals = [100, 500, 1000, 2000];
    const timeouts = intervals.map(delay => 
      setTimeout(forceBackgroundColor, delay)
    );
    
    // Also watch for DOM changes
    const observer = new MutationObserver(forceBackgroundColor);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
};