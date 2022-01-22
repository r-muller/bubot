const { Worker: WorkerThreads } = require('worker_threads');

class Worker {
  constructor(filepath = null) {
    if (!filepath) throw new TypeError('typeof filepath not must be null');
    if (typeof filepath !== 'string') throw new TypeError('typeof filepath must be a string');

    return new Promise((resolve, reject) => {
      const worker = new WorkerThreads(filepath);

      worker.on('online', () => { console.log('Launching intensive CPU task'); });
      worker.on('message', (messageFromWorker) => {
        console.log(messageFromWorker);
        return resolve;
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  static start(filepath = null) {
    return new Worker(filepath);
  }
}

module.exports = Worker;
