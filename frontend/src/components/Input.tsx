import React from "react";
import { cn } from "../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
export default function Input({
  value,
  onChange,
  className,
  label,
  ...props
}: InputProps) {
  return (
    <>
      <label htmlFor={`input-${label}`}>{label}</label>
      <input
        id={`input-${label}`}
        value={value}
        onChange={onChange}
        {...props}
        className={cn("rounded border p-2", className)}
      />
    </>
  );
}
