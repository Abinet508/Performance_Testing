import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 1000 }, // ramp up to 1000 users
        { duration: '5m', target: 1000 }, // stay at 1000 users for 5 minutes
        { duration: '2m', target: 0 }, // ramp down to 0 users
    ],
};

const BASE_URL = 'https://www.demoblaze.com/';

let myTrend = new Trend('waiting_time_K6');
let myRate = new Rate('failed_requests_K6');
let myCounter = new Counter('http_reqs_K6');
let myGauge = new Gauge('active_users_K6');

export function setup() {

  let res = http.get(BASE_URL);
  myTrend.add(res.timings.waiting);
  myCounter.add(1);
  myGauge.add(1);
  return res;
}

export default function (data) {
  let res = http.get(BASE_URL);
  myTrend.add(res.timings.waiting);
  myCounter.add(1);
  myRate.add(res.status !== 200);
  myGauge.add(1);
  sleep(1);
}

export function teardown(data) {
  myGauge.add(-1);
}