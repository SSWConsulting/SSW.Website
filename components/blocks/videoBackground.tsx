"use client";
import React, { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoBackground: string;
  tinaField: (props: unknown, field: string) => string;
  props: unknown;
  /** Defaults to lazy loading. Pass "metadata"/"auto" for genuinely
   *  above-the-fold videos that should fetch during the initial load. */
  preload?: "none" | "metadata" | "auto";
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoBackground,
  tinaField,
  props,
  preload = "none",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS Safari (iPad/iPhone) only autoplays a video that is *muted at load
  // time*, and it won't honour React's `muted` prop because React never
  // serialises it to an HTML attribute. Set it imperatively, and only kick off
  // playback once the section nears the viewport — this is often a below-fold
  // decoration whose (multi-MB) MP4 must not compete with the hero/LCP
  // resources during the critical initial load.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlayback = () => {
      video.play().catch(() => {
        /* Autoplay can still be blocked (e.g. Low Power Mode); ignore. */
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      startPlayback();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startPlayback();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute h-full min-w-full object-cover transition-opacity duration-1000 z-bgVideo"
      playsInline
      muted
      loop
      preload={preload}
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
