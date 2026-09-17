import debug from "../utilities/debug.js";
import initDrawers from "../utilities/initDrawer.js";
import reactive from "../utilities/reactive.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";
import boardAPI from "../classes/BoardApi.js";

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

// 🚧🚧🚧🚧🚧
const { request, abort } = boardAPI.registered("getBoards");

request();
abort("aborted!");
