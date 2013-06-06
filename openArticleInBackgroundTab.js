// Similar in form to trunk "open_in_new_window" action.
hotkey_actions['open_in_background_tab'] = function() {
  if (getActiveArticleId()) {
    openArticleInBackgroundTab(getActiveArticleId());
    return;
  }
};

hotkey_actions['open_unread_in_background_tabs'] = function() {
  openUnreadArticlesInBackgroundTabs();
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

// Open all unread articles in the current view in background tabs. Nb: In
// Chrome this requires explicit allowance for the TT-RSS instance domain to
// open pop-up windows. Otherwise the windows will be "stuck" in the address
// bar beneath a "blocked pop-up windows" icon. Chrome will prompt for this
// every time the hotkey is triggered and tries to open multiple tabs.
function openUnreadArticlesInBackgroundTabs() {
  try {
    // Get all items in the current view.
    var children = $$('#headlines-frame > div[id*=RROW]');
    children.each(function(child) {
        if (child.hasClassName('Unread')) {
          // Remove prepended string 'RROW-' to get numeric ID.
          var id = child.id.slice(5);
          openArticleInBackgroundTab(id);
          // Add ID to a postponed "Mark as read" multicall to save DB
          // interaction.
          catchup_id_batch.push(id);
        }
      }
    );

    if (catchup_id_batch.length > 0) {
      // If there is a unread update scheduled, remove it.
      window.clearTimeout(catchup_timeout_id);
      // Unless an update action is currently running…
      if (!_infscroll_request_sent) {
        // …schedule a new one.
        catchup_timeout_id = window.setTimeout(
          function() {catchupBatchedArticles();},
          500);
      }
    }
  } catch (e) {
    exception_error('openUnreadArticlesInBackgroundTabs', e);
  }
}
