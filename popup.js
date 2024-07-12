document.getElementById('record').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startRecording' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'transcription') {
    document.getElementById('transcription').value = request.text;
  }
});
