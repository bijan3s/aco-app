interface InputLabelProps {
  value?: string;
  className?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}
export default function InputLabel({
  value,
  className = "",
  htmlFor = "",
  children,
  ...props
}: InputLabelProps) {
  return (
    <label
      {...props}
      className={`block font-medium text-sm text-gray-700  ` + className}
    >
      {value ? value : children}
    </label>
  );
}
