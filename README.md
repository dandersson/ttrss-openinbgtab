OpenInBgTab
===========
This [Tiny Tiny RSS](http://tt-rss.org/) plugin will register a new action that opens links in a background tab by using a JS "hack", simulating a Ctrl-click on a fictive link element. This currently works in Chrome and Opera, does not work in Firefox and is not tested in anything else. *Update:* It stopped working in the Google Chrome development channel somewhere around version 41.0.2224.3, released late 2014. The stable and beta channel will probably follow in closing this functionality, since it can be considered somewhat of a bug to begin with. *End update.*

Since this is the first plugin that uses the `HOOK_HOTKEY_INFO` hook, I've commented everything rigorously in case anyone wants a sample implementation of this functionality.

Some additional functionality was added that registers another action with corresponding hotkey that opens all unread articles in the current view in background tabs and marks them as read. In Chrome, this requires explicit permission to be given for the TT-RSS instance domain to open pop-ups whenever multiple tabs are to be opened. Until this permission is given, Chrome will hide the tabs under a "Blocked pop-up windows" icon in the address bar. Chrome will prompt regarding this when the hotkey is triggered and tries to open multiple tabs.

Requirements
------------
TT-RSS ≥1.7.6.

For TT-RSS ≤1.7.8, use v1.1 of this plugin since the TT-RSS plugin API changed slightly at that point (a single line in the plugin was removed and a backwards compatible `api_version()` function for future API version checks were added; would be easy to manually "backport" for that matter).

Upstream
--------
The project lives at <https://github.com/dandersson/ttrss-openinbgtab>.
