import { useState } from "react";
import BrainIcon from "../icons/BrainIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";
import { cn } from "../lib/utils";
import { useSearchParams } from "react-router-dom";

export function Sidebar() {
  const [isSidebarExpanded, setisSidebar] = useState(true);
  const toggleSidebar = () => setisSidebar((prev) => !prev);

  const [SearchParams, setSearchParams] = useSearchParams();
  const typeFilter = SearchParams.get("filters");
  function handleAddFilter(filter: string) {
    // searchParams.set("filters", filter);

    setSearchParams((prev) => {
      prev.set("filters", filter);
      return prev;
    });
  }
  return (
    <div
      className={cn(
        "fixed left-2 overflow-y-hidden rounded-xl border-r-2 border-zinc-200 bg-white p-2 md:h-screen md:scale-y-95",
        isSidebarExpanded ? "w-96 md:w-72" : "w-20",
        "transition-all",
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 text-2xl font-medium text-nowrap">
        <div className="h-fit text-purple-600" onClick={toggleSidebar}>
          <BrainIcon />
        </div>
        {isSidebarExpanded && "Second Brain"}
      </div>

      <div
        className={cn(
          "flex flex-col gap-1 md:h-screen",
          isSidebarExpanded ? "h-screen" : "hidden md:flex",
        )}
      >
        <SidebarItem
          isSidebarExpanded={isSidebarExpanded}
          text="ALL"
          active={typeFilter === "all"}
          icon={<YoutubeIcon />}
          onClick={() => handleAddFilter("all")}
        />
        <SidebarItem
          isSidebarExpanded={isSidebarExpanded}
          text="youtube"
          active={typeFilter === "youtube"}
          icon={<YoutubeIcon />}
          onClick={() => handleAddFilter("youtube")}
        />
        <SidebarItem
          isSidebarExpanded={isSidebarExpanded}
          text="twitter"
          icon={<TwitterIcon />}
          active={typeFilter === "twitter"}
          onClick={() => handleAddFilter("twitter")}
        />
      </div>
    </div>
  );
}
