import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utils/debug.js";
import Dialog from "../classes/Dialog.js";
import DownloadWorkFileForm from "../classes/DownloadWorkFileForm.js";
import initAnchors from "../utils/initAnchors.js";
import MainHeader from "../classes/MainHeader.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import UploadWorkFileForm from "../classes/UploadWorkFileForm.js";
import WorkFile from "../classes/WorkFile.js";
import ToastGenerator from "../classes/ToastGenerator.js";

initAnchors();

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

/* 🚧🚧🚧🚧🚧 */
ToastGenerator.right.generate("Agathe");

setTimeout(() => {
  ToastGenerator.center.generate("Clément");
}, 1000);

setTimeout(() => {
  ToastGenerator.right.generate(
    "Ut tempus purus ut justo efficitur sagittis. Mauris lorem felis, imperdiet vel porta et, posuere non nibh. Mauris imperdiet, nibh sed molestie mattis, sem ligula congue lorem, in consectetur nisi quam a enim. Sed dapibus lectus euismod tortor finibus faucibus. Nulla ipsum risus, scelerisque ut felis et, feugiat facilisis arcu. Cras non nisi a lacus pharetra varius in a magna. Vestibulum at sapien nec enim venenatis vestibulum."
  );
}, 2000);

setTimeout(() => {
  ToastGenerator.center.generate("Nicolas");
  ToastGenerator.center.generate("Nicolas");
  ToastGenerator.center.generate("Nicolas");
  ToastGenerator.center.generate("Nicolas");
}, 3000);

setTimeout(() => {
  ToastGenerator.right.generate("Matias");
}, 4000);
/* 🚧🚧🚧🚧🚧 */

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);
