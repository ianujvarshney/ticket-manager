import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  name: string;
  error?: string;
};

export function PriceInput({ label, id, name, error, ...rest }: Props) {
  return (
    <div className="flex items-start gap-2 flex-1">
      {label && (
        <label htmlFor={id} className="select-none inline-flex font-semibold">
          {label}
        </label>
      )}

      <div className={`flex flex-col flex-1 relative bg-red-500`}>
        <span>R$</span>
        <input
          {...rest}
          id={id}
          name={name}
          className={`text-zinc-900 rounded-sm  focus:ring-purple-400 focus:outline-purple-400 ${
            !label ? "px-2 py-1 flex-1" : ""
          } ${
            rest.type === "checkbox"
              ? "rounded-md focus:outline-0 checked:text-purple-500"
              : ""
          } ${error ? "ring-2 ring-red-300" : ""} `}
        />

        {error && (
          <span className="text-red-500 absolute right-2 top-1/2 -translate-y-1/2">
            {error}!
          </span>
        )}
      </div>
    </div>
  );
}
