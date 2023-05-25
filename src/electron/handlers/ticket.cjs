const { prisma } = require("../../lib/prisma.cjs");
const z = require("zod");

const saveTicketHandler = async (event, data) => {
  const {
    recipient,
    ticketNumber,
    ticketValue,
    paymentPlace,
    isPaid,
    expiryDate,
    userId,
  } = data;

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        document_number: ticketNumber,
        expiry_date: new Date(expiryDate),
        payment_place: paymentPlace,
        recipient,
        value: ticketValue,
        is_paid: isPaid,
        userId,
      },
    });

    return newTicket;
  } catch (err) {
    console.log("ERROR: " + err);
  }
};

const listTicketHandler = async () => {
  const tickets = await prisma.ticket.findMany();
  return tickets;
};

module.exports = {
  saveTicketHandler,
  listTicketHandler,
};
