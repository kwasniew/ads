# Testing strategy for the Ad Tracker

Date: 2020-08-17

## Context

Choose the right kind of tests to get the best ROI in a short time frame I have.

## Decision

Note: I'm using terminology from https://martinfowler.com/articles/microservice-testing/#conclusion-summary.

I choose to write:
* unit test for the `inMemoryEventRepository.js` - there's lots of lodash transformations there
* integration test for the `influxEventRepository.js` - I want to test my insert and query against a
real database to see if I got the query language syntax right
* component test in `appTest.js` - I want to test happy path and unhappy path for the entire app.
Due to testable architecture I can swap repository to inMemory one, so the test is instant.
I decided to build a mini DSL for load/click events so the test reads more like high level spec.

According to common closure principle, I decided to keep code and tests close together as they change together. 