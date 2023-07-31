const { app, BrowserWindow, ipcMain, webContents } = require("electron");
const path = require("path");
const isDev = require(`electron-is-dev`);

// Handlers
const {
  saveTicketHandler,
  listTicketHandler,
  editTicketHandler,
  deleteTicketHandler,
  filterTicketHandler,
} = require("./handlers/ticket.cjs");
const { reloadWindowHandler } = require("./handlers/reload.cjs");
const { exportDatabase, importDatabase } = require("./handlers/database.cjs");
const { signIn } = require("./handlers/user.cjs");

let win;

const createWindow = async () => {
  await app.whenReady();
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
    },
    backgroundMaterial: "acrylic",
    autoHideMenuBar: true,
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

// Ticket
ipcMain.handle("saveTicket", (event, data) => saveTicketHandler(event, data));
ipcMain.handle("listTicket", listTicketHandler);
ipcMain.handle("editTicket", (event, data) => editTicketHandler(event, data));
ipcMain.handle("filterTicket", (event, data) =>
  filterTicketHandler(event, data)
);

ipcMain.handle("deleteTicket", (event, data) =>
  deleteTicketHandler(event, data)
);

// Window
ipcMain.handle("reloadWindow", reloadWindowHandler);

// Database
ipcMain.handle("exportDatabase", exportDatabase);
ipcMain.handle("importDatabase", importDatabase);

// User
ipcMain.handle("signIn", (event, data) => signIn(event, data));
