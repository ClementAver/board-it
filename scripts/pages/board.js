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
import ToastGenerator from "../classes/ToastGenerator.js";

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

ToastGenerator.center.generate(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel fermentum massa, id posuere urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus et congue enim. Sed ac nunc suscipit, commodo eros et, congue lorem. Nam vestibulum pretium tristique. Phasellus dictum ex quam, quis maximus felis suscipit vel. Aenean a posuere ex. Nullam laoreet bibendum mauris. Morbi neque ligula, tempor non aliquam venenatis, laoreet nec leo. Aliquam erat volutpat. Sed at leo et erat volutpat pulvinar sed sit amet tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In varius, neque nec elementum volutpat, turpis quam hendrerit magna, ut tincidunt eros tellus id metus. Sed scelerisque turpis velit, quis dapibus arcu aliquet ut.",
  { type: "check" }
);

setTimeout(
  () => ToastGenerator.center.generate("Lorem ipsum", { type: "cross" }),
  1000
);

debug(WorkFile);
