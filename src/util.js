function hideBackButton() {
  $("#back-button").hide();
}


function hideSettingsButton() {
  $("#settings-button").hide();
}


function showBackButton(action) {
  hideSettingsButton();
  if (action) {
    $("#back-button").show().off('click').on('click', action);
  } else {
    $("#back-button").show();
  }
}


function showSettingsButton(action) {
  hideBackButton();
  if (action) {
    $("#settings-button").show().off('click').on('click', action);
  } else {
    $("#settings-button").show();
  }
}


function setHeader(text) { 
  if (!text) {
    $("#header > h1").text("Foxi");
    return;
  }
  $("#header > h1").text(text);
  $("#header").show();
}


function setSubheader(text) { 
  if (!text) {
    $("#app").removeClass("subheader-visible");
    return;
  }
  $("#subheader > h2").text(text);
  $("#app").addClass("subheader-visible");
}


// HANDLEBARS HELPERS ----------------------------------------------------------
function getImageUrl(img) {
  if (img.startsWith('image://')) {
    var src = decodeURIComponent(img.substr(8, img.length-9));
    if (src.startsWith('/')) {
      // TODO This really need to be more robust. More testing required to figure out
      // other strategies for loading images on the filesystem
      src = 'http://' + localStorage.cfg_host + ":8080/vfs/" + encodeURIComponent(src);
    }
    return src;
  }
  return null;
}


// LOGIC HELPERS ---------------------------------------------------------------
function timeToSecs(t) {
  return ((t.hours||0) * 3600) + ((t.minutes||0) * 60) + (t.seconds||0);
}


function freezeUI(selected) {
  $("#freeze-fg").show();
  $(selected).addClass("freeze-selected");
}

function unfreezeUI() {
  $(".freeze-selected").removeClass("freeze-selected");
  $("#freeze-fg").hide();
}


module.exports.hideBackButton = hideBackButton;
module.exports.hideSettingsButton = hideSettingsButton;
module.exports.showBackButton = showBackButton;
module.exports.showSettingsButton = showSettingsButton;
module.exports.setHeader = setHeader;
module.exports.setSubheader = setSubheader;
module.exports.getImageUrl = getImageUrl;
module.exports.timeToSecs = timeToSecs;
module.exports.freezeUI = freezeUI;
module.exports.unfreezeUI = unfreezeUI;
