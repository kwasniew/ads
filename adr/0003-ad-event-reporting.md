# Ad Event Reporting

Date: 2020-08-17

## Context

Track ad load and click events and send them to the Ad Tracking API

## Decision

* Ad click: `click` DOM event
* Ad load: `MutationObserver` waiting on the href attribute change
* Event sending: `sendBeacon` as a it allows for request queuing when someone navigates away to a different website 