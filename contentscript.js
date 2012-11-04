function untagPhoto() {
  click(reportLink());
  waitFor(checkbox, function() {
    click(checkbox());
    click(submitButton());
    waitFor(closeButton, function() {
      click(closeButton());
      click(nextLink());
    });
  });
}

// page action conditions

function photoPage() {
  return window.location.pathname == "/photo.php";
}

function lightboxActive() {
  return $("._3qw").length > 0;
}

function canUntag() {
  return reportLink().length > 0 && $(".fbPhotoRemoveFromProfileLink").length > 0;
}

// elements

function reportLink() {
  return $("a[href^='/ajax/report.php']:visible");
}

function photoActions() {
  return $(".fbPhotosPhotoActions");
}

function checkbox() {
  return $("input[name=untag]:visible");
}

function submitButton() {
  return checkbox().closest("form").find("input[type=submit]:visible");
}

function closeButton() {
  return $(".uiOverlayButton");
}

function nextLink() {
  return $("a.photoPageNextNav");
}

// helpers

function click(ele) {
  ele.get(0).click();
}

function waitFor(eleFunc, callback) {
  var timer = setInterval( function() {
    if (eleFunc().length > 0) {
      clearInterval(timer);
      callback();
    }
  }, 50);
}

// messaging

function onMessage(request, sender, sendResponse) {
  if (request.is_content_script) {
    waitFor(photoActions, function() {
      var show = photoPage() && !lightboxActive() && canUntag();
      sendResponse({"is_content_script": true, "show": show});
    });
  }
  else { // button clicked
    untagPhoto();
    sendResponse({});
  }
  return true;
};

// Listen for the content script to send a message to the background page.
chrome.extension.onMessage.addListener(onMessage);
