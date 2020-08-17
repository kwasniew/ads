# Content Webapp Design

Date: 2020-08-17

## Context

Choose technology for a simple ad website with content, embeddable ads and mock ad provider.

## Decision

Static file server for content serving and mock ads serving.

Workflow:
* Write HTML page with embedded ad placeholders `<a data-ad="goodreads"></a>`. `data-ad` is the ad ID that will
be replaced with the actual ad content.
* Put ads in the public/ad directory. File name is the ad ID.
* `ad-loader.js` replaces data attributes with content
* `ad-tracker.js` sends ad events to the ad-tracker


In development I'm using `http-server` module. In production I'm using Netlify PaaS.

To make the app look nicer I'm using Tachyons CSS (functional CSS lib).
