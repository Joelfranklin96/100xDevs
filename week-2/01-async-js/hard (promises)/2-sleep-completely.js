/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */
function sleep(milliseconds) {
    const start = Date.now();
    // Busy-wait loop
    while (Date.now() - start < milliseconds) {
      // The thread is locked in here.
    }
    // Return a resolved promise for consistency
    return Promise.resolve("Busy wait completed");
  }


module.exports = sleep;
