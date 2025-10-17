import Board from "../classes/Board.js";
import Canvas from "../classes/Canvas.js";
import Grid from "../classes/Grid.js";
import Picture from "../classes/Picture.js";
import Toolbox from "../classes/Toolbox.js";

import useLeftDrawer from "../hooks/useLeftDrawer.js";

const { toggleLeftDrawerBtn, leftDrawer, updateToggleIcon, toggle } = useLeftDrawer();
toggleLeftDrawerBtn.addEventListener("click", toggle);
updateToggleIcon();

const main = document.querySelector("main.board__wrapper");
const hightlightBeta = getComputedStyle(main).getPropertyValue("--highlight-beta");

const debugBtn = document.getElementById("btn-debug");
debugBtn.addEventListener("click", () => {
  Canvas.debug(), Toolbox.debug();
});

const picture = new Picture({
  x: 0,
  y: 0,
  w: 200,
  h: 200,
  src: "./assets/pictures/image-1.jpg",
  backgroundColor: hightlightBeta,
});

const elements = [picture];

const boards = [
  new Board({
    elements,
    borderAlign: "outside",
    borderWidth: 20,
    grids: [
      new Grid({ spacing: 50, borderWidth: 1.25, borderColor: "lightgreen" }),
      new Grid({ spacing: 25 }),
    ],
  }),
  new Board({
    y: 1100,
    borderAlign: "inside",
    borderWidth: 20,
    elements,
    grids: [
      new Grid({ spacing: 50, borderWidth: 1.25, borderColor: "magenta" }),
      new Grid({ spacing: 25 }),
    ],
  }),
];

Canvas.boards = boards;

const camera = Toolbox.grab("camera");
camera.initPan(Canvas);
camera.initZoom(Canvas);
camera.frameAll(Canvas);

const resizeObserver = new ResizeObserver((entries) => {
  for (const _ of entries) {
    Canvas.resizeCanvas();
  }
});
resizeObserver.observe(leftDrawer);
