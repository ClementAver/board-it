/*
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * Throttling enforces limits on continuous operations.
 * Debouncing waits for invocations to stop for a specific time to consolidate many noisy invocations into one single invocation.
 */

/**
 * Creates a debounced function.
 *
 * Calls the callback function immediately if the 'leading' flag is true;
 * Calls the callback function after the delay if the 'trailing' flag is true.
 *
 * @param { Function } callback
 * @param { number } delay
 * @param { object } option
 */
export function debounce(
  callback,
  delay = 0,
  { leading = false, trailing = true } = {},
) {
  let timeoutID;

  return (args) => {
    if (!timeoutID) {
      if (leading) callback.apply(this, [args]);
    }

    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = false;
      if (trailing) callback.apply(this, [args]);
    }, delay);
  };
}

/**
 * Creates a throttled function.
 *
 * @param { Function } callback
 * @param { number } delay
 */
export function throttle(callback, delay = 0) {
  let lastCall;
  let timeoutID;

  return (args) => {
    const now = Date.now();
    clearTimeout(timeoutID);

    if (!lastCall || now >= lastCall + delay) {
      lastCall = now;
      callback.apply(this, [args]);
    } else {
      timeoutID = setTimeout(
        () => {
          lastCall = Date.now();
          callback.apply(this, [args]);
        },
        Math.min(delay - (now - lastCall), delay),
      );
    }
  };
}
