import reactive from "../utils/reactive.js";
import debug from "../utils/debug.js";

const count = new reactive(0);

const countBtn = document.getElementById("count-btn");
countBtn.textContent = `clicked ${count.value} x.`
countBtn.onclick = () => {
  count.value = count.value + 1;
};  

count.addAction = (v) => console.log("click #" + v);
count.addAction = (v) => (countBtn.textContent = `clicked ${v} x.`);

debug(count);
