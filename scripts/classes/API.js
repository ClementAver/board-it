import { debounce, throtle } from "../utilities/timing.js";

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
    let abortController;
    let cancel = (message) => {
      if (abortController) {
        abortController.abort(message);
      }
    };
    let request = async ({ body } = {}) => {
      if (noConcurrency) {
        cancel("concurrent calls are not permitted");
      }
      abortController = new AbortController();
      return await fetch(pathname, {
        method,
        headers,
        body,
        signal: abortController.signal,
      });
    };
    if (timmingStrategy === "debounce") {
      request = debounce(request, timmingDelay, timmingOptions);
    } else if (timmingStrategy === "throttle") {
      request = throtle(request, timmingDelay);
    }
    this.registeredEndpoints.set(key, { request, cancel });
  }

  getRegistered(key) {
    if (!this.registeredEndpoints.has(key)) {
      throw new Error(`no function registered for key: ${key}`);
    }
    return this.registeredEndpoints.get(key);
  }
}

export default new API();
