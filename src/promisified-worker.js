const initWorker = (stringUrl) => {
  return (data) => {
    const worker = new Worker(stringUrl);
    return new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        worker.terminate();
        resolve(event.data);
      };
      worker.onerror = (error) => {
        worker.terminate();
        reject(error.message);
      };
      worker.postMessage(data);
    });
  };
};

const initWorkerFn = (fn) => {
  const workerHandler = (fn) => {
    onmessage = (event) => {
      postMessage(fn(event.data));
    };
  };
  return (data) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
    );
    return new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        worker.terminate();
        resolve(event.data);
      };
      worker.onerror = (error) => {
        worker.terminate();
        reject(error.message);
      };
      worker.postMessage(data);
    });
  };
};

export { initWorker, initWorkerFn };
