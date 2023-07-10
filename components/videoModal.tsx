import ReactPlayer from "./reactPlayer/reactPlayer";

export const VideoModal = ({ children = null, url }) => {
  return (
    <div>
      <div className="overflow-hidden rounded">
        <div className="relative mx-auto aspect-video h-full w-full">
          <ReactPlayer
            className="absolute left-0 top-0"
            url={url || ""}
            controls={true}
            width={"100%"}
            height={"100%"}
            playsinline={true}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
