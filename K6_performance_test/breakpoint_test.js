import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 10 }, // ramp up to 10 users
        { duration: '5m', target: 10 }, // stay at 10 users for 5 minutes
        { duration: '2m', target: 20 }, // ramp up to 20 users
        { duration: '5m', target: 20 }, // stay at 20 users for 5 minutes
        // continue increasing the load in this way
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    },
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