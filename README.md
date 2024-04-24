# k6-test
Different test cases using k6 performance scripts

## Commands most used

Run a single test:
```sh
k6 run tests\chapter_1\first-test.js
```
Enable debug mode:
```sh
k6 run --http-debug tests\chapter_3\http-get.js
```
Show more details in debug mode:
```sh
k6 run --http-debug="full" tests\chapter_3\http-get.js
```
Pass a URL parameter in command line:
```sh
k6 run -e BASE_URL=https://test-api.k6.io tests\chapter_4\env-var.js
```
Pass options parameters virtual users (v), duration (d) and iterations in command line:
```sh
k6 run tests\chapter_1\first-test.js -u 1 -d 10s -i 1
```
Run test to allow insecure requests:
```sh
k6 run tests\chapter_1\first-test.js --insecure-skip-tls-verify
```
Generate an output JSON file:
```sh
k6 run tests\chapter_1\first-test.js --summary-export=summary.json
```
Generate a more detailed output JSON file:
```sh
k6 run tests\chapter_1\first-test.js --out json=full_results.json
```