# Date storage

Date: 2020-08-17

## Context

Choose data storage model. We want to store the events, not just the current counter.
It allows to handle novel scenarios according to the new requriements. Storing just the current
counter looses valuable information. 

## Options
 
* document database e.g. MongoDB
* some RDMBS
* column store e.g. Cassandra
* time-series DB e.g. InfluxDB 

## Decision

My first idea was to use MongoDB (used by https://github.com/Countly/countly-server) or RDBMS (used by https://github.com/matomo-org/matomo) as a safe option and build a fast read-model for daily reports (CQRS).
I'm expecting that future requirements may involve weekly reports, yearly reports
or even any time range reports. I'd end up with too many read models. 
I felt like moving to a different storage model will make my job easier.

My second idea was to use a write-heavy optimized column store e.g. Cassandra. 
A quick prototype revealed I'd need more than a few hours to implement it.

Finally, I realised I'm dealing with the time-series data (stream of [time, event] tuples).
InfluxDB is the most popular time series DB and it can handle much more traffic 
than e.g. Mongo as long as your data fits the time-series model. It also has a much
simpler conceptual model than the column store.

