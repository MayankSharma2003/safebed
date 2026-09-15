type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  return (
    <span className={`material-symbols-outlined ${className || ""}`}>
      {name}
    </span>
  );
};