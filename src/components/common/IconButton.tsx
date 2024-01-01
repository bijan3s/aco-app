interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function IconButton({
  type = "button",
  className = "",

  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-transparent font-semibold text-xs text-gray-700 hover:opacity-80 tracking-widest shadow-sm transition-all ease-in-out duration-300 ` +
        className
      }
    >
      {children}
    </button>
  );
}
