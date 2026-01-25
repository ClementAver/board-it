import delay from "../utilities/delay.js";
import initDrawers from "../utilities/initDrawer.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";

customElements.define("aeee-theme-switch", ThemeSwitch);
customElements.define("aeee-tooltip", Tooltip);

initDrawers();

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
