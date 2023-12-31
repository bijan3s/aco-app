import { forwardRef, useEffect, useRef, HTMLProps } from "react";

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  type?: string;
  isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  const input = ref
    ? (ref as React.RefObject<HTMLInputElement>)
    : useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isFocused && input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={
        "font-medium font-sans border-2 border-gray-300 focus-border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm transition-all duration-300" +
        className
      }
      ref={input}
    />
  );
});
