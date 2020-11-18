import "./styles/style.scss";

const btn = document.getElementById("calc-btn");
const input = document.getElementById("nth-input");
const result = document.getElementById("result-el");

const worker = new Worker("./workers/get-nth-fibonacci-number.worker.js", {
  type: "module",
});
worker.addEventListener("message", (e) => {
  result.innerHTML = e.data;
});
worker.addEventListener("error", (e) => {
  result.innerHTML = `message: ${e.message}; filename: ${e.filename}; line: ${e.lineno}`;
  console.error(e);
});

let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

btn.addEventListener("click", (e) => {
  result.innerHTML = "processing...";
  worker.postMessage(n);
});
