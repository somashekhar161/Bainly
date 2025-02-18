import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SidebarItemProps {
  text: string;
  icon: ReactNode;
}

function SidebarItem({ text, icon }: SidebarItemProps) {
  return (
    <button className={cn("flex gap-2 px-4 py-2")}>
      {icon}
      {text}
    </button>
  );
}

export default SidebarItem;
