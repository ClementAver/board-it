export default function preventKeys(event, keys = []) {
  if (keys.some((key) => key === event.key.code)) event.preventDefault();
}
