import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  name: string;
};

export function Input({ label, id, name, ...rest }: Props) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...rest} id={id} name={name} className="text-zinc-900" />
    </>
  );
}
