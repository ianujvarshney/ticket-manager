const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require(`electron-is-dev`);

// Handlers
const {
  saveTicketHandler,
  listTicketHandler,
  editTicketHandler,
  deleteTicketHandler,
  filterTicketHandler,
  getTotalTickets,
} = require("./handlers/ticket.cjs");
const { reloadWindowHandler } = require("./handlers/reload.cjs");
const { exportDatabase, importDatabase } = require("./handlers/database.cjs");
const { signIn, isFirstUser } = require("./handlers/user.cjs");
const {
  setDefaultPass,
  comparePass,
  hasDefaultPass,
} = require("./handlers/configs.cjs");

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    console.log(process.argv);
    app.setAsDefaultProtocolClient("ticket-manager", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient("ticket-manager");
  }
}

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
  if (isDev) {
    win.loadURL("http://localhost:5179");
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist/index.html"));
  }
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
    // // the commandLine is array of strings in which last element is deep link url
    // dialog.showErrorBox(
    //   "Welcome Back",
    //   `You arrived from: ${commandLine.pop()}`
    // );
  });

  app.whenReady().then(() => {
    createWindow();
  });
}

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
ipcMain.handle("getTotalTickets", () => getTotalTickets());
ipcMain.handle("saveTicket", (event, data) => saveTicketHandler(event, data));
ipcMain.handle("listTicket", (event, data) => listTicketHandler(event, data));
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
ipcMain.handle("isFirstUser", () => isFirstUser());

// Configs
ipcMain.handle("setDefaultPass", (event, data) => setDefaultPass(event, data));
ipcMain.handle("comparePass", (event, data) => comparePass(event, data));
ipcMain.handle("hasDefaultPass", (event, data) => hasDefaultPass(event, data));
