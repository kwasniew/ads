# HTTP request preprocessing

Date: 2020-08-17

## Context

HTTP Events arrive from the browser. We need to change sendBeacon body to JSON from plain text.
We need to validate if event type is valid. We need to add IP address for InfluxDB to distinguish records.

## Solutions

* middleware (pipes and filters)

```js
  router.post(
    "/events",
    validateEvent,
    parseSendBeaconBody,
    addIP,
    recordEvent
  );
```

* decorator functions

```js
  router.post(
    "/events",
    validateEvent(parseSendBeaconBody(appIP(recordEvent)))
  );
```

## Decision

I go for middleware as it seems to be more idiomatic in Express.js.
