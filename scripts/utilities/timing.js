/*
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * Throttling enforces limits on continuous operations.
 * Debouncing waits for invocations to stop for a specific time to consolidate many noisy invocations into one single invocation.
 */

/**
 * Options accepted by {@link debounce}.
 *
 * @typedef {Object} DebounceOptions
 * @property {boolean} [leading=false] Invoke the callback on the leading edge, i.e. immediately when the debounced function is called while no wait period is currently running.
 * @property {boolean} [trailing=true] Invoke the callback on the trailing edge, i.e. once `delay` ms have elapsed since the last call, using the arguments of that last call.
 */

/**
 * Debounced call options accepted by the function returned from {@link debounce}.
 *
 * @typedef {Object} DebounceCallOptions
 * @property {boolean} [immediate=false] Cancel any scheduled trailing invocation, run the callback right now and settle every pending promise with its result. Ignores `leading` and `trailing`.
 */

/**
 * Creates a debounced function.
 *
 * The wait period restarts on every call. The callback is invoked:
 * - immediately, if `options.leading` is true and no wait period is running;
 * - `delay` ms after the last call, if `options.trailing` is true.
 *
 * Every call returns a promise:
 * - a leading invocation resolves the promise of the call that triggered it;
 * - a trailing invocation resolves the promises of all calls made during the wait period (except one already resolved by a leading invocation) with the result of the callback, which receives the arguments of the last call;
 * - if `trailing` is false, the promises of the calls made during the wait period resolve with `undefined` when the period ends;
 * - if the callback throws (or returns a rejected promise), the promises it was supposed to resolve are rejected with the same error. This includes the pending promises when an `immediate` invocation throws.
 *
 * When both `leading` and `trailing` are true, the trailing invocation only happens if the debounced function was called again during the wait period. A single call triggers the callback once, on the leading edge.
 *
 * @template A, R
 * @param {(args: A) => R | Promise<R>} callback The function to debounce. It receives a single argument, the one passed to the debounced function.
 * @param {number} [delay=0] The wait period in milliseconds.
 * @param {DebounceOptions} [options] Leading/trailing edge configuration.
 * @param {boolean} [options.leading=false]
 * @param {boolean} [options.trailing=true]
 * @returns {(args?: A, callOptions?: DebounceCallOptions) => Promise<R | undefined>}
 *   The debounced function. The promise resolves with the callback result, or with `undefined` when the call did not lead to an invocation (see above).
 *
 * @example
 * const search = debounce((query) => fetch(`/search?q=${query}`), 300);
 * input.addEventListener("input", (e) => search(e.target.value));
 *
 * @example
 * // Fire on the first keystroke, then ignore the burst
 * const save = debounce(persist, 500, { leading: true, trailing: false });
 *
 * @example
 * // Flush right now, e.g. before leaving the page
 * search(input.value, { immediate: true });
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
          clearTimeout(timeoutID);
          timeoutID = null;
          let result;
          try {
            result = callback(args);
          } catch (error) {
            reject(error);
            rejectAll(error);
            return;
          }
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
          if (!trailing || pending.length === 0) return resolveAll(undefined);
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
 * The callback is invoked at most once every `delay` ms:
 * - if at least `delay` ms have passed since the last invocation (or if it was never invoked), it runs immediately (leading edge);
 * - otherwise the call is deferred until the remaining time has elapsed (trailing edge). Each new call replaces the previously deferred one, so only the arguments of the latest call are used.
 *
 * Every call returns a promise. Calls that were superseded by a later call, or that were deferred, settle with the result (or error) of the invocation that eventually ran. The callback is always awaited, so a synchronous throw results in a rejected promise rather than an exception.
 *
 * @template A, R
 * @param {(args: A) => R | Promise<R>} callback The function to throttle. It receives a single argument, the one passed to the throttled function.
 * @param {number} [delay=0] The minimum interval between two invocations, in milliseconds.
 * @returns {(args?: A) => Promise<R>} The throttled function, resolving with the result of the callback.
 *
 * @example
 * const onScroll = throttle(() => updatePosition(window.scrollY), 100);
 * window.addEventListener("scroll", onScroll);
 */
export function throttle(callback, delay = 0) {
  let lastCall = null;
  let timeoutID = null;
  let pending = [];

  const settle = (method, value) => {
    const list = pending;
    pending = [];
    list.forEach((waiter) => waiter[method](value));
  };

  const run = async (args) => {
    lastCall = Date.now();
    return callback(args);
  };

  const runAndSettle = (args) => {
    const promise = run(args);
    promise.then(
      (value) => settle("resolve", value),
      (error) => settle("reject", error),
    );
    return promise;
  };

  return (args) => {
    const now = Date.now();
    clearTimeout(timeoutID);
    timeoutID = null;

    if (lastCall === null || now - lastCall >= delay) {
      return runAndSettle(args);
    }

    return new Promise((resolve, reject) => {
      pending.push({ resolve, reject });
      timeoutID = setTimeout(
        () => {
          timeoutID = null;
          runAndSettle(args);
        },
        delay - (now - lastCall),
      );
    });
  };
}
