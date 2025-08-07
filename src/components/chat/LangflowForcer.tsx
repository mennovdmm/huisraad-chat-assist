import { useEffect } from 'react';

// Persistent DOM watcher for Langflow widget
export const LangflowForcer = () => {
  useEffect(() => {
    let observerCount = 0;
    
    const inspectAndForce = () => {
      const widgets = document.querySelectorAll('langflow-chat');
      
      widgets.forEach((widget, index) => {
        // Force background on main widget always
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
        }
        
        // Check for any children that might have appeared
        const allChildren = widget.querySelectorAll('*');
        if (allChildren.length > 0) {
          console.log(`🎯 FOUND ${allChildren.length} elements in widget ${index}!`);
          
          allChildren.forEach((child, childIndex) => {
            if (child instanceof HTMLElement) {
              if (childIndex < 15) {
                console.log(`Element ${childIndex}:`, {
                  tag: child.tagName,
                  classes: child.className,
                  text: child.textContent?.substring(0, 60),
                  bg: window.getComputedStyle(child).backgroundColor,
                  display: window.getComputedStyle(child).display
                });
              }
              
              // Force background on ALL elements
              child.style.setProperty('background', '#FDF6F0', 'important');
              child.style.setProperty('background-color', '#FDF6F0', 'important');
              child.style.setProperty('background-image', 'none', 'important');
            }
          });
        }
      });
    };

    // Immediate check
    inspectAndForce();

    // Create a mutation observer to watch for ANY DOM changes
    const observer = new MutationObserver((mutations) => {
      observerCount++;
      let hasChanges = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check if it's inside a langflow-chat element
              const parentWidget = element.closest('langflow-chat');
              if (parentWidget) {
                hasChanges = true;
                console.log(`🔥 NEW ELEMENT ADDED (${observerCount}):`, {
                  tag: element.tagName,
                  classes: element.className,
                  text: element.textContent?.substring(0, 60),
                  parent: element.parentElement?.tagName
                });
                
                // Force background immediately
                if (element instanceof HTMLElement) {
                  element.style.setProperty('background', '#FDF6F0', 'important');
                  element.style.setProperty('background-color', '#FDF6F0', 'important');
                  
                  // Also force all children
                  const children = element.querySelectorAll('*');
                  children.forEach(child => {
                    if (child instanceof HTMLElement) {
                      child.style.setProperty('background', '#FDF6F0', 'important');
                      child.style.setProperty('background-color', '#FDF6F0', 'important');
                    }
                  });
                }
              }
            }
          });
        }
        
        // Also watch for style changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as Element;
          const parentWidget = target.closest('langflow-chat');
          if (parentWidget && target instanceof HTMLElement) {
            target.style.setProperty('background', '#FDF6F0', 'important');
            target.style.setProperty('background-color', '#FDF6F0', 'important');
          }
        }
      });
      
      if (hasChanges) {
        // Run full inspection after new elements are added
        setTimeout(inspectAndForce, 100);
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also run periodic checks
    const intervals = [1000, 3000, 5000, 10000].map(delay => 
      setTimeout(() => {
        console.log(`🔄 Periodic check after ${delay}ms...`);
        inspectAndForce();
      }, delay)
    );

    console.log('🔍 Persistent Langflow watcher active');

    return () => {
      observer.disconnect();
      intervals.forEach(clearTimeout);
    };
  }, []);

  return null;
};