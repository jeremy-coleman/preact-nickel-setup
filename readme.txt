# react nickel setup

`npm i` then `npm run start`
this will run rust api server and serve the web app with webpack

The rust main has to be in src/main.rs. Its really the only good option.

There is also a variant build using sucrase with hmr in the tools directory

# why nickel
rust backend benches:
https://github.com/the-benchmarker/web-frameworks
https://web-frameworks-benchmark.netlify.app/ (setup explanation)

Specifically, look at the average latency and sort the 512 concurrency column for average , P90, and P99, and P99.999 latency

https://web-frameworks-benchmark.netlify.app/result?metric=averageLatency
(the 0 columns are errors)

Most frameworks, including actix, experience increases in latency as concurrency increases.

They also have suprisingly high P90+ peaks. IE: at 512 concurrency, 1 in 10 requests will have a latency of 5 seconds!
Except nickel and iron.
Nickel has practically no lag, while iron has latency spikes as high as 1000ms.

code for nickel and iron
https://github.com/the-benchmarker/web-frameworks/blob/master/rust/iron/src/main.rs
https://github.com/the-benchmarker/web-frameworks/blob/master/rust/nickel/src/main.rs

The results are consistent over time.

I don't think it's unreasonable that a 8 core processor can handle 512 concurrent requests without having 5 seconds of lag.
Seriously, whatsapp was doing like 3 million connections per second 10 years ago on a single machine.
Why is Nickel the only framework that isn't performing awfully here?
Certainly actix and others are capable of being much faster, that's without question.
However, I don't know why and don't really care, because Nickel is fast and it has a nice express-like api.

I choose you Nickel! <3
https://github.com/nickel-org/nickel.rs



[notes on react hmr with v18]
https://github.com/babel/babel-loader
not working:
too many to list

working with warning:
sucrase alone using import { hot } from "react-hot-loader" but console warning

working with warning:
babel + @hot-loader/react-dom using import { hot } from "react-hot-loader" but console warning

working without warning:
current setup

[cargo workspace info]
https://doc.rust-lang.org/cargo/reference/manifest.html#the-workspace-field

[nickel]
https://github.com/nickel-org/nickel.rs
https://github.com/nickel-org
https://github.com/nickel-org/rust-mustache
https://github.com/nickel-org/cookies
https://github.com/nickel-org/session
https://github.com/nickel-org/nickel-postgres
https://github.com/nickel-org/session
https://github.com/SimonPersson/nickel-auth
https://github.com/flosse/nickel-sqlite
https://github.com/servo/rust-url

[see also]
https://github.com/async-graphql/examples
https://github.com/tokio-rs/axum/tree/main/examples

other notes:
tonic is the fastest single threaded grpc server
rust/tokio multithreaded is actually slow. its just a rewritten version of go's scheduler.
for multithreaded servers, lots of contenders including dotnet and scala akka

[dpdk for the brave]
https://elixir.bootlin.com/dpdk/v23.03/source
https://github.com/scylladb/seastar

[bytedance knows]
https://github.com/bytedance/monoio/blob/master/docs/en/benchmark.md
