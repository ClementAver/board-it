export default function debugKey(e) {
  console.debug(`${e.type} → ${e.code} [altKey: ${e.altKey}] [ctrlKey: ${e.ctrlKey}]`);
}
