export class Unique {
  _assessed = 0;

  getUniqueID() {
    return `unique_id_${this._assessed++}`;
  }
}

export default new Unique();
