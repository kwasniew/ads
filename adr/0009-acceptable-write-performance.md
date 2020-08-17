# Acceptable write performance

Date: 2020-08-17

## Context

Ad tracking app may expect huge inbound traffic.

## Decision

Move event tracking off the critical path.
`trackingController.js` invokes `eventRepository.store(event);` without waiting for the operation
to return. Also we're batching write requests in memory before we send them to the 
database over HTTP. One event = one HTTP call would degrade write performance.

I ran [clinic.js](https://clinicjs.org/) tests with in-memory and with real DB and they
seem to be comparable with batching enabled.

Memory
```
kwasniew@MacBook-Pro ad-tracker % clinic doctor --on-port 'autocannon -m POST -H "Content-Type: application/json" -b"{\"ad\":\"http://example.com\",\"type\":\"load\"}" localhost:$PORT/events' -- node src/server.js
Ad tracker listening on 3000
Running 10s test @ http://localhost:3000/events
10 connections

In memory:
┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 1 ms │ 1 ms │ 3 ms  │ 3 ms │ 1.19 ms │ 0.55 ms │ 17.48 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 4183   │ 4183   │ 6659   │ 6831   │ 6376.91 │ 748.39  │ 4180   │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 536 kB │ 536 kB │ 852 kB │ 874 kB │ 816 kB  │ 95.8 kB │ 535 kB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

70k requests in 11.03s, 8.98 MB read
```

Local InfluxDB
```
kwasniew@MacBook-Pro ad-tracker % NODE_ENV=production INFLUX_HOST=localhost INFLUX_BATCH=5000 clinic doctor --on-port 'autocannon -m POST -H "Content-Type: application/json" -b"{\"ad\":\"http://example.com\",\"type\":\"load\"}" localhost:$PORT/events' -- node src/server.js
Ad tracker listening on 3000
Running 10s test @ http://localhost:3000/events
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 1 ms │ 1 ms │ 3 ms  │ 3 ms │ 1.24 ms │ 0.92 ms │ 31.31 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev  │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼────────┼────────┤
│ Req/Sec   │ 4099   │ 4099   │ 6571   │ 6795   │ 6225.64 │ 801.2  │ 4097   │
├───────────┼────────┼────────┼────────┼────────┼─────────┼────────┼────────┤
│ Bytes/Sec │ 525 kB │ 525 kB │ 841 kB │ 870 kB │ 797 kB  │ 103 kB │ 524 kB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴────────┴────────┘

Req/Bytes counts sampled once per second.

68k requests in 11.04s, 8.77 MB read
```

