import { useState } from "react";
import { List, X } from "phosphor-react";
import { useTickets } from "../../hooks/TicketContext";
import { Input } from "../Input";

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

  return (
    <div className="flex flex-1 justify-between items-center h-10 mb-4 px-3">
      <button onClick={handleToggleMenu} className="">
        {isOpen ? <X /> : <List />}
      </button>

      {isOpen && (
        <div className="flex justify-end gap-3">
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

          <div className="flex gap-2 items-center">
            <Input
              id="beneficent-filter"
              name="beneficent-filter"
              placeholder="Nome do beneficiário"
              value={filterBeneficent}
              onChange={(e) => handleSearchByBeneficent(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
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
