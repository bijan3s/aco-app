interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PrimaryButton({
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={
        `inline-flex items-center px-4 py-2 bg-gray-800  border border-transparent rounded-md font-sans text-xs text-white  uppercase tracking-widest hover:bg-gray-700  focus:bg-gray-700  active:bg-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transition ease-in-out duration-150  ` +
        className
      }
    >
      {children}
    </button>
  );
}
