
# Load Testing with k6 and Visualizing the Results

> This repository contains scripts for different types of load tests using [k6](https://k6.io/) and a guide on how to visualize the results using InfluxDB and New Relic.

## Scripts

- Smoke Test: `smoke_test.js`
- Load Test: `load_test.js`
- Stress Test: `stress_test.js`
- Soak Test: `soak_test.js`
- Spike Test: `spike_test.js`
- Breakpoint Test: `breakpoint_test.js`


## Running the Tests

1. Install k6 on your machine. You can download it from the [official website](https://k6.io/open-source/).

2. Run the desired test with the `k6 run` command. For example, to run the smoke test, use the following command:

```bash
./k6 run smoke_test.js
```

## Visualizing the Results

You can visualize the results of the tests using InfluxDB and New Relic.

1. Install and start InfluxDB.

2. Run the test and output the results to InfluxDB:

```bash
./k6 run --out influxdb=http://localhost:8086/myk6db smoke_test.js
```

3. Install and start New Relic.

4. Add the InfluxDB as a data source in New Relic.

5. Create a new dashboard in New Relic to visualize the test results.

6. Add a new panel to the dashboard and configure it to display the desired metrics.

> Please note that the steps to install and start InfluxDB and New Relic, and to add InfluxDB as a data source in New Relic, depend on your specific setup and are not included in this README. You can find detailed instructions in the official documentation of these tools.
