import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SidebarItemProps {
  text: string;
  icon: ReactNode;
  isSidebarExpanded: boolean;
}

function SidebarItem({ isSidebarExpanded, text, icon }: SidebarItemProps) {
  return (
    <button
      className={cn("flex w-full gap-2 rounded px-4 py-2 hover:bg-purple-200")}
    >
      {isSidebarExpanded ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        icon
      )}
    </button>
  );
}

export default SidebarItem;
