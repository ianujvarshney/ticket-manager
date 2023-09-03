const { BrowserWindow } = require("electron");

const currentWindow = BrowserWindow.getFocusedWindow();

const reloadWindowHandler = () => {
  currentWindow.reload();
};

module.exports = {
  reloadWindowHandler,
};
