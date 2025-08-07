import { useEffect } from 'react';

// DOM Inspector + Background forcer for Langflow widget
export const LangflowForcer = () => {
  useEffect(() => {
    const inspectAndForce = () => {
      const widgets = document.querySelectorAll('langflow-chat');
      
      console.log('🔍 LANGFLOW DOM INSPECTOR:', widgets.length, 'widgets found');
      
      widgets.forEach((widget, index) => {
        console.log(`\n📋 Widget ${index + 1} DOM Structure:`);
        
        // Log main widget
        console.log('Main widget:', widget.tagName, widget.className, widget.id);
        
        // Force background on main widget
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
          console.log('✅ Forced main widget background');
        }
        
        // Inspect and force ALL child elements
        const allChildren = widget.querySelectorAll('*');
        console.log(`📊 Found ${allChildren.length} child elements`);
        
        allChildren.forEach((child, childIndex) => {
          if (child instanceof HTMLElement) {
            // Log first 20 elements to see structure
            if (childIndex < 20) {
              const computedBg = window.getComputedStyle(child).backgroundColor;
              console.log(`Child ${childIndex}:`, {
                tag: child.tagName,
                classes: child.className,
                id: child.id,
                text: child.textContent?.substring(0, 50),
                currentBg: computedBg,
                hasBackground: computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent'
              });
            }
            
            // Force background on EVERY element regardless
            child.style.setProperty('background', '#FDF6F0', 'important');
            child.style.setProperty('background-color', '#FDF6F0', 'important');
            child.style.setProperty('background-image', 'none', 'important');
            
            // Also try targeting potential problem elements
            if (child.tagName === 'DIV' || child.tagName === 'SECTION' || 
                child.tagName === 'MAIN' || child.tagName === 'ARTICLE') {
              child.style.setProperty('background', '#FDF6F0', 'important');
            }
          }
        });
        
        console.log('✅ Forced all child backgrounds');
      });
    };

    // Inspect multiple times to catch dynamic loading
    console.log('🔍 Starting Langflow DOM inspection...');
    inspectAndForce();
    
    const timeouts = [500, 1000, 2000, 3000].map(delay => 
      setTimeout(() => {
        console.log(`🔍 Re-inspecting after ${delay}ms...`);
        inspectAndForce();
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return null;
};