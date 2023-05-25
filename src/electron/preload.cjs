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
});
