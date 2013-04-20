// Similar in form to trunk "open_in_new_window" action.
hotkey_actions['open_in_background_tab'] = function() {
  if (getActiveArticleId()) {
    openArticleInBackgroundTab(getActiveArticleId());
    return;
  }
};

// Function to simulate Ctrl+left-click. Works in Chrome/Opera, does not work
// in Firefox, not tested in other browsers.
function openArticleInBackgroundTab(id) {
  var a = document.createElement('a');
  // Target needed to work with links implementing anchors.
  a.target = '_blank';
  a.href = 'backend.php?op=article&method=redirect&id=' + id;
  var evt = document.createEvent('MouseEvents');
  // <https://developer.mozilla.org/en/docs/DOM/event.initMouseEvent>
  evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false,
                     false, false, 0, null);
  a.dispatchEvent(evt);
}
