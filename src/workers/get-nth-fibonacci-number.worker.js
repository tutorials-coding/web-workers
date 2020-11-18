import { getNthFobonacciNumber } from "../helpers/get-nth-fibonacci-number";

onmessage = function (e) {
  const num = e.data;
  if (Number.isInteger(parseInt(num))) {
    const result = getNthFobonacciNumber(num);
    postMessage(result);
  } else {
    throw new Error("Is not a number");
  }
};
