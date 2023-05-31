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
    await ipcRenderer.invoke("filterTicket", data);
  },
});

contextBridge.exposeInMainWorld("page", {
  reloadWindow: async () => {
    await ipcRenderer.invoke("reloadWindow");
  },
});
