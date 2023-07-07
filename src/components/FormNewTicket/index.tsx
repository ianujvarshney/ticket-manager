import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { useUserContext } from "../../hooks/UserContext";

export function FormNewTicket() {
  const { state } = useUserContext();

  const userId = state.user.id;
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
    const value = ticketValue * 100;

    const data = {
      recipient,
      ticketNumber,
      ticketValue: value,
      paymentPlace,
      isPaid,
      expiryDate,
      userId,
    };

    await (window as any).ticket.saveTicket(data);

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
          mask="99999.99999 99999.999999 99999.999999 9 99999999999999"
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

      <footer className="mt-10 flex items-center justify-center">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-sm border border-purple-400 px-4 py-1 
              transition-colors hover:bg-purple-500"
        >
          Salvar Boleto
        </button>
      </footer>
    </form>
  );
}
