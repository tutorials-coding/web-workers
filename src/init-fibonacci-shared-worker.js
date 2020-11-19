const initFibonacciSharedWorker = (onSuccess, onError) => {
  const sharedWorker = new SharedWorker(
    "./workers/get-nth-fibonacci-number.shared-worker.js",
    {
      name: "shared-worker-example",
      type: "module",
    }
  );
  sharedWorker.port.onmessage = function (event) {
    onSuccess(event.data);
  };
  sharedWorker.port.onerror = function (error) {
    onError(error.message);
    // console.error(e);
  };
  return sharedWorker;
};

export { initFibonacciSharedWorker };
