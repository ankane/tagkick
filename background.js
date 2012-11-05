var clicked = false;
function onClicked(tab) {
  clicked = true;
}

chrome.pageAction.onClicked.addListener(onClicked);

function onMessage(request, sender, sendResponse) {
  var response = {};

  if (request.tagkick) {
    var tabId = sender.tab.id;
    if (request.show) {
      chrome.pageAction.show(tabId);
    }
    else {
      chrome.pageAction.hide(tabId);
    }
    if (clicked) {
      clicked = false;
      response["clicked"] = true;
    }
  }

  sendResponse(response);
  return true;
}

chrome.extension.onMessage.addListener(onMessage);
