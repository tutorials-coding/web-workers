import { getNthFobonacciNumber } from "../helpers/get-nth-fibonacci-number";

let connectedTimes = 0;

// need to subscribe to connect
self.onconnect = function (e) {
  connectedTimes++;
  const port = e.ports[0];
  port.onmessage = function (e) {
    const num = e.data;
    if (Number.isInteger(parseInt(num))) {
      const result = getNthFobonacciNumber(num);
      port.postMessage({ connectedTimes, result });
    } else {
      port.postMessage("Is not a number");
      throw new Error("Is not a number");
    }
  };
  port.start(); // not necessary as onmessage is used
};
