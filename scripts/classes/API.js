class API {
  #headers = null;
  #origin = "";

  constructor({ headers, origin } = {}) {
    this.#headers = this.#headersGuard(headers) ?? this.#headers;
    this.#origin = origin ?? this.#origin;
  }

  get headers() {
    return this.#headers;
  }

  get origin() {
    return this.#origin;
  }

  set headers(headers) {
   this.#headers = this.#headersGuard(headers) ?? this.#headers;
  }

  set origin(origin) {
    this.#origin = origin;
  }

  #headersGuard(headers) {
    if (headers && headers instanceof Headers) {
      return headers;
    } else {
      console.error(`expected type Headers, found ${typeof headers}`);
      return false;
    }
  }
}
