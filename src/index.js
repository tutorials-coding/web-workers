import "./styles/style.scss";

// Shared worker

const initSharedWorker = () => {
  const sharedWorker = new SharedWorker(
    "./workers/get-nth-fibonacci-number.shared-worker.js",
    {
      name: "Shared Worker Example",
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

// app

const btn = document.getElementById("calc-btn");
const input = document.getElementById("nth-input");
const result = document.getElementById("result-el");

let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

btn.addEventListener("click", (e) => {
  result.innerHTML = "processing...";
  // runSharedWorker(n);
  runWorker(n);
});
