import * as dat from "dat.gui";

const gui = new dat.GUI({
  closeOnTop: true
});
dat.GUI.toggleHide();
const configuration = { perspectiveCamera: false };
const cameraController = gui.add(configuration, "perspectiveCamera").listen();
cameraController.name("Perspective camera");

export { configuration };
