import { useEffect, useState } from "react";

type TicketProps = {
  id: string;
  document_number: string;
  expiry_date: Date;
  is_paid: boolean;
  payment_place: string;
  recipient: string;
  value: number;
};

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export function TicketList() {
  const [tickets, setTickets] = useState<TicketProps[]>([]);

  async function getTickets() {
    const res = await (window as any).ticket.listTicket();
    setTickets(res);
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div>
      <h1>TicketList</h1>

      <table border={1} className="border-gray-50">
        <thead>
          <tr className="">
            <td className="font-bold px-4">Beneficiário</td>
            <td className="font-bold px-4">Número do documento</td>
            <td className="font-bold px-4">Data de vencimento</td>
            <td className="font-bold px-4">Valor</td>
            <td className="font-bold px-4">Local de pagamento</td>
            <td className="font-bold px-4">Pago</td>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => {
            const date = dateFormat.format(new Date(ticket.expiry_date));

            return (
              <tr>
                <td className="px-4">{ticket.recipient}</td>
                <td className="px-4">{ticket.document_number}</td>
                <td className="px-4">
                  <time>{date}</time>
                </td>
                <td className="px-4">{ticket.value}</td>
                <td className="px-4">{ticket.payment_place}</td>
                <td className="px-4">
                  <input
                    type="checkbox"
                    name="is_paid"
                    id="is_paid"
                    checked={ticket.is_paid}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
