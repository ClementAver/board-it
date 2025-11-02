import Board from "../classes/Board.js";
import debug from "../utils/debug.js";
import Canvas from "../classes/Canvas.js";
import Grid from "../classes/Grid.js";
import Picture from "../classes/Picture.js";
import Toolbox from "../classes/Toolbox.js";
import Theme from "../classes/Theme.js";

new Theme();

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

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);
Canvas.boards = boards;

const camera = Toolbox.grab("camera");
camera.frameAll(Canvas);
camera.initKeyboardActions(Canvas);

debug(Toolbox);
