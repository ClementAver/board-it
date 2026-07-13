import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utilities/debug.js";
import Details from "../classes/Details.js";
import Dialog from "../classes/Dialog.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
import DragAndDrop from "../classes/DragAndDrop.mjs";
import Gallery from "../classes/Gallery.js";
import initAnchors from "../utilities/initAnchors.js";
import initDrawers from "../utilities/initDrawer.js";
import Pagination from "../classes/Pagination.js";
import SelectionImageForm from "../classes/SelectionImageForm.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Thumbnail from "../classes/Thumbnail.js";
import Toolbox from "../classes/Toolbox.js";
import Tooltip from "../classes/Tooltip.js";
import UploadImageForm from "../classes/UploadImageForm.js";
import UploadWorkFileForm from "../classes/UploadWorkFileForm.js";
import WorkFile from "../classes/WorkFile.js";

initAnchors();
initDrawers();

Canvas.resize();
const leftDrawer = document.querySelector('[data-drawer="left-drawer"]');
Canvas.resizeWith(leftDrawer);
const rightDrawer = document.querySelector('[data-drawer="right-drawer"]');
Canvas.resizeWith(rightDrawer);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
