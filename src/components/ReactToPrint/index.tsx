import { ReactNode, useRef, useState } from "react";
import { TicketProps } from "../TicketList";
import { useReactToPrint } from "react-to-print";
import { Printer } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "../Modal";

type Props = {
  tickets: TicketProps[];
};

type ButtonProps = {
  children: ReactNode;
};

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ReactToPrint({ tickets }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: "Boletos",
    onAfterPrint: () => setIsOpen(false),
  });

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal title="Imprimir Boleto">
          <>
            <div
              className={`flex flex-col items-center p-4 w-full min-h-[calc(100vh_-_200px)]`}
              ref={contentRef}
            >
              <table className="w-[85%]">
                <thead>
                  <tr>
                    <td className="font-bold">Beneficiário</td>
                    <td className="font-bold">Local de Pagamento</td>
                    <td className="font-bold">Valor</td>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.recipient}</td>
                      <td>{ticket.payment_place}</td>
                      <td>{priceFormatter.format(ticket.value / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="px-4 flex justify-end items-center">
              <button
                onClick={handlePrint}
                className="flex gap-2 border border-purple-400 text-purple-500 px-4 py-1 items-center rounded-sm 
                  hover:bg-purple-500 hover:text-white transition-colors"
              >
                Imprimir
              </button>
            </footer>
          </>
        </Modal>

        <Dialog.Trigger className="flex gap-2 items-center">
          Imprimir <Printer />
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export function PrinterButton({ children }: ButtonProps) {
  return <button onClick={print}>{children}</button>;
}
