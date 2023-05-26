import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "phosphor-react";
import { Modal } from "../Modal";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FormNewTicket } from "../FormNewTicket";
import { FormEditTicket } from "../FormEditTicket";
import { AlertModal } from "../AlertModal";

export type TicketProps = {
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<TicketProps | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<TicketProps | null>(
    null
  );

  async function getTickets() {
    const res = await (window as any).ticket.listTicket();
    setTickets(res);
  }

  function handleEditTicket(ticket: TicketProps) {
    setIsEditModalOpen(true);
    setEditModalData(ticket);
  }

  async function handleDeleteTicket(ticket: TicketProps) {
    setDeleteModalData(ticket);
  }

  async function confirmTicketDelete() {
    await (window as any).ticket.deleteTicket(deleteModalData);
    location.reload();
  }

  async function handleTogglePayment(ticket: TicketProps) {
    const userId = "3469ca96-4517-474c-8001-8363da836c5e";
    const isPaid = !ticket.is_paid;

    const newTicket = {
      id: ticket.id,
      recipient: ticket.recipient,
      ticketNumber: ticket.document_number,
      ticketValue: ticket.value,
      paymentPlace: ticket.payment_place,
      isPaid,
      expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
      userId,
    };

    await (window as any).ticket.editTicket(newTicket);

    location.reload();
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
            <td className="whitespace-nowrap font-bold px-4">Editar</td>

            <td className="whitespace-nowrap font-bold px-4">Excluir</td>

            <td className="whitespace-nowrap font-bold px-4">Beneficiário</td>
            <td className="whitespace-nowrap font-bold px-4">
              Número do documento
            </td>
            <td className="whitespace-nowrap font-bold px-4">
              Data de vencimento
            </td>
            <td className="whitespace-nowrap font-bold px-4">Valor</td>
            <td className="whitespace-nowrap font-bold px-4">
              Local de pagamento
            </td>
            <td className="whitespace-nowrap font-bold px-4">Pago</td>
          </tr>
        </thead>
        <Dialog.Root>
          <AlertDialog.Root>
            <tbody>
              {tickets.map((ticket) => {
                const date = dateFormat.format(new Date(ticket.expiry_date));

                return (
                  <tr key={ticket.id}>
                    <td className="flex items-center justify-center">
                      <Dialog.Trigger onClick={() => handleEditTicket(ticket)}>
                        <Pencil />
                      </Dialog.Trigger>
                    </td>

                    <td align="center">
                      <AlertDialog.Trigger
                        onClick={() => handleDeleteTicket(ticket)}
                      >
                        <Trash />
                      </AlertDialog.Trigger>
                    </td>

                    <td className="px-4">{ticket.recipient}</td>
                    <td className="px-4">{ticket.document_number}</td>
                    <td className="px-4">
                      <time>{date}</time>
                    </td>

                    <td className="px-4">
                      {priceFormatter.format(ticket.value / 100)}
                    </td>

                    <td className="px-4">{ticket.payment_place}</td>

                    <td className="px-4 py-2 flex justify-center items-center">
                      <input
                        type="checkbox"
                        name="is_paid"
                        id="is_paid"
                        checked={ticket.is_paid}
                        onChange={(e) => handleTogglePayment(ticket)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <Modal title="Editar Boleto">
              {editModalData && <FormEditTicket ticket={editModalData} />}
            </Modal>

            {deleteModalData && (
              <AlertModal
                title="Deletar boleto?"
                onConfirm={confirmTicketDelete}
              >
                O Boleto de nº{" "}
                <span className="font-bold">
                  {deleteModalData.document_number}
                </span>
                , do beneficiário{" "}
                <span className="font-bold">{deleteModalData.recipient}</span>{" "}
                será apagado de forma permanente, você deseja continuar?
              </AlertModal>
            )}
          </AlertDialog.Root>
        </Dialog.Root>
      </table>
    </div>
  );
}
