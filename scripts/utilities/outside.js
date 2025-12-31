function outside(event, container, target) {
  return !(
    event.composedPath().includes(container) ||
    event.composedPath().includes(target)
  );
}
