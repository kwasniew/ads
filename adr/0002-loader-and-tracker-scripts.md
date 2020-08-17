# Loader and tracker scripts

Date: 2020-08-17

## Context

Choose JS authoring style for writing ad-loader and ad-tracker.

## Decision

Write Vanilla ES5 so bundling/transpilation/other tooling is optional in development. 
Let Netlify bundle/minify JS before prod deployment.

Use polyfill.io to fetch missing browser APIs when needed.