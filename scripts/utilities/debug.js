let data;

const debugBtn = document.createElement("button");
debugBtn.setAttribute("id", "btn-debug");
debugBtn.textContent = "🪲";
document.body.appendChild(debugBtn);

debugBtn.addEventListener("click", () => {
  console.debug(data);
});

export default function debug(x) {
  data = x;
}
