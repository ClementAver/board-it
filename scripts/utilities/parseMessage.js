/**
 * @param { string } message - "C'est pas {who} qui prend {what}, c'est {what} qui prend {who}."
 * @param { { [key: string]: string } } parameters - { who : "l'homme", what : "la mer" }
 *
 * @returns {string} - "C'est pas l'homme qui prend la mer, c'est la mer qui prend l'homme."
 */
export function parseMessage(message, params) {
  for (let [key, value] of Object.entries(params)) {
    message = message.replaceAll(`{${key}}`, value);
  }

  return message;
}
