import { useEffect } from 'react';

// Ultimate DOM detective - search EVERYWHERE for chat elements
export const LangflowForcer = () => {
  useEffect(() => {
    const fullDOMScan = () => {
      console.log('🕵️ ULTIMATE DOM SCAN - Looking for chat elements ANYWHERE...');
      
      // 1. Look for ANY element that might contain chat content
      const allElements = document.querySelectorAll('*');
      console.log(`📊 Scanning ${allElements.length} total elements on page...`);
      
      const chatCandidates: Element[] = [];
      
      allElements.forEach((element, index) => {
        const text = element.textContent?.toLowerCase() || '';
        const classes = element.className.toLowerCase();
        const tag = element.tagName.toLowerCase();
        
        // Look for elements that might be chat-related
        if (
          text.includes('message') || text.includes('chat') || text.includes('reply') ||
          text.includes('help') || text.includes('send') || text.includes('input') ||
          classes.includes('chat') || classes.includes('message') || classes.includes('widget') ||
          tag.includes('chat') || element.hasAttribute('placeholder')
        ) {
          chatCandidates.push(element);
        }
      });
      
      console.log(`🎯 Found ${chatCandidates.length} potential chat elements:`);
      
      chatCandidates.slice(0, 20).forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        console.log(`Candidate ${index}:`, {
          tag: element.tagName,
          classes: element.className,
          text: element.textContent?.substring(0, 80),
          bg: computedStyle.backgroundColor,
          display: computedStyle.display,
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          parent: element.parentElement?.tagName
        });
        
        // Force background on potential chat elements
        if (element instanceof HTMLElement) {
          element.style.setProperty('background', '#FDF6F0', 'important');
          element.style.setProperty('background-color', '#FDF6F0', 'important');
        }
      });
      
      // 2. Look specifically for form elements (input, textarea, button)
      const inputs = document.querySelectorAll('input, textarea, button');
      console.log(`🔤 Found ${inputs.length} input elements:`);
      
      inputs.forEach((input, index) => {
        if (index < 10) {
          const computedStyle = window.getComputedStyle(input);
          console.log(`Input ${index}:`, {
            type: input.getAttribute('type'),
            placeholder: input.getAttribute('placeholder'),
            value: (input as HTMLInputElement).value,
            classes: input.className,
            bg: computedStyle.backgroundColor,
            parent: input.parentElement?.tagName
          });
        }
        
        // Force background on inputs
        if (input instanceof HTMLElement) {
          input.style.setProperty('background', '#FDF6F0', 'important');
          input.style.setProperty('background-color', '#FDF6F0', 'important');
        }
      });
      
      // 3. Look for elements with specific styles that might be chat UI
      const styledElements = document.querySelectorAll('[style*="background"], [style*="position"]');
      console.log(`🎨 Found ${styledElements.length} styled elements`);
      
      Array.from(styledElements).slice(0, 10).forEach((element, index) => {
        console.log(`Styled ${index}:`, {
          tag: element.tagName,
          style: element.getAttribute('style'),
          classes: element.className,
          text: element.textContent?.substring(0, 50)
        });
        
        if (element instanceof HTMLElement) {
          element.style.setProperty('background', '#FDF6F0', 'important');
          element.style.setProperty('background-color', '#FDF6F0', 'important');
        }
      });
      
      // 4. Check langflow-chat again but differently
      const widgets = document.querySelectorAll('langflow-chat');
      widgets.forEach((widget, index) => {
        console.log(`🔍 Widget ${index} detailed check:`);
        console.log('- innerHTML:', widget.innerHTML.substring(0, 200));
        console.log('- outerHTML:', widget.outerHTML.substring(0, 300));
        console.log('- computedStyle:', {
          display: getComputedStyle(widget).display,
          position: getComputedStyle(widget).position,
          background: getComputedStyle(widget).backgroundColor
        });
        
        // Force styles on the widget itself
        if (widget instanceof HTMLElement) {
          widget.style.setProperty('background', '#FDF6F0', 'important');
          widget.style.setProperty('background-color', '#FDF6F0', 'important');
        }
      });
    };

    console.log('🔍 Starting ultimate DOM scan...');
    fullDOMScan();
    
    // Run scan multiple times
    const timeouts = [2000, 4000, 6000].map(delay => 
      setTimeout(() => {
        console.log(`🔄 Re-scanning after ${delay}ms...`);
        fullDOMScan();
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return null;
};