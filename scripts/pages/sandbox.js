import debug from "../utilities/debug.js";
import initDrawers from "../utilities/initDrawer.js";
import reactive from "../utilities/reactive.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";
import backIt from "../api/backIt.js";

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
const { request: readBoards } = backIt.registered("readBoards");
const { request: readBoard } = backIt.registered("readBoard");

readBoards().then((response) => {
  console.log(response);
  response.json().then((result) => {
    console.log(result);
  });
});

readBoard({ pathname: "/1" }, { immediate: true }).then((response) => {
  console.log(response);
  response.json().then((result) => {
    console.log(result);
  });
});
