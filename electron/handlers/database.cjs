const { dialog } = require("electron");
const path = require("path");
const fs = require("fs");

const exportDatabase = async () => {
  try {
    const file = await dialog.showSaveDialog({
      filters: [
        {
          name: "Database",
          extensions: ["DB"],
        },
      ],
      properties: ["showOverwriteConfirmation", "createDirectory"],
      buttonLabel: "Exportar",
    });

    const database = path.join(__dirname, "..", "..", "prisma", "dev.db");

    fs.copyFile(database, file.filePath.toString(), (e) => {
      console.log(e);
    });

    console.log(file);
  } catch (e) {
    console.log("error: " + e.message);
  }
};

module.exports = {
  exportDatabase,
};
