(function() {
  'use strict';
  
  let currentStep = 0;
  let tourData = null;
  let currentTooltip = null;
  
  // Get tour ID from script tag
  const script = document.currentScript || document.querySelector('script[data-tour-id]');
  const tourId = script ? script.getAttribute('data-tour-id') : null;
  
  if (!tourId) {
    console.error('Stride Widget: No tour-id provided');
    return;
  }
  
  // Fetch tour data
  async function fetchTourData() {
    try {
      const response = await fetch(`https://strideplatform.vercel.app/api/tours/${tourId}`);
      if (!response.ok) throw new Error('Tour not found');
      tourData = await response.json();
      startTour();
    } catch (error) {
      console.error('Stride Widget: Failed to load tour', error);
    }
  }
  
  function createTooltip(step) {
    const element = document.querySelector(step.selector);
    if (!element) {
      console.warn(`Stride Widget: Element not found for selector: ${step.selector}`);
      return null;
    }
    
    const tooltip = document.createElement('div');
    tooltip.innerHTML = `
      <div style="
        background: #1a1a1a; 
        color: white; 
        padding: 16px; 
        border-radius: 8px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
        max-width: 300px; 
        position: fixed; 
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${step.title}</h3>
        <p style="margin: 0 0 12px 0; font-size: 14px; color: #ccc;">${step.content}</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button onclick="window.StrideWidget.skip()" style="
            background: #333; 
            color: white; 
            border: none; 
            padding: 8px 12px; 
            border-radius: 4px; 
            cursor: pointer;
            font-size: 12px;
          ">Skip Tour</button>
          <button onclick="window.StrideWidget.next()" style="
            background: #d4b896; 
            color: black; 
            border: none; 
            padding: 8px 12px; 
            border-radius: 4px; 
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
          ">${currentStep === tourData.steps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    `;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipDiv = tooltip.firstElementChild;
    
    switch(step.position) {
      case 'top':
        tooltipDiv.style.left = rect.left + 'px';
        tooltipDiv.style.top = (rect.top - 10) + 'px';
        tooltipDiv.style.transform = 'translateY(-100%)';
        break;
      case 'bottom':
        tooltipDiv.style.left = rect.left + 'px';
        tooltipDiv.style.top = (rect.bottom + 10) + 'px';
        break;
      case 'left':
        tooltipDiv.style.left = (rect.left - 10) + 'px';
        tooltipDiv.style.top = rect.top + 'px';
        tooltipDiv.style.transform = 'translateX(-100%)';
        break;
      case 'right':
        tooltipDiv.style.left = (rect.right + 10) + 'px';
        tooltipDiv.style.top = rect.top + 'px';
        break;
      default:
        tooltipDiv.style.left = rect.left + 'px';
        tooltipDiv.style.top = (rect.bottom + 10) + 'px';
    }
    
    document.body.appendChild(tooltip);
    
    // Highlight target element
    element.style.outline = '2px solid #d4b896';
    element.style.outlineOffset = '2px';
    
    return tooltip;
  }
  
  function removeTooltip() {
    if (currentTooltip) {
      // Remove highlight
      const step = tourData.steps[currentStep];
      if (step) {
        const element = document.querySelector(step.selector);
        if (element) {
          element.style.outline = '';
          element.style.outlineOffset = '';
        }
      }
      
      currentTooltip.remove();
      currentTooltip = null;
    }
  }
  
  function startTour() {
    if (!tourData || !tourData.steps || tourData.steps.length === 0) {
      console.error('Stride Widget: No tour steps found');
      return;
    }
    
    currentStep = 0;
    showStep();
  }
  
  function showStep() {
    if (currentStep >= tourData.steps.length) {
      console.log('Stride Widget: Tour completed!');
      return;
    }
    
    removeTooltip();
    currentTooltip = createTooltip(tourData.steps[currentStep]);
  }
  
  function nextStep() {
    currentStep++;
    if (currentStep >= tourData.steps.length) {
      removeTooltip();
      console.log('Stride Widget: Tour completed!');
    } else {
      showStep();
    }
  }
  
  function skipTour() {
    removeTooltip();
    console.log('Stride Widget: Tour skipped');
  }
  
  // Global API
  window.StrideWidget = {
    next: nextStep,
    skip: skipTour,
    restart: startTour
  };
  
  // Auto-start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchTourData);
  } else {
    fetchTourData();
  }
})();
