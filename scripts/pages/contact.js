import delay from "../utilities/delay.js";
import Theme from "../classes/Theme.js";
import initTooltips from "../utilities/initTooltips.js";

new Theme();

initTooltips();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
