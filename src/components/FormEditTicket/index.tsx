import { Input } from "../Input";
import { TicketProps } from "../TicketList";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "../../hooks/UserContext";
import { useTickets } from "../../hooks/TicketContext";

type Props = {
  ticket: TicketProps;
};

type FormData = {
  recipient: string;
  ticket_number: string;
  ticket_value: string;
  payment_place: string;
  is_paid: boolean;
  expiry_date: string;
  is_online: boolean;
};

const schema = z.object({
  recipient: z
    .string()
    .nonempty({ message: "Esse campo não pode ficar vazio" }),
  ticket_number: z.string(),
  ticket_value: z.string(),
  payment_place: z.string(),
  is_paid: z.boolean(),
  expiry_date: z.string(),
  is_online: z.boolean(),
});

export function FormEditTicket({ ticket }: Props) {
  const { state } = useUserContext();
  const { actions: ticketActions, state: ticketState } = useTickets();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: ticket.recipient,
      ticket_value: String(ticket.value / 100),
      payment_place: ticket.payment_place,
      expiry_date: ticket.expiry_date.toISOString().slice(0, 10),
      is_paid: ticket.is_paid,
      is_online: ticket.is_online,
      ticket_number: ticket.document_number,
    },
  });

  async function onSubmit(formValues: FormData) {
    const data = {
      id: ticket.id,
      recipient: formValues.recipient,
      ticketNumber: formValues.ticket_number,
      ticketValue: Math.round(Number(formValues.ticket_value) * 100),
      paymentPlace: formValues.payment_place,
      isPaid: formValues.is_paid,
      isOnline: formValues.is_online,
      expiryDate: formValues.expiry_date,
      userId: state.user.id,
    };

    await (window as any).ticket.editTicket(data);

    ticketActions.setTickets(ticketState.page);
  }

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex flex-col"
    >
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        <Controller
          name="recipient"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="recipient"
              placeholder="Beneficiário"
              error={errors?.recipient?.message ?? ""}
              {...field}
            />
          )}
        />

        <Controller
          name="expiry_date"
          control={control}
          render={({ field }) => (
            <Input type="date" id="expiry_date" {...field} />
          )}
        />

        <Controller
          name="ticket_number"
          control={control}
          render={({ field }) => (
            <Input type="text" id="ticket_number" {...field} />
          )}
        />

        <Controller
          name="ticket_value"
          control={control}
          render={({ field }) => (
            <Input type="number" id="ticket_value" {...field} />
          )}
        />

        <Controller
          name="payment_place"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Local do pagamento"
              id="payment_place"
              {...field}
            />
          )}
        />

        <div className="flex items-center justify-start gap-2">
          <label htmlFor="is_paid">Pago</label>
          <input
            type="checkbox"
            className="rounded-sm checked:text-purple-500"
            id="is_paid"
            {...register("is_paid")}
          />

          <label htmlFor="is_online">Online</label>
          <input
            type="checkbox"
            className="rounded-sm checked:text-purple-500"
            id="is_online"
            {...register("is_online")}
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
