function onClicked(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {});
}

chrome.pageAction.onClicked.addListener(onClicked);

function onMessage(request, sender, sendResponse) {
  if (request.tagkick) {
    var tabId = sender.tab.id;
    if (request.show) {
      chrome.pageAction.show(tabId);
    }
    else {
      chrome.pageAction.hide(tabId);
    }
  }
  sendResponse({});
  return true;
}

chrome.extension.onMessage.addListener(onMessage);
