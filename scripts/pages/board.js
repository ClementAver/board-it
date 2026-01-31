import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utilities/debug.js";
import Dialog from "../classes/Dialog.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
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

const downloadWorkFileForm = document.querySelector(
  "form:has(#download-workfile-anchor)",
);
new DownloadWorkFileForm({ form: downloadWorkFileForm });

const uploadWorkFileForm = document.querySelector(
  "form:has(#upload-workfile-input)",
);
new UploadWorkFileForm({ form: uploadWorkFileForm });

const uploadImageForm = document.querySelector("form[data-image-upload]");
new UploadImageForm({ form: uploadImageForm });

const selectionImageForm = document.querySelector("form[data-image-selection]");
new SelectionImageForm({ form: selectionImageForm });

initAnchors();
initDrawers();

Canvas.resize();
const leftDrawer = document.getElementById("left-drawer");
const rightDrawer = document.getElementById("right-drawer");
Canvas.resizeWith(leftDrawer);
Canvas.resizeWith(rightDrawer);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
