const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require(`electron-is-dev`);

const {
  saveTicketHandler,
  listTicketHandler,
  editTicketHandler,
  deleteTicketHandler,
} = require("./handlers/ticket.cjs");
const { reloadWindowHandler } = require("./handlers/reload.cjs");

let win;

const createWindow = async () => {
  await app.whenReady();
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
    },
  });

  // win.loadURL("http://localhost:5173");
  // win.webContents.openDevTools();
  // win.loadFile("./dist/index.html");
  process.env.NODE_ENV = process.env.NODE_ENV || "development";

  if (isDev) {
    win.loadURL("http://localhost:5179");
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist/index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("saveTicket", (event, data) => saveTicketHandler(event, data));
ipcMain.handle("listTicket", listTicketHandler);
ipcMain.handle("editTicket", (event, data) => editTicketHandler(event, data));
ipcMain.handle("deleteTicket", (event, data) =>
  deleteTicketHandler(event, data)
);
ipcMain.handle("reloadWindow", reloadWindowHandler);
