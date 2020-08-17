# Ad tracker application architecture

Date: 2020-08-17

## Context

Choose architectural style for the ad tracker

## Decision

I decided to let the appropriate architectural style emerge from the code.
I ended up with a "boring" layered architecture as shown in the [diagram](diagrams/adtracker-coponent-diagram.jpg).

Router/controller talks to the repository which in turn wraps access to the underlying data storage.
There's not much business logic here so no need for DDD/aggregates/invariants modelling etc.

All the tracking code lives in the `tracking` directory. Shared/generic code is in the `shared` directory.
New bounded contexts will get their own top-level dirs as we did with tracking.

I don't like to distribute code into microservices too early. I'd evolve this app as
a modular monolith before deciding on a split. 

