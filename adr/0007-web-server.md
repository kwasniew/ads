# Web Server for Ad Tracker

Date: 2020-08-17

## Context

Choose API web server 

## Decision

I'm using the one I'm most familiar with - express.js. It's very convenient, small and not very
opinionated. 
If we find the performance is too slow we can change it to native Node.js http server or something else later.
Note: I'm using Express 5.0 as it has proper async error handling without a need for extra npm module (e.g. https://www.npmjs.com/package/express-async-errors)