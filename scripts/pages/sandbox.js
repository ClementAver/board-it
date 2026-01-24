import debug from "../utilities/debug.js";
import reactive from "../utilities/reactive.js";
import initTooltips from "../utilities/initTooltips.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Thumbnail from "../classes/Thumbnail.js";
import TopMenu from "../classes/TopMenu.js";

customElements.define("aeee-theme-switch", ThemeSwitch);
customElements.define("aeee-thumbnail", Thumbnail);
customElements.define("aeee-top-menu", TopMenu);

initTooltips();

const count = new reactive(0);

const countBtn = document.getElementById("count-btn");
countBtn.textContent = `Cliqué ${count.value} fois`;
countBtn.onclick = () => {
  count.value = count.value + 1;
};

count.addAction = (v) => console.log("click #" + v);
count.addAction = (v) => (countBtn.textContent = `Cliqué ${v} fois`);

debug(count);
