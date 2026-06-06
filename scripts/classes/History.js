export default class History {
  #head = 24;
  #limit = 25;
  #snapshots = [];

  constructor({ limit } = {}) {
    this.limit = limit ?? this.limit;
    this.head = this.limit - 1;
  }

  get head() {
    return this.#head;
  }

  get limit() {
    return this.#limit;
  }

  get snapshots() {
    return this.#snapshots;
  }

  set head(head) {
    if (head < 0) head = 0;
    if (head >= this.limit) head = this.limit - 1;

    this.#head = Math.round(head);
  }

  set limit(limit) {
    this.#limit = limit;
  }

  set snapshots(snapshots) {
    this.#snapshots = snapshots;
  }

  addSnapshot(snapshot) {
    this.#snapshots.unshift(snapshot);

    while (this.snapshots.length > this.limit) {
      this.#snapshots.pop();
    }
  }
}
