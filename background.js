let checkedUrls = new Set();


chrome.webNavigation.onCompleted.addListener(function(details) {
  if (!checkedUrls.has(details.url)) {
    chrome.tabs.sendMessage(details.tabId, { action: "checkPhishing", url: details.url });
  }
}, { url: [{ urlMatches: '.*' }] });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "showAlert") {
    checkedUrls.add(request.url);
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Hackathon Extension',
      message: request.message,
      buttons: [{ title: "Close Tab" }],
      requireInteraction: true
    });

    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
      if (buttonIndex === 0) {
        chrome.tabs.remove(sender.tab.id);
      }
    });
  }
});
