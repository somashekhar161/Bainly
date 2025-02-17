import ShareIcon from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
function Card({ title, link, type }: CardProps) {
  return (
    <div className="h-fit min-h-48 max-w-72 rounded-md border border-gray-200 bg-white p-4 shadow">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <div className="text-gray-500">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <a href={link} target="_bank">
            <ShareIcon />
          </a>
          <ShareIcon />
        </div>
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full rounded-md"
            src={link
              .replace("watch", "embed")
              .replace("youtu.be", "youtube.com/embed/")
              .replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}

export default Card;
