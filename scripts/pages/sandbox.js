import debug from "../utilities/debug.js";
import initDrawers from "../utilities/initDrawer.js";
import reactive from "../utilities/reactive.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";
import {
  readBoard,
  abortReadBoard,
  readBoards,
  abortReadBoards,
} from "../services/BackIt.js";

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
