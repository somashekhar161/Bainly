import BrainIcon from "../icons/BrainIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="fixed h-screen w-72 border-r-2 border-zinc-200 bg-white">
      <div className="flex items-center gap-2 p-1 px-4 text-2xl font-medium">
        <div className="h-fit text-purple-600">
          <BrainIcon />
        </div>
        Second Brain
      </div>
      <div className="">
        <SidebarItem text="youtube" icon={<YoutubeIcon />} />
        <SidebarItem text="twitter" icon={<TwitterIcon />} />
      </div>
    </div>
  );
}
