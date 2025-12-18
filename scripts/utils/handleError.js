import ToastGenerator from "../classes/ToastGenerator.js";

export default function handleError({
  text = "",
  error = new Error(),
  position = "right",
  silent = false,
} = {}) {
  console.error(text, error);

  if (!silent)
    ToastGenerator[`${position}`].generate(text, {
      type: "cross",
    });
}
