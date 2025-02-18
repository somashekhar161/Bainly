import React, { useEffect, useRef } from "react";
import CloseIcon from "../icons/CloseIcon";
import { cn } from "../lib/utils";
import Button from "./Button";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      className={cn(
        `absolute inset-0 top-0 h-screen w-screen items-center justify-center overflow-hidden bg-slate-500/10 backdrop-blur-xs`,
        open ? "flex" : "hidden",
      )}
    >
      <div
        ref={ref}
        className={cn(
          "min-w-sm space-y-2 rounded bg-white p-4",
          "animate-fade-down animate-once animate-duration-500 animate-ease-in-out",
        )}
      >
        <div className="flex items-center justify-between pb-4 font-medium">
          <h3>Add New Content</h3>
          <Button
            content={<CloseIcon />}
            variant="icon"
            onClick={onClose}
            size={"icon"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input label="Title" onChange={(e) => e} placeholder="title" />
          <Input label="Link" onChange={(e) => e} placeholder="youtube.com" />
        </div>
        <div className="flex justify-center">
          <Button variant="primary" content="Submit" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default CreateContentModal;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
export function Input({
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
