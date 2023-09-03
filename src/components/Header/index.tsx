type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <header>
      <h2>{title}</h2>
    </header>
  );
}
