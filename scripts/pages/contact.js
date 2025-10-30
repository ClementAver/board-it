import Theme from "../classes/Theme.js";
import delay from "../utils/delay.js";

new Theme();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
