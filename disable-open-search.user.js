// ==UserScript==
// @name         Disable Open Search
// @namespace    https://qoomon.github.io
// @version      1.1.1
// @updateURL    https://github.com/qoomon/userscript-disable-open-search/raw/main/disable-open-search.user.js
// @downloadURL  https://github.com/qoomon/userscript-disable-open-search/raw/main/disable-open-search.user.js
// @description  Prevents sites to add search engines to browser
// @author       Bengt
// @match        https://*/*
// @match        http://*/*
// @icon         https://img.icons8.com/fluency-systems-filled/64/search.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // see https://www.chromium.org/tab-to-search

    //  i in querySelector parameter means case-insesitive matching
    document.querySelectorAll('[type="application/opensearchdescription+xml" i]').forEach(e => e.remove());

    document.querySelectorAll('url[rel="suggestions" i]').forEach(e => e.remove());
})();
