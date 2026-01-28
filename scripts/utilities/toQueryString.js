/**
 * Transforms an object into a query string, keys for keys, values for values.
 *
 * @param { Object } queries
 * @returns { string }
 */
export default function toQueryString(queries) {
  let queryString = "";

  for (const [key, value] of Object.entries(queries)) {
    if (value === undefined) continue;
    if (!queryString) queryString = `?${key}=${value}`;
    else queryString = queryString.concat(`&${key}=${value}`);
  }

  return queryString;
}
