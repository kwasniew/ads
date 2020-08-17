# Validate event data

Date: 2020-08-17

## Context

We want to allow only whitelisted events 

## Options

* schema based validation (e.g. https://github.com/sideway/joi#readme)
* validation as a data structure (e.g. https://folktale.origamitower.com/api/v2.3.0/en/folktale.validation.html)
* manual validation

## Decision

I decided to go for manual validation to save time in the initial version of the app. As the code grows the first two options
will come in handy.

