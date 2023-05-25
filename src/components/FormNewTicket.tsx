import { FormEvent } from "react";

export function FormNewTicket() {
  const userId = "3469ca96-4517-474c-8001-8363da836c5e";

  async function handleSaveTicket(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await (window as any).ticket.saveTicket("Valor qualquer");
    console.log(res);
  }

  return (
    <form onSubmit={(e) => handleSaveTicket(e)}>
      <input type="text" placeholder="Beneficiário" />
      <input
        type="date"
        name="expiry_date"
        id="expiry_date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className="text-black"
      />
      <input type="text" placeholder="Número do documento" />
      <input type="text" placeholder="Valor" />
      <input type="text" placeholder="Local do pagamento" />

      <div className="">
        <label htmlFor="is-paid">Pago</label>
        <input type="checkbox" name="is-paid" id="is-paid" />
      </div>

      <button type="submit">Salvar Boleto</button>
    </form>
  );
}
