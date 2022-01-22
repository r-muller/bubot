/* eslint-disable no-restricted-properties */
const { parentPort } = require('worker_threads');

let increment = 0;
while (increment !== Math.pow(10, 10)) {
  increment++;
}
const message = `Intensive CPU task is done ! Result is : ${increment}`;
parentPort.postMessage(message);
