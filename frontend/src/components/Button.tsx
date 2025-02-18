import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex  items-center justify-center cursor-pointer  active:scale-95 transition-scale duration-200",
  {
    variants: {
      variant: {
        primary: "bg-purple-600 hover:bg-purple-500 text-white",
        secondary: "bg-purple-200 hover:bg-purple-100 text-purple-600",
        icon: "bg-none",
      },
      size: {
        default: "px-4 py-2 rounded-md",
        //   sm: "h-9 rounded-md px-3",
        //   lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  content: ReactNode;
  startIcon?: ReactNode;

  className?: string;
  onClick: () => void;
}

function Button({
  variant,
  content,
  startIcon,
  className,
  onClick,
  size,
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, className, size }))}
      onClick={onClick}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {content}
    </button>
  );
}

export default Button;
