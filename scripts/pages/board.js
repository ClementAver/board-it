import useLeftDrawer from "../hooks/useLeftDrawer.js";
import Canvas from "../classes/Canvas.js";
import Board from "../classes/Board.js";
import Picture from "../classes/Picture.js";

const { toggleLeftDrawerBtn, leftDrawer, updateIcon, toggle } = useLeftDrawer();
toggleLeftDrawerBtn.addEventListener("click", toggle);
updateIcon();

const main = document.querySelector("main.board__wrapper");
const hightlightBeta = getComputedStyle(main).getPropertyValue("--highlight-beta");

const picture = new Picture({
  x: 0,
  y: 0,
  w: 200,
  h: 200,
  src: "./assets/pictures/image-1.jpg",
  backgroundColor: hightlightBeta,
});

const elements = [picture];

const boards = [new Board({ elements })];
const canvas = new Canvas({ boards });

const resizeObserver = new ResizeObserver((entries) => {
  for (const _ of entries) {
    canvas.resizeCanvas();
    canvas.centerCamera()
  }
});
resizeObserver.observe(leftDrawer);
