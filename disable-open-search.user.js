// ==UserScript==
// @name         Disable Open Search
// @namespace    https://qoomon.github.io
// @version      1.2.0
// @updateURL    https://github.com/qoomon/userscript-disable-open-search/raw/main/disable-open-search.user.js
// @downloadURL  https://github.com/qoomon/userscript-disable-open-search/raw/main/disable-open-search.user.js
// @description  Prevents sites to add search engines to browser
// @author       Bengt
// @match        https://*/*
// @match        http://*/*
// @icon         https://img.icons8.com/fluency-systems-filled/64/search.png
// @grant        none
// ==/UserScript==

// notes
// i in querySelector parameter means case-insesitive matching


(function() {
    'use strict';
    // OpenSearch
    // see https://www.chromium.org/tab-to-search/
    [...document.querySelectorAll('link[rel="search"][type="application/opensearchdescription+xml" i]')]
        .forEach(e => e.removeAttribute('rel'));
    [...document.querySelectorAll('url[rel="suggestions" i]')]
        .forEach(e => e.removeAttribute('rel'));

    // Google Chrome Autodiscovery
    // see https://martin-thoma.com/search-engine-autodiscovery/#google-chrome-autodiscovery
    [...document.querySelectorAll('form')]
        .filter(form => form.method === 'get')
        .filter(form => {
            var actionProtcol = new URL(form.getAttribute('action') || '', location.href).protocol;
            return isAnyOf(actionProtcol, ['https:', 'http:']);
         })
        .filter(form => {
            const inputElements = [...form.querySelectorAll(':scope input')]
            if(inputElements
               .filter(input => !input.readOnly)
               .filter(input => isAnyOf(input.type, ['search', 'text']))
               .length !== 1) return false;
            if(inputElements
               .filter(input => isAnyOf(input.type ,['password', 'file', 'textarea']))
               .length > 0) return false;
            return true;
        })
        .forEach(form => {
            const spoiler = document.createElement('textarea');
            spoiler.style.display='none';
            form.appendChild(spoiler);
        });

     function isAnyOf(value, arr){ return arr.includes(value); };
})();
