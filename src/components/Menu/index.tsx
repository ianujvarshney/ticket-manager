import { useState } from "react";
import { List, X, DownloadSimple, Export } from "phosphor-react";
import { useTickets } from "../../hooks/TicketContext";
import { Input } from "../Input";
import { Button } from "../Button";

export function Menu() {
  const {
    handleChangeShowingType,
    handleSearchByBeneficent,
    filterBeneficent,
  } = useTickets();

  const [isOpen, setIsOpen] = useState(false);

  function handleChangeType(type: string) {
    const validValues = ["all", "paid", "unpaid"];

    if (!validValues.includes(type)) return;

    handleChangeShowingType(type as "all" | "paid" | "unpaid");
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
    <div className="flex justify-between items-center h-10 mb-4 px-3">
      <button onClick={handleToggleMenu} className="">
        {isOpen ? <X /> : <List />}
      </button>

      {isOpen && (
        <div className="flex flex-1 items-center ml-10 justify-between gap-3">
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

          <div className="flex gap-4 items-center">
            <Button onClick={handleExportDatabase}>
              Exportar
              <Export />
            </Button>

            <Button onClick={handleImportDatabase}>
              Importar
              <DownloadSimple />
            </Button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex">
              <Input
                id="beneficent-filter"
                name="beneficent-filter"
                placeholder="Nome do beneficiário"
                value={filterBeneficent}
                onChange={(e) => handleSearchByBeneficent(e.target.value)}
              />
            </div>

            <select
              name="type-filter"
              id="type-filter"
              className="text-black"
              onChange={(e) => handleChangeType(e.target.value)}
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
