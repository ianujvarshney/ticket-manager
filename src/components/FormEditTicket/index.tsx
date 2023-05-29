import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { TicketProps } from "../TicketList";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, Controller } from "react-hook-form";

type Props = {
  ticket: TicketProps;
};

type FormData = {
  recipient: string;
  ticket_number: string;
  ticket_value: number;
  payment_place: string;
  is_paid: boolean;
  expiry_date: string;
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
});

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function FormEditTicket({ ticket }: Props) {
  const userId = "3469ca96-4517-474c-8001-8363da836c5e";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: ticket.recipient,
      ticket_value: ticket.value / 100,
      payment_place: ticket.payment_place,
      expiry_date: ticket.expiry_date.toISOString().slice(0, 10),
      is_paid: ticket.is_paid,
      ticket_number: ticket.document_number
        .replaceAll(".", "")
        .replaceAll(" ", ""),
    },
  });

  async function onSubmit(formValues: FormData) {
    const data = {
      id: ticket.id,
      recipient: formValues.recipient,
      ticketNumber: formValues.ticket_number,
      ticketValue: formValues.ticket_value * 100,
      paymentPlace: formValues.payment_place,
      isPaid: formValues.is_paid,
      expiryDate: formValues.expiry_date,
      userId,
    };

    const res = await (window as any).ticket.editTicket(data);
    console.log(res);

    document.location.reload();
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
            <Input
              type="text"
              id="ticket_number"
              mask="99999.99999 99999.999999 99999.999999 9 99999999999999"
              {...field}
            />
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

        <div className="flex gap-2 items-center justify-start">
          <label htmlFor="is_paid">Pago</label>
          <input
            type="checkbox"
            className="rounded-sm checked:text-purple-500"
            id="is_paid"
            {...register("is_paid")}
          />
        </div>

        {/* 


        


        <Input
          type="text"
          placeholder="Local do pagamento"
          id="payment_place"
          value={paymentPlace}
          register={() => register("payment_place")}
        />

        <div className="">
          <Input
            type="checkbox"
            id="isPaid"
            checked={isPaid}
            label="Pago"
            register={() => register("isPaid")}
          />
        </div> */}
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
