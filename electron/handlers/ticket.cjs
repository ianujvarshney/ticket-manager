const { prisma } = require("../lib/prisma.cjs");
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

const editTicketHandler = async (event, data) => {
  const { id } = data;
  const dataSchema = z.object({
    recipient: z.string(),
    ticketNumber: z.string(),
    ticketValue: z.number(),
    paymentPlace: z.string(),
    isPaid: z.boolean(),
    expiryDate: z.string(),
    userId: z.string(),
  });

  const {
    expiryDate,
    isPaid,
    paymentPlace,
    recipient,
    ticketNumber,
    ticketValue,
    userId,
  } = dataSchema.parse(data);

  try {
    let ticket = await prisma.ticket.findUniqueOrThrow({
      where: {
        id,
      },
    });

    ticket = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        document_number: ticketNumber,
        expiry_date: new Date(expiryDate),
        is_paid: isPaid,
        payment_place: paymentPlace,
        recipient,
        value: ticketValue,
        userId,
      },
    });

    return ticket;
  } catch (err) {
    return err;
  }
};

const deleteTicketHandler = async (event, data) => {
  const dataSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = dataSchema.parse(data);

    const ticket = prisma.ticket.findFirstOrThrow({
      where: {
        id,
      },
    });

    if (!ticket) return { message: "Erro ao deletar boleto!" };

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    return err;
  }
};

const listTicketHandler = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: [
      {
        expiry_date: "asc",
      },
    ],
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return tickets;
};

const filterTicketHandler = async (event, data) => {
  console.log(data);
  const tickets = await prisma.ticket.findMany({
    orderBy: [
      {
        expiry_date: "asc",
      },
    ],

    where: {
      is_paid: data.is_paid,
      recipient: {
        contains: data.recipient,
      },
    },
  });

  return tickets;
};

module.exports = {
  saveTicketHandler,
  listTicketHandler,
  editTicketHandler,
  deleteTicketHandler,
  filterTicketHandler,
};
