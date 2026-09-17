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

  async register(
    key,
    {
      method = "GET",
      pathname = "/",
      headers,
      noConcurrency = true,
      timmingStrategy,
      timmingDelay,
      timmingOptions,
    } = {},
  ) {
    if (this.registeredEndpoints.has(key)) {
      throw new Error(`function already registered for key: ${key}`);
    }
    let abortController = new AbortController();
    let request = async ({ body } = {}) => {
      if (noConcurrency) {
        abortController?.abort("concurrent calls are not permitted");
      }
      return await fetch(`${this.origin}${pathname}`, {
        method,
        headers,
        body,
        signal: abortController.signal,
      });
    };
    if (timmingStrategy === "debounce") {
      request = debounce(request, timmingDelay, timmingOptions);
    } else if (timmingStrategy === "throttle") {
      request = throttle(request, timmingDelay);
    }
    this.registeredEndpoints.set(key, { request, cancel });
  }

  registered(key) {
    if (!this.registeredEndpoints.has(key)) {
      throw new Error(`no function registered for key: ${key}`);
    }
    return this.registeredEndpoints.get(key);
  }
}
