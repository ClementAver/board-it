import delay from "../utilities/delay.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Tooltip from "../classes/Tooltip.js";
import TopMenu from "../classes/TopMenu.js";

customElements.define("aeee-theme-switch", ThemeSwitch);
customElements.define("aeee-tooltip", Tooltip);
customElements.define("aeee-top-menu", TopMenu);

const inputs = document.querySelectorAll("div.bounce-up");
delay(inputs, { property: "animation", delay: 100 });
