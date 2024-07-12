// background.js
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'INSERT_TEXT', text: 'Hello from extension!' });
  });
  