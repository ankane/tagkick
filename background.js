function onClicked(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {});
}

chrome.pageAction.onClicked.addListener(onClicked);

function updatePageAction(tabId) {
  chrome.tabs.sendMessage(tabId, {is_content_script: true}, function(response) {
    if (response.is_content_script) {
      if (response.show) {
        chrome.pageAction.show(tabId);
      }
      else {
        chrome.pageAction.hide(tabId);
      }
    }
  });
};

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updatePageAction(tabId);
  }
});
