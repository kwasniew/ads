# Testable architecture in Ad Tracker

Date: 2020-08-17

## Context

Ad Tracker is dependent on date/time and database (non-testable deps). We want to test any part of the app
in any style we want (unit, integration, component etc.).

## Options

* DI frameworks (the "Spring" way)
* require mocking/overwriting (the "React" way)
* DI as a technique - passing args to functions

## Decision

I'm not a fan of DI frameworks (I share Greg Young's opinion on DI frameworks being too magical: https://www.infoq.com/presentations/8-lines-code-refactoring/).
I'm also not a fan of overwriting import/require/language internals.

I went for the 3rd approach.  Dependency Injections as "passing arguments to functions". Please check how router, controller, 
repository are all configurable by passing arguments. We never hardcode time or database.

`devTrackingModule.js` and `prodTrackingModule.js` show how to assemble a graph of objects as Lego blocks.

By default the app starts (`npm start`) with the in-memory/dev config so that a new person doesn't have to
have access to real database to get up and running.