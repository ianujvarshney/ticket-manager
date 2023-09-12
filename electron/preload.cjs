const { contextBridge, ipcRenderer } = require("electron");

// Tickets
contextBridge.exposeInMainWorld("ticket", {
  saveTicket: async (data) => {
    const res = await ipcRenderer.invoke("saveTicket", data);
    return res;
  },

  listTicket: async (data) => {
    const res = await ipcRenderer.invoke("listTicket", data);
    return res;
  },

  editTicket: async (data) => {
    const res = await ipcRenderer.invoke("editTicket", data);
    return res;
  },

  deleteTicket: async (data) => {
    await ipcRenderer.invoke("deleteTicket", data);
  },

  filterTicket: async (data) => {
    const res = await ipcRenderer.invoke("filterTicket", data);
    return res;
  },

  getTotalTickets: async () => {
    const res = await ipcRenderer.invoke("getTotalTickets");
    return res;
  },
});

// Page
contextBridge.exposeInMainWorld("page", {
  reloadWindow: async () => {
    await ipcRenderer.invoke("reloadWindow");
  },
});

// Database
contextBridge.exposeInMainWorld("database", {
  exportDatabase: async () => {
    await ipcRenderer.invoke("exportDatabase");
  },

  importDatabase: async () => {
    const resp = await ipcRenderer.invoke("importDatabase");
    return resp;
  },
});

// User
contextBridge.exposeInMainWorld("user", {
  signIn: async (data) => {
    const resp = await ipcRenderer.invoke("signIn", data);
    return resp;
  },

  isFirstUser: async () => {
    return await ipcRenderer.invoke("isFirstUser");
  },
});

contextBridge.exposeInMainWorld("config", {
  setDefaultPass: async (data) => {
    const resp = await ipcRenderer.invoke("setDefaultPass", data);
    return resp;
  },

  comparePass: async (data) => {
    const resp = await ipcRenderer.invoke("comparePass", data);
    return resp;
  },

  hasDefaultPass: async (data) => {
    const resp = await ipcRenderer.invoke("hasDefaultPass", data);
    return resp;
  },

  changePass: async (data) => {
    const resp = await ipcRenderer.invoke("changePass", data);
    return resp;
  },
});
