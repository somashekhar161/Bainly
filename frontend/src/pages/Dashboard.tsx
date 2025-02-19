import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen((prev) => !prev);
  return (
    <div className="">
      <Sidebar />
      <div className="min-h-screen p-2 md:ml-72">
        <div className="flex flex-col items-end justify-end gap-4 p-2 md:flex-row md:items-center">
          <Button
            startIcon={<PlusIcon />}
            onClick={onOpen}
            content="Add content"
            variant="primary"
            className="w-fit"
          />
          <Button
            startIcon={<ShareIcon />}
            onClick={onOpen}
            content="Share brain"
            variant="secondary"
            className="w-fit"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Card
            link="https://x.com/worldcoin/status/1891409532787535988"
            title="about world coin"
            type="twitter"
          />
          <Card
            link="https://youtu.be/XRazptXFb0c?si=tzv1I4HRAIZQc8RF"
            title="NMS"
            type="youtube"
          />
          <Card
            link="https://youtu.be/XRazptXFb0c?si=tzv1I4HRAIZQc8RF"
            title="NMS"
            type="youtube"
          />{" "}
          <Card
            link="https://youtu.be/XRazptXFb0c?si=tzv1I4HRAIZQc8RF"
            title="NMS"
            type="youtube"
          />{" "}
          <Card
            link="https://youtu.be/XRazptXFb0c?si=tzv1I4HRAIZQc8RF"
            title="NMS"
            type="youtube"
          />
        </div>
      </div>
      <CreateContentModal open={open} onClose={onClose} />
    </div>
  );
}

export default Dashboard;
