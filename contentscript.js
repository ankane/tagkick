function untagPhoto() {
  click(optionsButton());
  waitFor(reportLink, function() {
    click(reportLink());
    waitFor(checkbox, function() {
      checkbox().prop("checked", true);
      click(submitButton());
      waitFor(closeButton, function() {
        click(closeButton());
        click(nextLink());
      });
    });
  });
}

// page action conditions

function photoPage() {
  return window.location.pathname == "/photo.php";
}

function lightboxActive() {
  return lightbox().length > 0;
}

function canUntag() {
  return !owner() && $(".fbPhotoRemoveFromProfileLink:visible").length > 0;
}

function owner() {
  return $("a.editPhoto:visible").length > 0;
}

// elements

function lightbox() {
  return $("div.fbPhotoSnowlift:visible");
}

function optionsButton() {
  return lightbox().find("a.fbPhotoSnowliftDropdownButton");
}

function reportLink() {
  return lightbox().find("a[href^='/ajax/report.php']:visible");
}

function checkbox() {
  return $("input[name=untag]:visible");
}

function submitButton() {
  return checkbox().closest("form").find("input[type=submit]:visible");
}

function closeButton() {
  return $("div[role=dialog]:visible a.uiButtonConfirm[href=#]");
}

function nextLink() {
  return $("a.snowliftPager.next");
}

// helpers

function click(ele) {
  ele.get(0).click();
}

function waitFor(eleFunc, callback) {
  var timer = setInterval( function() {
    if (eleFunc().length > 0) {
      clearInterval(timer);
      // give events time to bind
      setTimeout( function() {
        callback();
      }, 50);
    }
  }, 50);
}

// messaging

setInterval( function() {
  var show = photoPage() && lightboxActive() && canUntag();
  chrome.extension.sendMessage({tagkick: true, show: show}, function(response) {
    if (response.clicked) {
      untagPhoto();
    }
  });
}, 50);
