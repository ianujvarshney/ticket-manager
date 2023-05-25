import { useEffect, useState } from "react";
import { Plus } from "phosphor-react";
import { Modal } from "../Modal";
import * as Dialog from "@radix-ui/react-dialog";
import { FormNewTicket } from "../FormNewTicket";

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

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
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
      <div className="flex items-center justify-between px-4 mb-4">
        <h1 className="text-lg font-bold">TicketList</h1>

        <Dialog.Root modal>
          <div>
            <Dialog.Trigger
              className="
              flex gap-2 border border-purple-400 px-4 py-1 items-center rounded-sm 
              hover:bg-purple-500 transition-colors"
            >
              <Plus />
              Cria Novo
            </Dialog.Trigger>
          </div>

          <Modal title="Adicionar novo boleto">
            <FormNewTicket />
          </Modal>
        </Dialog.Root>
      </div>

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

                <td className="px-4">
                  {priceFormatter.format(ticket.value / 100)}
                </td>

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
