/**
 *
 * @param { number } max
 * @returns
 */
function randomInt(max) {
  return new Date().getMilliseconds() + Math.floor(Math.random() * max);
}
