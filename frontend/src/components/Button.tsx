import { cva, VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex  items-center  cursor-pointer  active:scale-95 transition-scale duration-200",
  {
    variants: {
      variant: {
        primary: "bg-purple-600 hover:bg-purple-500 text-white",
        secondary: "bg-purple-200 hover:bg-purple-100 text-purple-600",
      },
      size: {
        default: "px-4 py-2 rounded-md",
        //   sm: "h-9 rounded-md px-3",
        //   lg: "h-11 rounded-md px-8",
        //   icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  className?: string;
}

function Button({ variant, text, startIcon, className }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, className }))}>
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
}

export default Button;
