import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { useUserContext } from "../../hooks/UserContext";
import { useTickets } from "../../hooks/TicketContext";

export function FormNewTicket() {
  const { state } = useUserContext();
  const { actions: ticketActions } = useTickets();

  const userId = state.user.id;
  const [recipient, setRecipient] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketValue, setTicketValue] = useState(0);
  const [paymentPlace, setPaymentPlace] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
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
      isOnline,
      expiryDate,
      userId,
    };

    try {
      await (window as any).ticket.saveTicket(data);
      setRecipient("");
      setTicketNumber("");
      setTicketValue(0);
      setPaymentPlace("");
      setIsPaid(false);
      setIsOnline(false);
      setExpiryDate(new Date().toISOString().slice(0, 10));

      ticketActions.refreshTickets();
    } catch (err) {
      alert("Aconteceu algum erro ao salvar, tente novamente!");
    }
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
          type="number"
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

        <div className="flex items-center">
          <Input
            type="checkbox"
            name="is-paid"
            id="is-paid"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            label="Pago"
          />

          <Input
            type="checkbox"
            name="is-online"
            id="is-online"
            checked={isOnline}
            onChange={(e) => setIsOnline(e.target.checked)}
            label="On-line"
          />
        </div>
      </div>

      <footer className="mt-10 flex items-center justify-center">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-sm border border-purple-400 px-4 py-1 
              transition-colors hover:bg-purple-500 hover:text-white"
        >
          Salvar Boleto
        </button>
      </footer>
    </form>
  );
}
