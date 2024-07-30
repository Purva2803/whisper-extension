// content.js
const widgetContainer = document.createElement('div');
widgetContainer.id = 'speech-to-text-enhancer-widget';
document.body.appendChild(widgetContainer);

const script = document.createElement('script');
script.src = chrome.runtime.getURL('bundle.js');
document.body.appendChild(script);
