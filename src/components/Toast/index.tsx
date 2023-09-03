import * as ToastPrimitive from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from "react";
import { X } from "phosphor-react";

type Props = {
  title?: string;
  description: string;
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function Toast({ description, title, isOpen, onOpenChange }: Props) {
  return (
    <ToastPrimitive.Provider
      duration={2000}
      swipeDirection="up"
      swipeThreshold={200}
    >
      <ToastPrimitive.Root
        open={isOpen}
        onOpenChange={onOpenChange}
        className="data-[state='open']:animate-slideIn data-[state='closed']:animate-hide data-[state='end']:animate-slideOut 
            bg-white/80 rounded-md text-zinc-900 px-3 py-2
          "
      >
        <header className="flex justify-between">
          <ToastPrimitive.Title className="font-bold text-sm">
            {title}
          </ToastPrimitive.Title>

          <ToastPrimitive.Close className="">
            <X weight="bold" size={10} className="text-red-500" />
          </ToastPrimitive.Close>
        </header>

        <ToastPrimitive.Description className="text-sm">
          {description}
        </ToastPrimitive.Description>
        {/* <ToastPrimitive.Action altText="" />
         */}
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed bottom-0 right-1/2 translate-x-1/2 flex flex-col p-4 gap-2 z-50" />
    </ToastPrimitive.Provider>
  );
}
