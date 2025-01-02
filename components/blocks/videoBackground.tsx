import React from "react";

interface VideoBackgroundProps {
  videoBackground: string;
  tinaField: (props: unknown, field: string) => string;
  props: unknown;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoBackground,
  tinaField,
  props,
}) => {
  return (
    <video
      className="absolute h-full min-w-full object-cover transition-opacity duration-1000 z-bgVideo"
      playsInline
      autoPlay
      muted
      loop
    >
      <source
        data-tina-field={tinaField(props, "videoBackground")}
        src={videoBackground}
        type="video/mp4"
      />
      Your browser does not support HTML5 video.
    </video>
  );
};

export default VideoBackground;
