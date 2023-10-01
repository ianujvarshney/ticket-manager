import { ButtonHTMLAttributes, ElementType } from "react";

type OptionsButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type OptionsButtonIconProps = {
  icon: ElementType;
};

export function OptionsButtonIcon({ icon }: OptionsButtonIconProps) {
  const Icon = icon;

  return <Icon />;
}

export function OptionsButton({
  children,
  onClick,
  ...rest
}: OptionsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm border border-zinc-400 px-2"
      {...rest}
    >
      {children}
    </button>
  );
}
