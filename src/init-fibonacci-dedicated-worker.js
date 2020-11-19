const initFibonacciDedicatedWorker = (onSuccess, onError) => {
  const worker = new Worker("./workers/get-nth-fibonacci-number.worker.js", {
    type: "module",
  });
  worker.onmessage = (e) => {
    onSuccess(event.data);
  };
  worker.onerror = (e) => {
    onError(error.message);
    // console.error(e);
  };
  return worker;
};

export { initFibonacciDedicatedWorker };
