import { useEffect } from 'react';

// DOM Inspector + Background forcer for Langflow widget
export const LangflowForcer = () => {
  useEffect(() => {
    const inspectAndForce = () => {
      console.log('🔍 FULL DOM SEARCH - Looking for ANY elements...');
      
      // Check if langflow-chat exists at all
      const widgets = document.querySelectorAll('langflow-chat');
      console.log('📋 langflow-chat elements found:', widgets.length);
      
      if (widgets.length === 0) {
        console.log('❌ NO langflow-chat elements found!');
        return;
      }

      widgets.forEach((widget, index) => {
        console.log(`\n📋 Widget ${index + 1} DOM Structure:`);
        console.log('Main widget:', widget.tagName, widget.className, widget.id);
        
        // Force background on main widget
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
          console.log('✅ Forced main widget background');
        }
        
        // Look for Shadow DOM
        if (widget.shadowRoot) {
          console.log('🎯 SHADOW DOM FOUND!');
          const shadowElements = widget.shadowRoot.querySelectorAll('*');
          console.log(`📊 Found ${shadowElements.length} shadow elements`);
          
          shadowElements.forEach((shadowChild, shadowIndex) => {
            if (shadowChild instanceof HTMLElement) {
              if (shadowIndex < 10) {
                console.log(`Shadow ${shadowIndex}:`, {
                  tag: shadowChild.tagName,
                  classes: shadowChild.className,
                  text: shadowChild.textContent?.substring(0, 50)
                });
              }
              shadowChild.style.setProperty('background', '#FDF6F0', 'important');
              shadowChild.style.setProperty('background-color', '#FDF6F0', 'important');
            }
          });
        }
        
        // Regular DOM inspection
        const allChildren = widget.querySelectorAll('*');
        console.log(`📊 Found ${allChildren.length} regular child elements`);
        
        if (allChildren.length === 0) {
          console.log('⚠️ No child elements found - widget might be loading dynamically');
          
          // Try to find elements by common patterns
          setTimeout(() => {
            const laterChildren = widget.querySelectorAll('*');
            console.log(`🔄 After delay: Found ${laterChildren.length} child elements`);
            
            laterChildren.forEach((child, childIndex) => {
              if (child instanceof HTMLElement && childIndex < 10) {
                console.log(`Late Child ${childIndex}:`, {
                  tag: child.tagName,
                  classes: child.className,
                  text: child.textContent?.substring(0, 50),
                  bg: window.getComputedStyle(child).backgroundColor
                });
                
                child.style.setProperty('background', '#FDF6F0', 'important');
                child.style.setProperty('background-color', '#FDF6F0', 'important');
              }
            });
          }, 1000);
        }
        
        allChildren.forEach((child, childIndex) => {
          if (child instanceof HTMLElement) {
            // Log first 10 elements to see structure
            if (childIndex < 10) {
              const computedBg = window.getComputedStyle(child).backgroundColor;
              console.log(`Child ${childIndex}:`, {
                tag: child.tagName,
                classes: child.className,
                id: child.id,
                text: child.textContent?.substring(0, 50),
                currentBg: computedBg
              });
            }
            
            // Force background on EVERY element
            child.style.setProperty('background', '#FDF6F0', 'important');
            child.style.setProperty('background-color', '#FDF6F0', 'important');
            child.style.setProperty('background-image', 'none', 'important');
          }
        });
        
        console.log('✅ Forced all backgrounds');
      });
    };

    // Inspect multiple times to catch dynamic loading
    console.log('🔍 Starting enhanced Langflow DOM inspection...');
    inspectAndForce();
    
    const timeouts = [500, 1000, 2000, 3000, 5000].map(delay => 
      setTimeout(() => {
        console.log(`🔍 Re-inspecting after ${delay}ms...`);
        inspectAndForce();
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return null;
};