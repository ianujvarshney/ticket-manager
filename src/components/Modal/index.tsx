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
            bg-zinc-300/30 fixed w-screen h-screen top-0 left-0 
            backdrop-blur-md flex items-center justify-center
          "
      >
        <Dialog.Content className="bg-zinc-200 text-zinc-900 w-[80%] p-4 pb-2 rounded-md">
          <header className="flex justify-between mb-8">
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
