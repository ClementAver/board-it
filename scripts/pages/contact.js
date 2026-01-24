import delay from "../utilities/delay.js";
import initTooltips from "../utilities/initTooltips.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import TopMenu from "../classes/TopMenu.js";

customElements.define("aeee-theme-switch", ThemeSwitch);
customElements.define("aeee-top-menu", TopMenu);

initTooltips();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
