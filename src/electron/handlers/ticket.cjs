const { prisma } = require("../../lib/prisma.cjs");

const saveTicketHandler = async (event, data, data2) => {
  console.log(data, data2);

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log("ERROR: " + err);
  }
};

module.exports = {
  saveTicketHandler,
};
