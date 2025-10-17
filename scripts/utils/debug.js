import Canvas from "../classes/Canvas.js";

let data;

const debugBtn = document.createElement("button");
debugBtn.setAttribute("id", "btn-debug");
debugBtn.textContent = "🪲";
Canvas.wrapper.appendChild(debugBtn);

debugBtn.addEventListener("click", () => {
  console.debug(data);
});

export default function debug(x) {
  data = x;
}
