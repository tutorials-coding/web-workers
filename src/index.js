import {
  initWorker as initPromisifiedWorker,
  initWorkerFn,
} from "./promisified-worker";

import { getNthFobonacciNumber } from "./helpers/get-nth-fibonacci-number";

import { button, input, result } from "./elements";
import "./styles/style.scss";

// Shared worker

const initSharedWorker = () => {
  const sharedWorker = new SharedWorker(
    "./workers/get-nth-fibonacci-number.shared-worker.js",
    {
      name: "shared-worker-example",
      type: "module",
    }
  );
  sharedWorker.port.onmessage = function (e) {
    result.innerHTML = JSON.stringify(e.data, null, 2);
  };
  sharedWorker.port.onerror = function (e) {
    result.innerHTML = `message: ${e.message}; filename: ${e.filename}; line: ${e.lineno}`;
    console.error(e);
  };
  return sharedWorker;
};

const sharedWorker = initSharedWorker();

const runSharedWorker = (n) => {
  sharedWorker.port.postMessage(n);
};

// Dedicated worker

const initWorker = (n) => {
  const worker = new Worker("./workers/get-nth-fibonacci-number.worker.js", {
    type: "module",
  });
  worker.onmessage = (e) => {
    result.innerHTML = e.data;
  };
  worker.onerror = (e) => {
    result.innerHTML = `message: ${e.message}; filename: ${e.filename}; line: ${e.lineno}`;
    console.error(e);
  };
  return worker;
};

const worker = initWorker();

const runWorker = (n) => {
  worker.postMessage(n);
};

// promisified

const runPromisifiedWorker = initPromisifiedWorker(
  "./workers/get-nth-fibonacci-number.worker.js"
);

const runPromisifiedWorkerFn = initWorkerFn(getNthFobonacciNumber);
// app

let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

button.addEventListener("click", (e) => {
  result.innerHTML = "processing...";
  // runSharedWorker(n);
  // runWorker(n);

  // runPromisifiedWorker(n)
  runPromisifiedWorkerFn(n)
    .then((value) => {
      result.innerHTML = value;
    })
    .catch((error) => {
      result.innerHTML = `message: ${error.message}; filename: ${error.filename}; line: ${error.lineno}`;
    });
});
