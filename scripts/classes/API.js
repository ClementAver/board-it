import formatOrdinal from "../utilities/formatOrdinal.js";
import { debounce, throttle } from "../utilities/timing.js";

export class API {
  #origin = "";
  #registeredEndpoints = new Map();

  constructor({ origin } = {}) {
    this.#origin = origin ?? this.#origin;
  }

  get origin() {
    return this.#origin;
  }

  get registeredEndpoints() {
    return this.#registeredEndpoints;
  }

  set origin(origin) {
    this.#origin = origin;
  }

  async register({
    key,
    method = "GET",
    pathname,
    headers,
    noConcurrency,
    timmingStrategy,
    timmingDelay,
    timmingOptions,
  } = {}) {
    if (!key) throw new Error('missing "key" parameter');
    if (!pathname) throw new Error('missing "pathname" parameter');
    if (this.registeredEndpoints.has(key)) {
      throw new Error(`function already registered for key: ${key}`);
    }
    let timesCalled = 0;
    const abortControllerRef = { value: new AbortController() };
    let request = async ({ body } = {}) => {
      timesCalled++;
      if (noConcurrency) {
        abortControllerRef.value?.abort(
          `concurrent calls are not permitted (${formatOrdinal(timesCalled)})`,
        );
      }
      abortControllerRef.value = new AbortController();
      return await fetch(`${this.origin}${pathname}`, {
        method,
        headers,
        body,
        signal: abortControllerRef.value.signal,
      });
    };
    if (timmingStrategy === "debounce") {
      request = debounce(request, timmingDelay, timmingOptions);
    } else if (timmingStrategy === "throttle") {
      request = throttle(request, timmingDelay);
    }
    const abort = (message) => {
      abortControllerRef.value.abort(
        `${message} ${formatOrdinal(timesCalled)}`,
      );
    };
    this.registeredEndpoints.set(key, { request, abort });
  }

  registered(key) {
    if (!this.registeredEndpoints.has(key)) {
      throw new Error(`no function registered for key: ${key}`);
    }
    return this.registeredEndpoints.get(key);
  }
}
