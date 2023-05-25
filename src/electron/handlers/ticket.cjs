const { prisma } = require("../../lib/prisma.cjs");

const saveTicketHandler = async (event, data) => {
  console.log(data);

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
