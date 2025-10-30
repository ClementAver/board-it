import Board from "../classes/Board.js";
import debug from "../utils/debug.js";
import Canvas from "../classes/Canvas.js";
import FrameAll from "../classes/FrameAll.js";
import Grid from "../classes/Grid.js";
import LeftDrawer from "../classes/LeftDrawer.js";
import Pan from "../classes/Pan.js";
import Picture from "../classes/Picture.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import Zoom from "../classes/Zoom.js";

const leftDrawer = new LeftDrawer();
new Theme();
new Pan();
new Zoom();
new FrameAll();

const picture = new Picture({
  x: 0,
  y: 0,
  w: 460,
  h: 460,
  src: "./assets/pictures/image-1.jpg",
});

const elements = [picture];

const boards = [
  new Board({
    x: 0,
    y: 0,
    w: 500,
    h: 500,
    elements,
    borderAlign: "inside",
    borderWidth: 20,
    grids: [
      new Grid({ spacing: 50, borderWidth: 1.25, borderColor: "lightgreen" }),
      new Grid({ spacing: 25, borderWidth: 0.5 }),
    ],
  }),
  new Board({
    y: 1100,
    borderAlign: "inside",
    borderWidth: 20,
    grids: [
      new Grid({ spacing: 50, borderWidth: 1.25, borderColor: "magenta" }),
      new Grid({ spacing: 25 }),
    ],
  }),
];

Canvas.boards = boards;
Canvas.resizeWith(leftDrawer.leftDrawerMenu);

Toolbox.grab("camera").frameAll(Canvas);

debug(Canvas);
