function untagPhoto() {
  reportLink().get(0).click(); // can't just use click()
  waitFor(checkbox, function() {
    checkbox().click();
    submitButton().click();
    waitFor(closeButton, function() {
      closeButton().click();
      nextLink().click();
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
  return reportLink().length > 0 && $(".fbPhotoRemoveFromProfileLink:visible").length > 0;
}

// elements

function reportLink() {
  return $("a[href^='/ajax/report.php']:visible");
}

function photoActions() {
  return $(".fbPhotosPhotoActions:visible");
}

function checkbox() {
  return $("input[name=untag]:visible");
}

function submitButton() {
  return checkbox().closest("form").find("input[type=submit]:visible");
}

function closeButton() {
  return $(".layerCancel.uiOverlayButton.uiButtonConfirm:visible");
}

function nextLink() {
  return $("a.photoPageNextNav:visible");
}

// helpers

function waitFor(eleFunc, callback) {
  var timer = setInterval( function() {
    if (eleFunc().length > 0) {
      clearInterval(timer);
      callback();
    }
  }, 50);
}

// messaging

setInterval( function() {
  var show = photoPage() && !lightboxActive() && canUntag();
  chrome.extension.sendMessage({tagkick: true, show: show}, function(response) {
    if (response.clicked) {
      untagPhoto();
    }
  });
}, 50);
