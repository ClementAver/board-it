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
          return true;
        case "value":
          target[prop] = receiver;
          callbacks.forEach((cb) => cb(target.value));
          return true;
        default:
          throw new Error("Unauthorised assignment of reactive property");
      }
      return true;
    },
  };

  const proxy = new Proxy(target, handler);

  return proxy;
}
