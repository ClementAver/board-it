import delay from "../utilities/delay.js";
import initTooltips from "../utilities/initTooltips.js";

initTooltips();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
