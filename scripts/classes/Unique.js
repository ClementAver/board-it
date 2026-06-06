export class Unique {
  #assessed = 0;

  getUniqueID() {
    return `unique_id_${this.#assessed++}`;
  }
}

export default new Unique();
