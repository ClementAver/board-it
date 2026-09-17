export default function formatOrdinal(number) {
  let string = number.toString();
  if (string === "") return "";
  if (["11", "12", "13"].some((it) => string.endsWith(it))) {
    return `${string}th`;
  }
  let lastLetter = string.charAt(string.length - 1);
  if (lastLetter === "1") {
    return `${string}st`;
  } else if (lastLetter === "2") {
    return `${string}nd`;
  } else if (lastLetter === "3") {
    return `${string}rd`;
  } else {
    return `${string}th`;
  }
}
