import delay from "../utilities/delay.js";
import initDrawers from "../utilities/initDrawer.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";

initDrawers();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
