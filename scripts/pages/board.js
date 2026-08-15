import Board from "../classes/Board.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utilities/debug.js";
import Details from "../classes/Details.js";
import Dialog from "../classes/Dialog.js";
import DragAndDrop from "../classes/DragAndDrop.js";
import DragSorter from "../classes/DragSorter.js";
import Gallery from "../classes/Gallery.js";
import initAnchors from "../utilities/initAnchors.js";
import initDrawers from "../utilities/initDrawer.js";
import Pagination from "../classes/Pagination.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Thumbnail from "../classes/Thumbnail.js";
import Tooltip from "../classes/Tooltip.js";
import UploadImageForm from "../classes/UploadImageForm.js";
import insertSibling from "../utilities/insertSibling.js";

initAnchors();
initDrawers();

const addBoardButton = document.getElementById("add-board");
addBoardButton.addEventListener("click", () => {
  insertSibling(new Board({ dragLevel: 1 }), addBoardButton, "before");
});
