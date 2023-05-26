import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { TicketProps } from "../TicketList";

type Props = {
  ticket: TicketProps;
};

export function FormEditTicket({ ticket }: Props) {
  const userId = "3469ca96-4517-474c-8001-8363da836c5e";
  const [recipient, setRecipient] = useState(ticket.recipient);
  const [ticketNumber, setTicketNumber] = useState(ticket.document_number);
  const [ticketValue, setTicketValue] = useState(ticket.value / 100);
  const [paymentPlace, setPaymentPlace] = useState(ticket.payment_place);
  const [isPaid, setIsPaid] = useState(ticket.is_paid);
  const [expiryDate, setExpiryDate] = useState(
    ticket.expiry_date.toISOString().slice(0, 10)
  );

  async function handleSaveTicket(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = ticketValue * 100;

    const data = {
      id: ticket.id,
      recipient,
      ticketNumber,
      ticketValue: value,
      paymentPlace,
      isPaid,
      expiryDate,
      userId,
    };

    const res = await (window as any).ticket.editTicket(data);
    console.log(res);

    document.location.reload();
  }

  return (
    <form onSubmit={(e) => handleSaveTicket(e)} className="flex flex-col">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        <Input
          type="text"
          placeholder="Beneficiário"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          name="recipient"
          id="recipient"
        />

        <Input
          type="date"
          name="expiry_date"
          id="expiry_date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Número do documento"
          name="ticket_number"
          id="ticket_number"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Valor"
          name="ticket_value"
          id="ticket_value"
          value={ticketValue}
          onChange={(e) => setTicketValue(Number(e.target.value))}
        />

        <Input
          type="text"
          placeholder="Local do pagamento"
          name="payment_place"
          id="payment_place"
          value={paymentPlace}
          onChange={(e) => setPaymentPlace(e.target.value)}
        />

        <div className="">
          <Input
            type="checkbox"
            name="is-paid"
            id="is-paid"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            label="Pago"
          />
        </div>
      </div>

      <footer className="flex items-center justify-center mt-10">
        <button
          type="submit"
          className="flex gap-2 border border-purple-400 px-4 py-1 items-center rounded-sm 
              hover:bg-purple-500 transition-colors"
        >
          Salvar Boleto
        </button>
      </footer>
    </form>
  );
}
