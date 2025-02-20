import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { AUTHENTICATED_API } from "../api/utils";
import { useSearchParams } from "react-router-dom";
type ContentType = {
  _id: string;
  title: string;
  link: string;
  tags: string[];
  type: "youtube" | "twitter";
  userId: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};

// Assuming you have a state or a function to hold/fetch the content array
// const [contents, setContents] = useState<ContentType[]>([]);
function Dashboard() {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen((prev) => !prev);
  const [SearchParams] = useSearchParams();

  const [contents, setcontents] = useState<ContentType[]>([]);
  const typeFilter = SearchParams.get("filters");
  const filteredContent =
    typeFilter && typeFilter !== "all"
      ? contents.filter((content) => content.type === typeFilter)
      : contents;
  async function getContents() {
    const res = await AUTHENTICATED_API.get("/content");
    if (!res.data) return;

    if (!res.data.data) return;

    setcontents(res.data.data);
  }
  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    if (!open) getContents();
  }, [open]);

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
          {filteredContent.length > 0 &&
            filteredContent.map((content) => (
              <Card
                key={content._id}
                link={content.link}
                title={content.title}
                type={content.type}
              />
            ))}
        </div>
      </div>
      <CreateContentModal open={open} onClose={onClose} />
    </div>
  );
}

export default Dashboard;
