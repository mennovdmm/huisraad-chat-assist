import { useEffect } from 'react';

// DOM Inspector + Background forcer for Langflow widget
export const LangflowForcer = () => {
  useEffect(() => {
    const inspectAndForce = () => {
      console.log('🔍 IFRAME & SHADOW DOM DETECTIVE...');
      
      // 1. Check for langflow-chat
      const widgets = document.querySelectorAll('langflow-chat');
      console.log('📋 langflow-chat elements found:', widgets.length);
      
      // 2. Check for iframes EVERYWHERE
      const allIframes = document.querySelectorAll('iframe');
      console.log('🖼️ Total iframes on page:', allIframes.length);
      
      allIframes.forEach((iframe, index) => {
        console.log(`Iframe ${index}:`, {
          src: iframe.src,
          width: iframe.width,
          height: iframe.height,
          classes: iframe.className,
          id: iframe.id,
          parent: iframe.parentElement?.tagName
        });
        
        // Try to access iframe content
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            console.log(`🎯 Iframe ${index} content accessible!`);
            const iframeElements = iframeDoc.querySelectorAll('*');
            console.log(`📊 Iframe ${index} has ${iframeElements.length} elements`);
            
            // Force background on iframe elements
            iframeElements.forEach(element => {
              if (element instanceof HTMLElement) {
                element.style.setProperty('background', '#FDF6F0', 'important');
                element.style.setProperty('background-color', '#FDF6F0', 'important');
              }
            });
          }
        } catch (e) {
          console.log(`❌ Iframe ${index} blocked by CORS:`, (e as Error).message);
        }
      });
      
      // 3. Check langflow-chat widgets
      widgets.forEach((widget, index) => {
        console.log(`\n🔍 Deep inspect widget ${index}:`);
        
        // Force background on main widget
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
        }
        
        // Try to access shadow root
        const shadowRoot = (widget as any).shadowRoot;
        console.log('Shadow DOM check:', !!shadowRoot);
        
        if (shadowRoot) {
          console.log('🎯 SHADOW DOM FOUND!');
          const shadowElements = shadowRoot.querySelectorAll('*');
          console.log(`📊 Found ${shadowElements.length} shadow elements`);
          
          shadowElements.forEach((shadowChild: Element, shadowIndex: number) => {
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
        
        // Look for nested iframes
        const nestedIframes = widget.querySelectorAll('iframe');
        console.log(`🖼️ Iframes inside widget ${index}:`, nestedIframes.length);
        
        nestedIframes.forEach((iframe, iframeIndex) => {
          console.log(`  Widget iframe ${iframeIndex}:`, {
            src: iframe.src,
            display: getComputedStyle(iframe).display,
            visibility: getComputedStyle(iframe).visibility
          });
        });
        
        // Regular DOM inspection
        const allChildren = widget.querySelectorAll('*');
        console.log(`📊 Found ${allChildren.length} regular child elements`);
        
        allChildren.forEach((child, childIndex) => {
          if (child instanceof HTMLElement) {
            if (childIndex < 10) {
              const computedBg = window.getComputedStyle(child).backgroundColor;
              console.log(`Child ${childIndex}:`, {
                tag: child.tagName,
                classes: child.className,
                text: child.textContent?.substring(0, 50),
                currentBg: computedBg
              });
            }
            
            child.style.setProperty('background', '#FDF6F0', 'important');
            child.style.setProperty('background-color', '#FDF6F0', 'important');
          }
        });
      });
      
      console.log('✅ Inspection complete');
    };

    console.log('🔍 Starting iframe/shadow DOM detection...');
    inspectAndForce();
    
    const timeouts = [1000, 2000, 3000].map(delay => 
      setTimeout(() => {
        console.log(`🔍 Re-inspecting after ${delay}ms...`);
        inspectAndForce();
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return null;
};