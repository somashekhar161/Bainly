import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import { cn } from "../lib/utils";
import Button from "./Button";
import Input from "./Input";
import { AUTHENTICATED_API } from "../api/utils";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [contentType, setcontentType] = useState<"youtube" | "twitter">(
    "youtube",
  );

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  async function handleAddContent() {
    await AUTHENTICATED_API.post("/content", {
      link: link,
      type: contentType,
      title: title,
      tags: [],
    });

    onClose();
  }
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
          <Input
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <Input
            label="Link"
            onChange={(e) => setLink(e.target.value)}
            placeholder="youtube.com"
          />
          <div className="flex gap-1">
            <Button
              content="youtube"
              onClick={() => setcontentType("youtube")}
              variant={contentType === "youtube" ? "primary" : "secondary"}
            />
            <Button
              content="twitter"
              onClick={() => setcontentType("twitter")}
              variant={contentType === "twitter" ? "primary" : "secondary"}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="primary"
            content="Submit"
            onClick={() => {
              handleAddContent();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateContentModal;
