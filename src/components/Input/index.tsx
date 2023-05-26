import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  name: string;
};

export function Input({ label, id, name, ...rest }: Props) {
  return (
    <div className="flex items-center gap-2 flex-1 h-10">
      {label && (
        <label htmlFor={id} className="select-none inline-flex font-semibold">
          {label}
        </label>
      )}

      <input
        {...rest}
        id={id}
        name={name}
        className={`text-zinc-900 rounded-sm  focus:ring-purple-400 focus:outline-purple-400 ${
          !label ? "px-2 py-1 flex-1" : ""
        }`}
      />
    </div>
  );
}
