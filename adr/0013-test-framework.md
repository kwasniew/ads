# Test framework

Date: 2020-08-17

## Context

We want to safely add features in a dynamically typed language.

## Solutions

* Option 1: jest - very popular test framework with test runner/test reporter/mocking library/test coverage built-in.
Very slow startup time and impossible to run all unit tests in less than 100ms.
Also I don't need a mocking library in JS because language itself is malleable enough to create manual test doubles when needed.
All those batteries included that I don't need make for unnecessary bytes of dependencies (e.g. it brings babel).

* Option 2: tape - minimalistic test runner built with Unix philosophy in mind
I like its no-magic approach with plain JS files and no special test command needed. Clean start is very fast.
Very barebones (no beforeEach, have to pipe output to test reporter).

* Option 3: mocha - very popular test runner and test reporter.
Fast startup time, relatively small and just enough batteries included. My IDE (WebStorm) has nice diffing support
for mocha failures. It has native ESM support so I can switch to `type=module` in Node.js w/o transpilation.
I don't like magic describe and it functions that require special command to run tests.

## Decision

I go for Option 3 - mocha as a nice balance between speed, simplicity and convenience.
