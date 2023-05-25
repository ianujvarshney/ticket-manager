import { FormEvent, useState } from "react";
import { Input } from "../Input";

export function FormNewTicket() {
  const userId = "3469ca96-4517-474c-8001-8363da836c5e";
  const [recipient, setRecipient] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketValue, setTicketValue] = useState(0);
  const [paymentPlace, setPaymentPlace] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [expiryDate, setExpiryDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  async function handleSaveTicket(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      recipient,
      ticketNumber,
      ticketValue,
      paymentPlace,
      isPaid,
      expiryDate,
      userId,
    };

    const res = await (window as any).ticket.saveTicket(data);
    console.log(res);
  }

  return (
    <form onSubmit={(e) => handleSaveTicket(e)}>
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
        <label htmlFor="is-paid">Pago</label>
        <Input
          type="checkbox"
          name="is-paid"
          id="is-paid"
          checked={isPaid}
          onChange={(e) => setIsPaid(e.target.checked)}
        />
      </div>

      <button type="submit">Salvar Boleto</button>
    </form>
  );
}
