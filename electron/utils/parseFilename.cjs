function parseFileName(fileName) {
  return fileName.replaceAll(" ", "_").replaceAll("-", "_").toLowerCase();
}

module.exports = {
  parseFileName,
};
