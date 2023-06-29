const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ticket", {
  saveTicket: async (data) => {
    const res = await ipcRenderer.invoke("saveTicket", data);
    return res;
  },

  listTicket: async () => {
    const res = await ipcRenderer.invoke("listTicket");
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
});

contextBridge.exposeInMainWorld("page", {
  reloadWindow: async () => {
    await ipcRenderer.invoke("reloadWindow");
  },
});

contextBridge.exposeInMainWorld("database", {
  exportDatabase: async () => {
    await ipcRenderer.invoke("exportDatabase");
  },

  importDatabase: async () => {
    const resp = await ipcRenderer.invoke("importDatabase");
    return resp;
  },
});
