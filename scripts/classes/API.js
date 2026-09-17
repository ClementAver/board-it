import { debounce, throtle } from "../utilities/timing.js";

export class API {
  #origin = "";
  #registered = new Map();

  constructor({ origin } = {}) {
    this.#origin = origin ?? this.#origin;
  }

  get origin() {
    return this.#origin;
  }

  get registered() {
    return this.#registered;
  }

  set origin(origin) {
    this.#origin = origin;
  }

  async register(
    key,
    { method, pathname, headers, signal, timming, delay, options } = {},
  ) {
    if (this.registered.has(key)) {
      throw new Error(`function already registered for key: ${key}`);
    }

    let fn = async ({ body } = {}) => {
      const response = await fetch(pathname, {
        method,
        headers,
        body,
        signal,
      });
      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      return response;
    };

    if (timming === "debounce") fn = debounce(fn, delay, options);
    else if (timming === "throttle") fn = throtle(fn, delay);

    this.registered.set(symbol(key), fn);
  }

  async call(key, { body } = {}) {
    if (!this.registered.has(key)) {
      throw new Error(`no function registered for key: ${key}`);
    }
    let fn = this.registered.get(key);
    return await fn(body);
  }
}

export default new API();
