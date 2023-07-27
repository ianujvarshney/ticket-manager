import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash, CopySimple, Repeat } from "phosphor-react";
import { Modal } from "../Modal";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FormNewTicket } from "../FormNewTicket";
import { FormEditTicket } from "../FormEditTicket";
import { AlertModal } from "../AlertModal";
import { Toast } from "../Toast";
import { ReactToPrint } from "../ReactToPrint";
import { useTickets } from "../../hooks/TicketContext";
import { Button } from "../Button";
import { useUserContext } from "../../hooks/UserContext";

export type TicketProps = {
  id: string;
  document_number: string;
  expiry_date: Date;
  is_paid: boolean;
  payment_place: string;
  recipient: string;
  value: number;
  is_online: boolean;
  user: {
    name: string;
  };
};

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function TicketList() {
  const { state, actions } = useTickets();
  const { state: userState } = useUserContext();

  const [editModalData, setEditModalData] = useState<TicketProps | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<TicketProps | null>(
    null
  );
  const [isToastOpen, setIsToastOpen] = useState(false);
  const TOTAL_PRICE = state.tickets.reduce(
    (buffer, ticket) => (buffer += ticket.value / 100),
    0
  );

  const timerRef = useRef<any>(0);

  function handleEditTicket(ticket: TicketProps) {
    setEditModalData(ticket);
  }

  async function handleDeleteTicket(ticket: TicketProps) {
    setDeleteModalData(ticket);
  }

  async function confirmTicketDelete() {
    await (window as any).ticket.deleteTicket(deleteModalData);
    location.reload();
  }

  async function handleTogglePayment(ticket: TicketProps & { userId: string }) {
    const isPaid = !ticket.is_paid;

    const newTicket = {
      id: ticket.id,
      recipient: ticket.recipient,
      ticketNumber: ticket.document_number,
      ticketValue: ticket.value,
      paymentPlace: ticket.payment_place,
      isPaid,
      isOnline: ticket.is_online,
      expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
      userId: ticket.userId,
    };

    await (window as any).ticket.editTicket(newTicket);
    actions.refreshTickets();
  }

  async function handleToggleOnline(ticket: TicketProps & { userId: string }) {
    const isOnline = !ticket.is_online;

    const newTicket = {
      id: ticket.id,
      recipient: ticket.recipient,
      ticketNumber: ticket.document_number,
      ticketValue: ticket.value,
      paymentPlace: ticket.payment_place,
      isPaid: ticket.is_paid,
      isOnline,
      expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
      userId: ticket.userId,
    };

    await (window as any).ticket.editTicket(newTicket);

    actions.refreshTickets();
  }

  async function handleChangePlace(
    place: string,
    ticket: TicketProps & { userId: string }
  ) {
    const editedTicket = {
      id: ticket.id,
      recipient: ticket.recipient,
      ticketNumber: ticket.document_number,
      ticketValue: ticket.value,
      paymentPlace: place,
      isPaid: ticket.is_paid,
      isOnline: ticket.is_online,
      expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
      userId: ticket.userId,
    };

    try {
      await (window as any).ticket.editTicket(editedTicket);
    } catch (err) {
      alert("Não foi possível salvar as alterações, tente novamente");
    }
  }

  async function handleDuplicateTicket(ticket: TicketProps) {
    const newTicket = {
      id: ticket.id,
      recipient: ticket.recipient,
      ticketNumber: ticket.document_number,
      ticketValue: ticket.value,
      paymentPlace: ticket.payment_place,
      isPaid: ticket.is_paid,
      isOnline: ticket.is_online,
      expiryDate: ticket.expiry_date.toISOString().slice(0, 10),
      userId: userState.user.id,
    };

    await (window as any).ticket.saveTicket(newTicket);
    actions.refreshTickets();
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="max-h-[calc(100vh_-_100px)] overflow-auto pb-10">
      <div className="mb-4 flex items-center justify-between px-4">
        <div className="flex flex-1 justify-between pr-4">
          <h1 className="text-lg font-bold ">TicketList</h1>
          <ReactToPrint tickets={state.tickets} />
        </div>

        <Dialog.Root modal>
          <div>
            <Dialog.Trigger asChild>
              <Button>
                <Plus />
                Cria Novo
              </Button>
            </Dialog.Trigger>
          </div>

          <Modal title="Adicionar novo boleto">
            <FormNewTicket />
          </Modal>
        </Dialog.Root>
      </div>
      {state.tickets.length ? (
        <table border={1} className="border-gray-50 text-sm">
          <thead>
            <tr className="">
              <td className="whitespace-nowrap px-2 font-bold">Editar</td>

              <td className="whitespace-nowrap px-2 font-bold">Excluir</td>

              <td className="whitespace-nowrap px-2 font-bold">Duplicar</td>

              <td className="whitespace-nowrap px-4 font-bold">Beneficiário</td>
              <td className="whitespace-nowrap px-4 font-bold">
                Nº do documento
              </td>
              <td className="whitespace-nowrap px-4 font-bold">Vencimento</td>
              <td className="whitespace-nowrap px-4 font-bold">Valor</td>
              <td className="whitespace-nowrap px-4 font-bold">
                Local de pagamento
              </td>
              <td className="whitespace-nowrap px-4 font-bold">Pago</td>
              <td className="whitespace-nowrap px-4 font-bold">Online</td>
              <td className="whitespace-nowrap px-4 font-bold">Autor</td>
            </tr>
          </thead>

          <Dialog.Root>
            <AlertDialog.Root>
              <tbody>
                {state.tickets.map((ticket) => {
                  const date = dateFormat.format(new Date(ticket.expiry_date));

                  return (
                    <tr key={ticket.id}>
                      <td align="center">
                        <Dialog.Trigger
                          onClick={() => handleEditTicket(ticket)}
                        >
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

                      <td align="center">
                        <button onClick={() => handleDuplicateTicket(ticket)}>
                          <Repeat />
                        </button>
                      </td>

                      <td className="px-4">{ticket.recipient}</td>

                      <td className="px-4">
                        <div className="flex w-[120px] items-center gap-2 overflow-hidden">
                          <button
                            type="button"
                            title="Copiar para o Clipboard"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                ticket.document_number
                              );

                              clearTimeout(timerRef.current);
                              timerRef.current = setTimeout(() => {
                                setIsToastOpen(true);
                              }, 2000);
                            }}
                          >
                            <CopySimple />
                          </button>

                          <p className="line-clamp-1">
                            {ticket.document_number.slice(0, 20)}
                          </p>
                        </div>
                      </td>

                      <td className="px-4">
                        <time>{date}</time>
                      </td>

                      <td className="px-4">
                        {priceFormatter.format(ticket.value / 100)}
                      </td>

                      <td className="max-w-[200px] px-2">
                        <input
                          type="text"
                          name="payment_place"
                          id="payment_place"
                          defaultValue={ticket.payment_place}
                          className="ring-none max-w-full border-b border-transparent border-b-purple-500 bg-transparent"
                          onChange={(e) =>
                            handleChangePlace(
                              e.target.value,
                              ticket as TicketProps & { userId: string }
                            )
                          }
                        />
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            name="is_paid"
                            id="is_paid"
                            checked={ticket.is_paid}
                            onChange={() =>
                              handleTogglePayment(
                                ticket as TicketProps & { userId: string }
                              )
                            }
                            className="rounded-sm text-purple-500"
                          />
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            name="is_online"
                            id="is_online"
                            checked={ticket.is_online}
                            onChange={() =>
                              handleToggleOnline(
                                ticket as TicketProps & { userId: string }
                              )
                            }
                            className="rounded-sm text-purple-500"
                          />
                        </div>
                      </td>

                      <td className="max-w-[124px] overflow-hidden text-ellipsis whitespace-nowrap px-4">
                        {ticket.user.name}
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
      ) : (
        <div className="flex w-full items-center justify-center rounded-md bg-zinc-700 py-10">
          <h3>
            Nenhum boleto encontrado, verifique os filtros, ou comece a
            cadastrar!
          </h3>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 flex w-full flex-1 justify-end p-4 pr-12">
        <span>Total: {priceFormatter.format(TOTAL_PRICE)}</span>
      </footer>

      <Toast
        title="Copiado!"
        description="Texto Copiado para a área de transferência"
        isOpen={isToastOpen}
        onOpenChange={setIsToastOpen}
      />
    </div>
  );
}
