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
              className={`flex min-h-[calc(100vh_-_200px)] w-full flex-col items-center p-4`}
              ref={contentRef}
            >
              <table className="w-[85%] border">
                <thead>
                  <tr className="mb-1 border-b border-zinc-900 pb-1">
                    <td className="font-bold">Beneficiário</td>
                    <td className="font-bold">Valor</td>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.recipient}</td>
                      <td>{priceFormatter.format(ticket.value / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="flex items-center justify-end px-4">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-sm border border-purple-400 px-4 py-1 text-purple-500 
                  transition-colors hover:bg-purple-500 hover:text-white"
              >
                Imprimir
              </button>
            </footer>
          </>
        </Modal>

        <Dialog.Trigger className="flex items-center gap-2">
          Imprimir <Printer />
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export function PrinterButton({ children }: ButtonProps) {
  return <button onClick={print}>{children}</button>;
}
