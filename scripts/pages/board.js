import Board from "../classes/Board.js";
import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utils/debug.js";
import Dialog from "../classes/Dialog.js";
import Grid from "../classes/Grid.js";
import initDropdownMenus from "../utils/dropdowns.js";
import MainHeader from "../classes/MainHeader.js";
import Picture from "../classes/Picture.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";

initDropdownMenus();

new MainHeader();

new Theme();

new CustomizableFileInput({ input: document.getElementById("json-input") });
new CustomizableFileInput({ input: document.getElementById("png-input") });

const dropzoneDialog = document.querySelector("[data-dropzone-dialog]");
const dropzoneDialogTriggers = document.querySelectorAll("[data-dropzone-dialog-trigger]");
new Dialog({ dialog: dropzoneDialog, triggers: dropzoneDialogTriggers });

const picture = new Picture({
  x: 0,
  y: 0,
  w: 460,
  h: 460,
  src: "../assets/pictures/image-1.jpg",
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
