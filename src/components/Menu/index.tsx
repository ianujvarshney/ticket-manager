import { useState } from "react";
import {
  List,
  X,
  DownloadSimple,
  Export,
  ArrowClockwise,
  GearSix,
} from "phosphor-react";
import { useTickets } from "../../hooks/TicketContext";
import { Input } from "../Input";
import { Button } from "../Button";
import { UserProfile } from "../Profile";
import { useUserContext } from "../../hooks/UserContext";
import { Toast } from "../Toast";
import { getConvertedDateToUTC } from "../../utils/convertDateToUTC";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "../Modal";
import { Settings } from "../Settings";
import { Options } from "./options";
import { OptionsButton, OptionsButtonIcon } from "./button";

export function Menu() {
  const { state, actions } = useTickets();
  const { state: userState } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  // FILTER
  const [recipient, setRecipient] = useState(state.filter.recipient);
  const [useFilterDate, setUseFilterDate] = useState(false);
  const [useFilterEndDate, setUseFilterEndDate] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [isPaid, setIsPaid] = useState<"paid" | "unpaid" | "all">("all");
  const [date, setDate] = useState(
    getConvertedDateToUTC(new Date()).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    getConvertedDateToUTC(new Date()).toISOString().slice(0, 10)
  );
  const [isOnline, setIsOnline] = useState<"all" | "on-line" | "printed">(
    "all"
  );

  function handleChangeType(type: "all" | "paid" | "unpaid") {
    setIsPaid(type);

    actions.setFilter({
      recipient,
      type,
      document_number: documentNumber,
      expiry_date: useFilterDate
        ? getConvertedDateToUTC(new Date(date))
        : undefined,
    });
  }

  function handleChangeName(recipient: string) {
    setRecipient(recipient);
    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: useFilterDate
          ? getConvertedDateToUTC(new Date(date))
          : undefined,
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: useFilterDate
        ? getConvertedDateToUTC(new Date(date))
        : undefined,
      document_number: documentNumber,
    });
  }

  function handleChangeFinalDate(selectedDate: string) {
    const parsedDate = getConvertedDateToUTC(new Date(selectedDate))
      .toISOString()
      .slice(0, 10);
    setEndDate(parsedDate);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: getConvertedDateToUTC(new Date(date)),
        document_number: documentNumber,
        is_online: isOnline === "on-line",
        limite_expire_date: new Date(parsedDate),
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: getConvertedDateToUTC(new Date(date)),
      document_number: documentNumber,
      limite_expire_date: new Date(parsedDate),
    });
  }

  function handleChangeDate(selectedDate: string) {
    const parsedDate = getConvertedDateToUTC(new Date(selectedDate))
      .toISOString()
      .slice(0, 10);
    setDate(parsedDate);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: new Date(parsedDate),
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: new Date(selectedDate),
      document_number: documentNumber,
    });
  }

  function handleChangeNumber(number: string) {
    setDocumentNumber(number);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: useFilterDate
          ? getConvertedDateToUTC(new Date(date))
          : undefined,
        document_number: number,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: useFilterDate
        ? getConvertedDateToUTC(new Date(date))
        : undefined,
      document_number: number,
    });
  }

  function handleChangeIsOnline(isOnline: "all" | "on-line" | "printed") {
    setIsOnline(isOnline);

    if (isOnline !== "all") {
      actions.setFilter({
        type: state.filter.type,
        recipient,
        expiry_date: useFilterDate
          ? getConvertedDateToUTC(new Date(date))
          : undefined,
        document_number: documentNumber,
        is_online: isOnline === "on-line",
      });

      return;
    }

    actions.setFilter({
      type: state.filter.type,
      recipient,
      expiry_date: useFilterDate
        ? getConvertedDateToUTC(new Date(date))
        : undefined,
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

  function handleRefreshTickets() {
    actions.refreshTickets();
    setIsToastOpen(true);
  }

  function handleClearFilters() {
    setUseFilterDate(false);
    setDocumentNumber("");
    setRecipient("");
    setIsOnline("all");
    setIsPaid("all");
    setDate(getConvertedDateToUTC(new Date()).toISOString().slice(0, 10));
    actions.clearFilter();
    actions.setTickets(state.page);
  }

  return (
    <div className="mb-4 flex h-10 flex-col  px-3">
      <Options>
        <div className="flex gap-2">
          <OptionsButton onClick={handleToggleMenu}>
            {isOpen ? (
              <OptionsButtonIcon icon={X} />
            ) : (
              <OptionsButtonIcon icon={List} />
            )}
          </OptionsButton>

          <OptionsButton
            onClick={handleRefreshTickets}
            title="Recarregar página"
          >
            <OptionsButtonIcon icon={ArrowClockwise} />
          </OptionsButton>

          <Dialog.Root>
            <Modal title="Configurações">
              <Settings />
            </Modal>

            <Dialog.Trigger
              className="rounded-sm border border-zinc-400 px-2"
              title="Configurações"
              aria-label="Abrir modal de configurações do aplicativo"
            >
              <GearSix />
            </Dialog.Trigger>
          </Dialog.Root>
        </div>

        <UserProfile user={userState.user} />
      </Options>

      {isOpen && (
        <div
          className="
            absolute -left-8 top-14 ml-10 flex flex-col w-[calc(100%_-_20px)] flex-1 
            justify-between gap-3 rounded-md bg-zinc-700 px-4 py-2"
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

          <div className="flex justify-between">
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
                  <option value="on-line">On-line</option>
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
                    setUseFilterEndDate(false);
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

                <Input
                  name="use-limit-filter-date"
                  id="use-limit-filter-date"
                  type="checkbox"
                  checked={useFilterEndDate}
                  onChange={(e) => {
                    e.target.checked
                      ? handleChangeFinalDate(date)
                      : actions.setFilter({
                          type: state.filter.type,
                          recipient,
                          expiry_date: getConvertedDateToUTC(new Date(date)),
                        });
                    setUseFilterEndDate(e.target.checked);
                  }}
                />

                <Input
                  type="date"
                  name="limit-date"
                  id="date-limit-filter"
                  value={endDate}
                  onChange={(e) => handleChangeFinalDate(e.target.value)}
                  className={!useFilterEndDate ? "opacity-20" : ""}
                  disabled={!useFilterEndDate}
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
                className="max-h-[34px] overflow-hidden rounded-sm py-1 text-zinc-900"
                value={isPaid}
                onChange={(e) =>
                  handleChangeType(e.target.value as "all" | "paid" | "unpaid")
                }
              >
                <option value="all">Todos</option>
                <option value="paid">Pagos</option>
                <option value="unpaid">Não pagos</option>
              </select>
            </div>

            <div className="flex">
              <button onClick={handleClearFilters}>Limpar</button>
            </div>
          </div>
        </div>
      )}

      <Toast
        description="Lista Atualizada"
        isOpen={isToastOpen}
        onOpenChange={setIsToastOpen}
      />
    </div>
  );
}
