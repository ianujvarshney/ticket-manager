import { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  name: string;
  mask?: string;
  error?: string;
};

export function Input({ label, id, name, error, mask, ...rest }: Props) {
  return (
    <div className="flex flex-1 items-start gap-2 ">
      {label && (
        <label
          htmlFor={id}
          className="inline-flex select-none whitespace-nowrap font-semibold"
        >
          {label}
        </label>
      )}

      <div
        className={`flex flex-col ${
          rest.type !== "checkbox" ? "flex-1" : "h-4 w-4 self-center p-0"
        } relative `}
      >
        {mask ? (
          <InputMask
            mask={mask}
            id={id}
            {...rest}
            className={`rounded-sm text-zinc-900 focus:outline-purple-400 focus:ring-purple-400 ${
              !label ? "flex-1 px-2 py-1" : ""
            } ${error ? "ring-red-300" : ""} ${rest.className}`}
          />
        ) : (
          <input
            id={id}
            {...rest}
            className={`rounded-sm text-zinc-900  focus:outline-purple-400 focus:ring-purple-400 ${
              !label ? "flex-1 px-2 py-1" : ""
            } ${
              rest.type === "checkbox"
                ? "rounded-md checked:text-purple-500 focus:outline-0"
                : ""
            } ${error ? "ring-2 ring-red-300" : ""} ${rest.className}`}
          />
        )}

        {error && (
          <span className="absolute right-0 top-full -translate-y-1/2 text-xs text-red-500">
            {error}!
          </span>
        )}
      </div>
    </div>
  );
}
