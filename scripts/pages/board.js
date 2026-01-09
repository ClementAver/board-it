import Canvas from "../classes/Canvas.js";
import debug from "../utilities/debug.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
import initAnchors from "../utilities/initAnchors.js";
import initTooltips from "../utilities/initTooltips.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import UploadImageForm from "../classes/UploadImageForm.js";
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
const uploadImageForm = document.querySelector("form:has(#upload-image-input)");

new Theme();

new UploadImageForm({ form: uploadImageForm });
new UploadWorkFileForm({ form: uploadWorkFileForm });
new DownloadWorkFileForm({ form: downloadWorkFileForm });

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
