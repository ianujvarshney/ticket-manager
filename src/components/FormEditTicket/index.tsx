import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { TicketProps } from "../TicketList";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

type Props = {
  ticket: TicketProps;
};

const schema = z.object({
  recipient: z.string({ required_error: "O nome não pode estar vazio" }),
  ticketNumber: z.string(),
  ticketValue: z.number().positive(),
  paymentPlace: z.string(),
  isPaid: z.boolean(),
  expiryDate: z.string(),
});

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function FormEditTicket({ ticket }: Props) {
  const userId = "3469ca96-4517-474c-8001-8363da836c5e";
  const [recipient, setRecipient] = useState(ticket.recipient);
  const [ticketNumber, setTicketNumber] = useState(ticket.document_number);
  const [ticketValue, setTicketValue] = useState(ticket.value / 100);
  const [paymentPlace, setPaymentPlace] = useState(ticket.payment_place);
  const [isPaid, setIsPaid] = useState(ticket.is_paid);
  const [expiryDate, setExpiryDate] = useState(
    ticket.expiry_date.toISOString().slice(0, 10)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleSaveTicket() {
    console.log(errors);
    // // e: FormEvent<HTMLFormElement>
    // e.preventDefault();
    // const value = ticketValue * 100;
    // const data = {
    //   id: ticket.id,
    //   recipient,
    //   ticketNumber,
    //   ticketValue: value,
    //   paymentPlace,
    //   isPaid,
    //   expiryDate,
    //   userId,
    // };
    // const res = await (window as any).ticket.editTicket(data);
    // console.log(res);
    // document.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(handleSaveTicket)} className="flex flex-col">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        <Input
          type="text"
          placeholder="Beneficiário"
          id="recipient"
          register={() => register("recipient")}
          name="recipient"
        />

        <Input
          type="date"
          id="expiry_date"
          value={expiryDate}
          name="ticket_value"
          register={() => register("expiry_date")}
        />

        <Input
          type="text"
          placeholder="Número do documento"
          id="ticket_number"
          mask="99999.99999 99999.999999 99999.999999 9 99999999999999"
          value={ticketNumber}
          name="ticket_number"
          register={() => register("ticket_number")}
        />

        <Input
          type="text"
          placeholder="Valor"
          id="ticket_value"
          value={ticketValue}
          name="ticket_value"
          register={() => register("ticket_value")}
        />

        <Input
          type="text"
          placeholder="Local do pagamento"
          id="payment_place"
          value={paymentPlace}
          name="payment_place"
          register={() => register("payment_place")}
        />

        <div className="">
          <Input
            type="checkbox"
            id="isPaid"
            name="isPaid"
            checked={isPaid}
            label="Pago"
            register={() => register("isPaid")}
          />
        </div>
      </div>

      <footer className="flex items-center justify-center mt-10">
        <button
          type="submit"
          className="flex gap-2 border border-purple-400 px-4 py-1 items-center rounded-sm 
              hover:bg-purple-500 hover:text-white transition-colors"
        >
          Salvar Boleto
        </button>
      </footer>
    </form>
  );
}
