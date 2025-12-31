import debug from "../utilities/debug.js";
import MainHeader from "../classes/MainHeader.js";
import reactive from "../utilities/reactive.js";
import Theme from "../classes/Theme.js";

new MainHeader();

new Theme();

const count = new reactive(0);

const countBtn = document.getElementById("count-btn");
countBtn.textContent = `Cliqué ${count.value} fois`;
countBtn.onclick = () => {
  count.value = count.value + 1;
};

count.addAction = (v) => console.log("click #" + v);
count.addAction = (v) => (countBtn.textContent = `Cliqué ${v} fois`);

debug(count);
