OpenInBgTab
===========
This [Tiny Tiny RSS](http://tt-rss.org/) plugin will register a new action that opens links in a background tab by using a JS "hack", simulating a Ctrl-click on a fictive link element. This currently works in Chrome and Opera, does not work in Firefox and is not tested in anything else.

Since this is the first plugin that uses the `HOOK_HOTKEY_INFO` hook, I've commented everything rigorously in case anyone wants a sample implementation of this functionality.

Requirements
------------
TT-RSS ≥1.7.6.

For TT-RSS ≤1.7.9, use v1.1 of this plugin since the TT-RSS plugin API changed slightly at that point (a single line in the plugin was removed and a backwards compatible `api_version()` function for future API version checks were added; would be easy to manually "backport" for that matter).

Upstream
--------
The project lives at <https://github.com/dandersson/ttrss-openinbgtab>.
