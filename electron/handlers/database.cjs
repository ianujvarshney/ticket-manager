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

const importDatabase = async () => {
  try {
    const file = await dialog.showOpenDialog({
      filters: [
        {
          name: "Database",
          extensions: ["DB"],
        },
      ],
      buttonLabel: "Importar",
      properties: ["openFile"],
    });

    const databasePath = path.join(__dirname, "..", "..", "prisma");

    if (!file.canceled && file.filePaths.length > 0) {
      if (!fs.existsSync(databasePath)) {
        await fs.promises.mkdir(databasePath);
      }

      await fs.promises.copyFile(
        file.filePaths[0],
        path.join(__dirname, "..", "..", "prisma", "dev.db"),
        fs.promises.constants.COPYFILE_FICLONE,
        (err) => {
          if (err) {
            console.log("Aconteceu algo errado: " + err.message);
            return;
          }
        }
      );
    }

    console.log(`${file.filePaths[0]} copied to ${databasePath}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  exportDatabase,
  importDatabase,
};
