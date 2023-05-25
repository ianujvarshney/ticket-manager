import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  name: string;
};

export function Input({ label, id, name, ...rest }: Props) {
  return (
    <div className="flex items-center flex-1 bg-red-400">
      {label && (
        <label htmlFor={id} className="select-none">
          {label}
        </label>
      )}

      <input
        {...rest}
        id={id}
        name={name}
        className="text-zinc-900 px-2 rounded-sm py-1 focus:ring-purple-400 focus:outline-purple-400"
      />
    </div>
  );
}
