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
import { FilterProps } from "../../contexts/TicketContext";

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

  type FilterOptions<T> = {
    [K in keyof T]: {
      key: K;
      value: T[K];
    };
  };

  function handleFilter<T>(
    options: FilterOptions<T>[keyof T],
    cb?: () => void
  ) {
    actions.setFilter({
      ...state.filter,
      [options.key]: options.value,
    });

    if (cb) cb();
  }

  function handleChangeType(type: "all" | "paid" | "unpaid") {
    handleFilter<FilterProps>(
      {
        key: "type",
        value: type,
      },
      () => setIsPaid(type)
    );
  }

  function handleChangeName(recipient: string) {
    return handleFilter<FilterProps>(
      {
        key: "recipient",
        value: recipient,
      },
      () => setRecipient(recipient)
    );
  }

  function handleChangeFinalDate(selectedDate: string, useLimitDate?: boolean) {
    const parsedDate = getConvertedDateToUTC(new Date(selectedDate))
      .toISOString()
      .slice(0, 10);
    setEndDate(parsedDate);

    setUseFilterEndDate(!!useLimitDate);

    if (useLimitDate) {
      return handleFilter<FilterProps>(
        {
          key: "limite_expire_date",
          value: getConvertedDateToUTC(new Date(parsedDate)),
        },
        () => setEndDate(parsedDate)
      );
    }

    actions.setFilter({ ...state.filter, limite_expire_date: undefined });
  }

  function handleChangeDate(selectedDate: string, useDate?: boolean) {
    const parsedDate = getConvertedDateToUTC(new Date(selectedDate))
      .toISOString()
      .slice(0, 10);
    setDate(parsedDate);

    setUseFilterDate(!!useDate);
    setUseFilterEndDate(false);

    if (useDate) {
      return handleFilter<FilterProps>(
        {
          key: "expiry_date",
          value: getConvertedDateToUTC(new Date(parsedDate)),
        },
        () => setDate(parsedDate)
      );
    }

    actions.setFilter({
      ...state.filter,
      expiry_date: undefined,
      limite_expire_date: undefined,
    });
  }

  function handleChangeNumber(number: string) {
    handleFilter<FilterProps>(
      {
        key: "document_number",
        value: number,
      },
      () => setDocumentNumber(number)
    );
  }

  function handleChangeIsOnline(isOnline: "all" | "on-line" | "printed") {
    return handleFilter<FilterProps>(
      {
        key: "is_online",
        value: isOnline === "all" ? undefined : isOnline === "on-line",
      },
      () => setIsOnline(isOnline)
    );
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
    <div className="mb-4 flex flex-col  px-3">
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
            justify-between gap-3 rounded-md bg-zinc-700 px-4 py-2 z-10"
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
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              name="is-online"
              id="is-online"
              defaultValue="all"
              value={isOnline}
              onChange={(e) => {
                handleChangeIsOnline(
                  e.target.value as "all" | "on-line" | "printed"
                );
              }}
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
              onChange={(e) => handleChangeDate(date, e.target.checked)}
            />

            <Input
              type="date"
              name="date"
              id="date-filter"
              value={date}
              onChange={(e) => handleChangeDate(e.target.value, true)}
              className={!useFilterDate ? "opacity-20" : ""}
              disabled={!useFilterDate}
            />

            <Input
              name="use-limit-filter-date"
              id="use-limit-filter-date"
              type="checkbox"
              checked={useFilterEndDate}
              onChange={(e) => handleChangeFinalDate(endDate, e.target.checked)}
            />

            <Input
              type="date"
              name="limit-date"
              id="date-limit-filter"
              value={endDate}
              onChange={(e) => handleChangeFinalDate(e.target.value, true)}
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

      <Toast
        description="Lista Atualizada"
        isOpen={isToastOpen}
        onOpenChange={setIsToastOpen}
      />
    </div>
  );
}
