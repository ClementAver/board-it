import Canvas from "../classes/Canvas.js";
import debug from "../utilities/debug.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
import initAnchors from "../utilities/initAnchors.js";
import initTooltips from "../utilities/initTooltips.js";
import Toolbox from "../classes/Toolbox.js";
// import UploadImageForm from "../classes/UploadImageForm.js";
import SelectionImageForm from "../classes/SelectionImageForm.js";
import UploadWorkFileForm from "../classes/UploadWorkFileForm.js";
import WorkFile from "../classes/WorkFile.js";
import { CustomizableFileInput } from "../classes/CustomizableFileInput.js";
import { Dialog } from "../classes/Dialog.js";
import { Gallery } from "../classes/Gallery.js";
import { Pagination } from "../classes/Pagination.js";
import { ThemeSwitch } from "../classes/ThemeSwitch.js";
import { Thumbnail } from "../classes/Thumbnail.js";
import { TopMenu } from "../classes/TopMenu.js";

customElements.define("aeee-file-input", CustomizableFileInput);
customElements.define("aeee-dialog", Dialog, { extends: "dialog" });
customElements.define("aeee-gallery", Gallery);
customElements.define("aeee-pagination", Pagination);
customElements.define("aeee-theme-switch", ThemeSwitch);
customElements.define("aeee-thumbnail", Thumbnail);
customElements.define("aeee-top-menu", TopMenu);

const downloadWorkFileForm = document.querySelector(
  "form:has(#download-workfile-anchor)"
);
const uploadWorkFileForm = document.querySelector(
  "form:has(#upload-workfile-input)"
);
// const uploadImageForm = document.querySelector("form[data-image-upload]");
const selectionImageForm = document.querySelector("form[data-image-selection]");

new UploadWorkFileForm({ form: uploadWorkFileForm });
new DownloadWorkFileForm({ form: downloadWorkFileForm });
// new UploadImageForm({ form: uploadImageForm });
new SelectionImageForm({ form: selectionImageForm });

initAnchors();
initTooltips();

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
