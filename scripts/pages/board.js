import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utilities/debug.js";
import Dialog from "../classes/Dialog.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
import initAnchors from "../utilities/initAnchors.js";
import initTooltips from "../utilities/initTooltips.js";
import MainHeader from "../classes/MainHeader.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import UploadWorkFileForm from "../classes/UploadWorkFileForm.js";
import WorkFile from "../classes/WorkFile.js";

initAnchors();
initTooltips();

const downloadWorkFileForm = document.querySelector(
  "form:has(#download-workfile-anchor)"
);
const uploadWorkFileForm = document.querySelector(
  "form:has(#upload-workfile-input)"
);
const jsonInput = document.getElementById("upload-workfile-input");
const pictureInput = document.getElementById("picture-input");
const dropzoneDialog = document.querySelector("[data-dropzone-dialog]");
const dropzoneDialogTriggers = document.querySelectorAll(
  "[data-dropzone-dialog-trigger]"
);

new MainHeader();
new Theme();
new CustomizableFileInput({ input: jsonInput });
new CustomizableFileInput({ input: pictureInput });
new Dialog({ dialog: dropzoneDialog, triggers: dropzoneDialogTriggers });

new UploadWorkFileForm({ form: uploadWorkFileForm });
new DownloadWorkFileForm({ form: downloadWorkFileForm });

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
