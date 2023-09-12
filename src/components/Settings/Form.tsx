import { Input } from "../Input";

import config from "../../../configs.json";
import { Button } from "../Button";

export function Form() {
  return (
    <form>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="total_page" className="font-bold">
            Items per page
          </label>

          <Input
            id="total_page"
            name="Total items per page"
            defaultValue={config.items_per_page}
            type="number"
          />
        </div>

        {/* <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="total_page" className="font-bold">
            Items per page
          </label>

          <Input
            id="total_page"
            name="Total items per page"
            defaultValue={config.items_per_page}
            type="number"
          />
        </div> */}
      </div>

      <footer className="flex items-center justify-center mt-10">
        <Button>Save</Button>
      </footer>
    </form>
  );
}
