export default class History {
  _limit = 25;
  _snapshots = [];

  get limit() {
    return this._limit;
  }

  get snapshots() {
    return this._snapshots;
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
