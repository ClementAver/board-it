export default class History {
  _head = 24;
  _limit = 25;
  _snapshots = [];

  constructor({ limit } = {}) {
    this.limit = limit ?? this.limit;
  }

  get head() {
    return this._head;
  }

  get limit() {
    return this._limit;
  }

  get snapshots() {
    return this._snapshots;
  }

  set head(head) {
    if (head < 0) head = 0;
    if (head >= this.limit) head = this.limit - 1;

    this._head = Math.round(head);
  }

  set limit(limit) {
    this._limit = limit;
  }

  set snapshots(snapshots) {
    this._snapshots = snapshots;
  }

  addSnapshot(snapshot) {
    this._snapshots.unshift(snapshot);

    while (this.snapshots.length > this.limit) {
      this._snapshots.pop();
    }
  }
}
