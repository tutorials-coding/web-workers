import dedicatedWorkerUrl from "worker-plugin/loader!./workers/get-nth-fibonacci-number.worker.js";
import { getNthFobonacciNumber } from "./helpers/get-nth-fibonacci-number";
import { initWorker, initWorkerFn } from "./promisified-worker";

import { initFibonacciSharedWorker } from "./init-fibonacci-shared-worker";
import { initFibonacciDedicatedWorker } from "./init-fibonacci-dedicated-worker";

import { button, input, result } from "./elements";
import "./styles/style.scss";

// Shared worker
const sharedWorker = initFibonacciSharedWorker(
  (data) => {
    result.innerHTML = JSON.stringify(data, null, 2);
  },
  (errorMessage) => {
    result.innerHTML = errorMessage;
  }
);

// Dedicated worker
const dedicatedWorker = initFibonacciDedicatedWorker(
  (data) => {
    result.innerHTML = data;
  },
  (errorMessage) => {
    result.innerHTML = errorMessage;
  }
);

// promisified

const runPromisifiedWorker = initWorker(dedicatedWorkerUrl);

const runPromisifiedWorkerFn = initWorkerFn(getNthFobonacciNumber);

// app
let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

button.addEventListener("click", (e) => {
  result.innerHTML = "processing...";

  // sharedWorker.port.postMessage(n);

  // dedicatedWorker.postMessage(n);

  runPromisifiedWorker(n)
    .then((value) => {
      result.innerHTML = value;
    })
    .catch((errorMessage) => {
      result.innerHTML = errorMessage;
    });

  // runPromisifiedWorkerFn(n)
  //   .then((value) => {
  //     result.innerHTML = value;
  //   })
  //   .catch((errorMessage) => {
  //     result.innerHTML = errorMessage;
  //   });
});
