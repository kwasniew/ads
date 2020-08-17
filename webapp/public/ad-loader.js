"use strict";

function loadAds(selector, adServingAPI) {
    document.querySelectorAll(selector).forEach(function (a) {
        var adId = a.dataset && a.dataset.ad;
        fetch(adServingAPI + adId).then(function (res) {
            if (res.status === 200) {
                return res.json();
            } else {
                return Promise.reject("Couldn't load the ad. Status code: " + res.status);
            }
        }).then(function (data) {
            a.setAttribute("href", data.ad);
            a.text = data.ad;
        }).catch(console.error);
    });
}
