const { app, BrowserWindow, ipcMain } = require("electron");
const { prisma } = require("./src/lib/prisma.cjs");
const path = require("path");

const { saveTicketHandler } = require("./src/electron/handlers/ticket.cjs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "src", "electron", "preload.cjs"),
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
  // win.loadFile("index.html");
};

app.whenReady().then(() => {
  prisma.user.findMany().then((users) => {
    console.log(users);
  });

  createWindow();
});

ipcMain.handle("saveTicket", (event, data) => saveTicketHandler(event, data));
