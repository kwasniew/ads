# Testable time in Ad Tracker

Date: 2020-08-17

## Context

Ad Tracker is dependent on time. We want to enable easy time-travelling e.g. for testing events from any day.


## Decision

I'm using a **clock pattern**. In the `src/shared` directory you'll find `clock.js` and `fixedClock.js`. Two
clock implementations that can be used interchangeably. 

`clock.js` is a wrapper around `new Date()`. As a rule of thumb you should not have more than one invocation of `new Date()`
in a testable system. The only `new Date()` that we have is in the `clock.js` implementation.

`fixedClock.js` is a clock implementation that allows for time-travelling. Inject it in tests or if you want to simulate
a system working in the past. I'm using `date-fns` to manipulate time as std lib for time in Node.js
is very inconvenient.

Check `appTest`.js or `inMemoryEventRepositoryTest.js` to see this pattern in action.
