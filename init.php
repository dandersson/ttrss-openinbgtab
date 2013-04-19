<?php
class OpenInBgTab extends Plugin {

    function about() {
        // Overly commented throughout as proof-of-concept in defining own 
        // functions and corresponding hotkeys and descriptions.

        // [version, description, author, is_system_plugin, link to more info]
        return [
            1.2,
            'Add hotkey to open links in background tab (Chrome/Opera only, TT-RSS >=1.7.6)',
            'dandersson',
            false,
            'https://github.com/dandersson/ttrss-openinbgtab');
    }

    function init($host) {
        // Boiler-plate to connect to TT-RSS instance and register hooks.
        $this->host = $host;

        $host->add_hook($host::HOOK_HOTKEY_MAP, $this);
        $host->add_hook($host::HOOK_HOTKEY_INFO, $this);
    }

    // `index.php` will scan for this function in all plugins and insert its 
    // return value inside the JS tag in the header.
    function get_js() {
        // The JS declarations are split into a separate file whose contents is 
        // returned.
        return file_get_contents(dirname(__FILE__) . '/openArticleInBackgroundTab.js');
    }

    function hook_hotkey_map($hotkeys) {
        // Use the new target "open_in_background_tab" to define your own 
        // hotkey to this function in other plugins.
        $hotkeys['*o'] = 'open_in_background_tab';

        return $hotkeys;
    }

    function hook_hotkey_info($hotkeys) {
        // Add info string to be shown in "Keyboard shortcuts help".

        // This can be used, but the clarification will be shown last in the 
        // "Article" section:
        //$hotkeys[__("Article")]["open_in_background_tab"] = __("Open in background tab (Chrome/Opera only)");

        // This will insert the description after "open_in_new_window" in the 
        // "Article" section. One might want to be able to use array_splice() 
        // for this, but as it says in the function docs
        // <http://se2.php.net/manual/en/function.array-splice.php>:
        // "Note that keys in replacement array are not preserved.", which 
        // makes it useless here.
        //
        // Instead I use `array_slice()` to concatenate original indices 
        // 0→[place of previous key], my entry and original indices [place of 
        // previous key]→[end] and return this.
        //
        // Using `array_search()` instead of a static offset from looking at 
        // the trunk file declarations will enable multiple plugins to add 
        // their descriptions without confusion along the way.
        //
        // Add 1 to `$offset` to add _after_ specified search key. Skip this to 
        // insert before.
        $offset = 1 + array_search('open_in_new_window', array_keys($hotkeys[__('Article')]));
        $hotkeys[__('Article')] =
            array_slice($hotkeys[__('Article')], 0, $offset, true) +
            array('open_in_background_tab' => __('Open in background tab (Chrome/Opera only)')) +
            array_slice($hotkeys[__('Article')], $offset, NULL, true);

        return $hotkeys;
    }
}
?>
