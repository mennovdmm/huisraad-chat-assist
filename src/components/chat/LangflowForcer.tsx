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
        
        // Force background on all child elements
        const allChildren = widget.querySelectorAll('*');
        allChildren.forEach(child => {
          if (child instanceof HTMLElement) {
            const computedStyle = window.getComputedStyle(child);
            // Only override if element has a background
            if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                computedStyle.backgroundColor !== 'transparent') {
              child.style.setProperty('background', '#FDF6F0', 'important');
              child.style.setProperty('background-color', '#FDF6F0', 'important');
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