/*
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * Throttling enforces limits on continuous operations.
 * Debouncing waits for invocations to stop for a specific time to consolidate many noisy invocations into one single invocation.
 */

/**
 * Creates a debounced function.
 *
 * Calls the callback function immediately if the 'leading' flag is true
 * Calls the callback function after the delay if the 'trailing' flag is true.
 *
 * @param { Function } callback
 * @param { number } delay
 * @param { Object } options
 * @param { boolean | undefined } options.leading
 * @param { boolean | undefined } options.trailing
 */
export function debounce(
  callback,
  delay = 0,
  { leading = false, trailing = true } = {},
) {
  let timeoutID = null;
  let pending = [];

  const resolveAll = (value) => {
    const list = pending;
    pending = [];
    list.forEach(({ resolve }) => resolve(value));
  };

  const rejectAll = (error) => {
    const list = pending;
    pending = [];
    list.forEach(({ reject }) => reject(error));
  };

  return (args, { immediate = false } = {}) =>
    new Promise((resolve, reject) => {
      try {
        if (immediate) {
          console.log("immediate");

          clearTimeout(timeoutID);
          timeoutID = null;
          const result = callback(args);
          resolve(result);
          resolveAll(result);
          return;
        }

        if (!timeoutID && leading) {
          resolve(callback(args));
        } else {
          pending.push({ resolve, reject });
        }

        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          timeoutID = null;
          if (!trailing) return resolveAll(undefined);
          try {
            resolveAll(callback(args));
          } catch (error) {
            rejectAll(error);
          }
        }, delay);
      } catch (error) {
        reject(error);
      }
    });
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
    if (timeoutID) clearTimeout(timeoutID);
    return new Promise(async (resolve, reject) => {
      try {
        if (!lastCall || now >= lastCall + delay) {
          lastCall = now;
          await callback.apply(null, [args]);
        } else {
          timeoutID = setTimeout(
            async () => {
              lastCall = Date.now();
              await callback.apply(null, [args]);
            },
            Math.min(delay - (now - lastCall), delay),
          );
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
}
