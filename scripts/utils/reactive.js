export default function reactive(value) {
  const target = { value };
  const callbacks = new Set();

  const handler = {
    get(target, prop) {
      return target[prop];
    },
    set(_, prop, receiver) {
      switch (prop) {
        case "addAction":
          callbacks.add(receiver);
          break;
        case "value":
          Reflect.set(...arguments);
          callbacks.forEach((cb) => cb(target.value));
          break;
        default:
          throw new Error("Unauthorised assignment of reactive property");
      }
      return true;
    },
  };

  const proxy = new Proxy(target, handler);

  return proxy;
}
