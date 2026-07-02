"use client";
import React, { useEffect, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS Safari (iPad/iPhone) only autoplays a video that is *muted at load
  // time*, and it won't honour React's `muted` prop because React never
  // serialises it to an HTML attribute. Set it imperatively and kick off
  // playback so iPads treat this as an allowed muted-inline autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      /* Autoplay can still be blocked (e.g. Low Power Mode); ignore. */
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute h-full min-w-full object-cover transition-opacity duration-1000 z-bgVideo"
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
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
