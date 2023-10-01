import { ReactNode } from "react";

type MenuOptionsType = {
  children: ReactNode;
};

export function Options({ children }: MenuOptionsType) {
  return <div className="mb-4 flex flex-1 justify-between">{children}</div>;
}
