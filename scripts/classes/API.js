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

  register({
    key,
    method = "GET",
    pathname = "",
    queries,
    headers,
    noConcurrency,
    timingStrategy,
    timingDelay,
    timingOptions,
  } = {}) {
    if (!key) throw new Error('missing "key" parameter');
    if (this.registeredEndpoints.has(key)) {
      throw new Error(`function already registered for key: ${key}`);
    }
    let url = new URL(this.origin);
    if (pathname) url.pathname = pathname;
    if (queries) {
      let searchParams = url.searchParams;
      for (const [key, value] of Object.entries(queries)) {
        searchParams.set(key, value);
      }
    }
    let timesCalled = 0;
    const abortControllerRef = { value: new AbortController() };
    let request = async ({
      pathname: requestPathname,
      queries: requestQueries,
      body,
    } = {}) => {
      timesCalled++;
      if (noConcurrency) {
        abortControllerRef.value?.abort(
          `concurrent calls are not permitted (${formatOrdinal(timesCalled)})`,
        );
      }
      abortControllerRef.value = new AbortController();
      const requestUrl = new URL(url);
      if (requestPathname)
        requestUrl.pathname = requestUrl.pathname + requestPathname;
      if (requestQueries) {
        let searchParams = requestUrl.searchParams;
        for (const [key, value] of Object.entries(requestQueries)) {
          searchParams.set(key, value);
        }
      }
      return fetch(requestUrl, {
        method,
        headers,
        body,
        signal: abortControllerRef.value.signal,
      });
    };
    if (timingStrategy === "debounce") {
      request = debounce(request, timingDelay, timingOptions);
    } else if (timingStrategy === "throttle") {
      request = throttle(request, timingDelay);
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
