import debug from "../utilities/debug.js";
import initDrawers from "../utilities/initDrawer.js";
import reactive from "../utilities/reactive.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";

initDrawers();

const count = new reactive(0);

const countBtn = document.getElementById("count-btn");
countBtn.textContent = `Cliqué ${count.value} fois`;
countBtn.onclick = () => {
  count.value = count.value + 1;
};

count.addAction = (v) => console.log("click #" + v);
count.addAction = (v) => (countBtn.textContent = `Cliqué ${v} fois`);

debug(count);
