module.exports = function (window) {
    "use strict";

    require('itags.core')(window);

    var pseudoName = 'reset', // <-- define your own pseudo-name here
        itagName = 'i-button#'+pseudoName, // <-- define your own itag-name here
        Event = window.ITSA.Event,
        Itag, IButton;

    if (!window.ITAGS[itagName]) {

        IButton = require('i-button')(window);

        Event.before(itagName+':manualfocus', function(e) {
            // the i-select itself is unfocussable, but its button is
            // we need to patch `manualfocus`,
            // which is emitted on node.focus()
            // a focus by userinteraction will always appear on the button itself
            // so we don't bother that
            var element = e.target;
            e.preventDefault();
            element.itagReady().then(
                function() {
                    var button = element.getElement('button');
                    button && button.focus(true);
                }
            );
        });

        Itag = IButton.pseudoClass(pseudoName);
        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
