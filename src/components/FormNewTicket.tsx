import { FormEvent, useState } from "react";

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
      <input
        type="text"
        placeholder="Beneficiário"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        name="recipient"
      />

      <input
        type="date"
        name="expiry_date"
        id="expiry_date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Número do documento"
        name="ticket_number"
        value={ticketNumber}
        onChange={(e) => setTicketNumber(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        name="ticket_value"
        value={ticketValue}
        onChange={(e) => setTicketValue(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Local do pagamento"
        value={paymentPlace}
        onChange={(e) => setPaymentPlace(e.target.value)}
      />

      <div className="">
        <label htmlFor="is-paid">Pago</label>
        <input
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
