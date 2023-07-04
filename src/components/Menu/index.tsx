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
  const [name, setName] = useState(state.filter.name);

  function handleChangeType(type: "all" | "paid" | "unpaid") {
    actions.setFilter({ name, type });
  }

  function handleChangeName(name: string) {
    setName(name);
    actions.setFilter({ type: state.filter.type, name });
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
    <div className="mb-4 flex h-10 items-center justify-between px-3">
      <div className="flex flex-1 justify-between">
        <button onClick={handleToggleMenu} className="">
          {isOpen ? <X /> : <List />}
        </button>

        <UserProfile user={userState.user} />
      </div>

      {isOpen && (
        <div className="ml-10 flex flex-1 items-center justify-between gap-3">
          {/* <div className="flex gap-2 items-center">
            <label htmlFor="initial-data">Data Inicial</label>

            <input
              type="date"
              name="initial-data"
              id="initial-data"
              className="text-purple-500"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="final-data">Data Final</label>

            <input
              type="date"
              name="final-data"
              id="final-data"
              className="text-purple-500"
            />
          </div> */}

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

          <div className="flex items-center gap-4">
            <div className="flex">
              <Input
                id="beneficent-filter"
                name="beneficent-filter"
                placeholder="Nome do beneficiário"
                value={name}
                onChange={(e) => handleChangeName(e.target.value)}
              />
            </div>

            <select
              name="type-filter"
              id="type-filter"
              className="text-black"
              onChange={(e) =>
                handleChangeType(e.target.value as "all" | "paid" | "unpaid")
              }
            >
              <option value="all">Todos</option>
              <option value="paid">Pagos</option>
              <option value="unpaid">Não pagos</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
