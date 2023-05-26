import { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "phosphor-react";

type Props = {
  title: string;
  children: ReactNode;
  onConfirm: () => void;
};

export function AlertModal({ title, onConfirm, children }: Props) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        className="bg-zinc-300/30 fixed w-screen h-screen top-0 left-0 
            backdrop-blur-md flex items-center justify-center"
      >
        <AlertDialog.Content className="bg-zinc-200 text-zinc-900 w-[50%] p-4 pb-2 rounded-md">
          <header className="flex justify-between mb-8">
            <AlertDialog.Title className="font-bold">{title}</AlertDialog.Title>

            <AlertDialog.Cancel>
              <X className="text-red-400" size={18} weight="bold" />
            </AlertDialog.Cancel>
          </header>

          <AlertDialog.Description>{children}</AlertDialog.Description>

          <footer className="flex items-center justify-center mt-8 mb-4 gap-4">
            <AlertDialog.Cancel
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-transparent border border-red-400
                hover:text-red-500 transition-colors"
            >
              Cancelar
            </AlertDialog.Cancel>

            <AlertDialog.Action
              onClick={onConfirm}
              className="px-6 py-2 rounded-md border border-green-400 text-green-500 hover:bg-green-400 
                hover:text-white transition-colors"
            >
              Confirmar
            </AlertDialog.Action>
          </footer>
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  );
}
