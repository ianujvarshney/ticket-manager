import { useState } from "react";
import { List, X, DownloadSimple, Export } from "phosphor-react";
import { useTickets } from "../../hooks/TicketContext";
import { Input } from "../Input";
import { Button } from "../Button";
import { UserProfile } from "../Profile";
import { useUserContext } from "../../hooks/UserContext";

export function Menu() {
  const { state, actions } = useTickets();
  const { state: userState } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState(state.filter.recipient);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [useFilterDate, setUseFilterDate] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [isOnline, setIsOnline] = useState<"all" | "on-line" | "printed">(
    "all"
  );

  function handleChangeType(type: "all" | "paid" | "unpaid") {
    if (isOnline !== "all") {
      actions.setFilter({
        recipient,
        type,
        document_number: documentNumber,
        expiry_date: new Date(date),
      });
    }
  }

  function handleChangeName(recipient: string) {
    setRecipient(recipient);
    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: new Date(date),
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: new Date(date),
      document_number: documentNumber,
    });
  }

  function handleChangeDate(date: string) {
    setDate(date);
    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: new Date(date),
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: new Date(date),
      document_number: documentNumber,
    });
  }

  function handleChangeNumber(number: string) {
    setDate(date);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: new Date(date),
        document_number: number,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: new Date(date),
      document_number: number,
    });

    setDocumentNumber(number);
  }

  function handleChangeIsOnline(isOnline: "all" | "on-line" | "printed") {
    setIsOnline(isOnline);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: new Date(date),
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: new Date(date),
      document_number: documentNumber,
    });
  }

  function handleToggleMenu() {
    setIsOpen((prevState) => !prevState);
  }

  async function handleExportDatabase() {
    await (window as any).database.exportDatabase();
  }

  async function handleImportDatabase() {
    const resp = await (window as any).database.importDatabase();

    if (resp) {
      location.reload();
    }
  }

  return (
    <div className="mb-4 flex h-10 flex-col  px-3">
      <div className="mb-4 flex flex-1 justify-between">
        <button
          onClick={handleToggleMenu}
          className="rounded-sm border border-zinc-400 px-2"
        >
          {isOpen ? <X /> : <List />}
        </button>

        <UserProfile user={userState.user} />
      </div>

      {isOpen && (
        <div
          className="
            absolute -left-8 top-14 ml-10 flex w-[calc(100%_-_20px)] flex-1 
            items-center justify-between gap-3 rounded-md bg-zinc-700 px-4 py-2"
        >
          <div className="flex items-center gap-4">
            <Button onClick={handleExportDatabase}>
              Exportar
              <Export />
            </Button>

            <Button onClick={handleImportDatabase}>
              Importar
              <DownloadSimple />
            </Button>
          </div>

          <div className="flex-col">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  name="is-online"
                  id="is-online"
                  defaultValue="all"
                  value={isOnline}
                  onChange={(e) =>
                    handleChangeIsOnline(
                      e.target.value as "all" | "on-line" | "printed"
                    )
                  }
                  className="max-h-[34px] flex-1 overflow-hidden rounded-sm py-1 text-zinc-900"
                >
                  <option value="all">Todos</option>
                  <option value="online">On-line</option>
                  <option value="printed">Impresso</option>
                </select>

                <Input
                  name="use-filter-date"
                  id="use-filter-date"
                  type="checkbox"
                  checked={useFilterDate}
                  onChange={(e) => {
                    e.target.checked
                      ? handleChangeDate(date)
                      : actions.setFilter({
                          type: state.filter.type,
                          recipient,
                        });
                    setUseFilterDate(e.target.checked);
                  }}
                />

                <Input
                  type="date"
                  name="date"
                  id="date-filter"
                  value={date}
                  onChange={(e) => handleChangeDate(e.target.value)}
                  className={!useFilterDate ? "opacity-20" : ""}
                  disabled={!useFilterDate}
                />
              </div>

              <div className="flex">
                <Input
                  name="document-number-filter"
                  id="document-number-filter"
                  placeholder="Número do documento"
                  type="number"
                  value={documentNumber}
                  className="max-w-[145px]"
                  onChange={(e) => handleChangeNumber(e.target.value)}
                />
              </div>

              <div className="flex">
                <Input
                  id="beneficent-filter"
                  name="beneficent-filter"
                  placeholder="Nome do beneficiário"
                  value={recipient}
                  className="max-w-[145px]"
                  onChange={(e) => handleChangeName(e.target.value)}
                />
              </div>

              <select
                name="type-filter"
                id="type-filter"
                className="max-h-[34px] flex-1 overflow-hidden rounded-sm py-1 text-zinc-900"
                onChange={(e) =>
                  handleChangeType(e.target.value as "all" | "paid" | "unpaid")
                }
              >
                <option value="all">Todos</option>
                <option value="paid">Pagos</option>
                <option value="unpaid">Não pagos</option>
              </select>
            </div>

            <div className="flex"></div>
          </div>
        </div>
      )}
    </div>
  );
}
