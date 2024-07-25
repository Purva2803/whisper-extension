
// content.js
let currentFocusedElement = null;

document.addEventListener('focus', (event) => {
  currentFocusedElement = event.target;
  console.log('Focused element:', currentFocusedElement);
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getFocusedElement') {
    console.log('Received getFocusedElement message');
    sendResponse({ element: currentFocusedElement ? getElementInfo(currentFocusedElement) : null });
  }
});

function getElementInfo(element) {
  return {
    tagName: element.tagName,
    id: element.id,
    name: element.name,
    className: element.className,
    type: element.type,
  };
}