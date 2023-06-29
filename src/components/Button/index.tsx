import { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  asChild?: boolean;
};

export function Button({ children, asChild, ...rest }: Props) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      {...rest}
      className="
              flex gap-2 border border-purple-400 px-4 py-1 items-center rounded-sm 
              hover:bg-purple-500 transition-colors"
    >
      {children}
    </Component>
  );
}
