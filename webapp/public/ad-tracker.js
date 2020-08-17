"use strict";

function trackAds(selector, trackerAPI) {
    var ads = document.querySelectorAll(selector);
    ads.forEach(function trackAdEvents(ad) {
        trackLoad(ad);
        trackClick(ad);
    })

    function send(eventType, ad) {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(trackerAPI, JSON.stringify(({
                type: eventType,
                ad: ad.getAttribute("href")
            })));
        } else {
            // we're assuming polyfill is provided (e.g. from polyfill.io) so no XHR impl here
        }

    }

    function trackLoad(a) {
        if (window.MutationObserver) {
            var observer = new MutationObserver(function registerMutations(mutationList) {
                mutationList.forEach(function handleMutation(mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName === "href") {
                        send("load", a);
                    }
                });
            });
            observer.observe(a, {attributes: true});
        }
    }

    function trackClick(a) {
        a.addEventListener("click", function handleClick() {
            // let the event propagate but send beacon
            if (a.getAttribute("href")) {
                send("click", a);
            }
        });
    }

}

