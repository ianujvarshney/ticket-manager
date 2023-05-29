import { useState } from "react";
import { List, X } from "phosphor-react";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className="flex flex-1 justify-between items-center h-10 mb-4 px-3">
      <button onClick={handleToggleMenu} className="">
        {isOpen ? <X /> : <List />}
      </button>

      {isOpen && (
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="only-open"
              id="only-open"
              className="text-purple-500"
            />
            <label htmlFor="only-open">Apenas não pagos</label>
          </div>
        </div>
      )}
    </div>
  );
}
