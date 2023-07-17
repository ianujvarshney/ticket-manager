import { TicketProps } from "../components/TicketList";

export function parseTicket(ticket: TicketProps) {
  const parseTicket = {
    id: ticket.id,
    recipient: ticket.recipient,
    ticketNumber: ticket.document_number,
    ticketValue: ticket.value,
    paymentPlace: ticket.payment_place,
    isPaid: ticket.is_paid,
    expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
  };

  return parseTicket;
}
