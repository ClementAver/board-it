import delay from "../utilities/delay.js";
import MainHeader from "../classes/MainHeader.js";
import Theme from "../classes/Theme.js";

new MainHeader();

new Theme();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
