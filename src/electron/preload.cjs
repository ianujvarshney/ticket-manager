const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ticket", {
  saveTicket: async () => {
    const res = await ipcRenderer.invoke("saveTicket");
    return res;
  },
});
