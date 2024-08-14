chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "insertText") {
	  const inputs = document.querySelectorAll('input, input, textarea');
	  for (let input of inputs) {
		if (input.value === "") {
		  input.value = request.text;
		  input.dispatchEvent(new Event('input', { bubbles: true }));
		  break;
		}
	  }
	}
  });
  