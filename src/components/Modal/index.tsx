import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { X } from "phosphor-react";

type Props = {
  children: ReactNode;
  title: string;
};

export function Modal({ children, title }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="
            fixed left-0 top-0 flex h-screen w-screen 
            items-center justify-center bg-zinc-300/30 backdrop-blur-md
          "
      >
        <Dialog.Content className="w-[80%] rounded-md bg-zinc-200 p-4 pb-2 text-zinc-900">
          <header className="mb-8 flex justify-between">
            <Dialog.Title className="font-bold">{title}</Dialog.Title>

            <Dialog.Close>
              <X className="text-red-400" size={18} weight="bold" />
            </Dialog.Close>
          </header>

          <Dialog.Description />
          {children}
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
