import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";

export type ProductVideoData = {
  url?: string | null;
  caption?: string | null;
  duration?: string | null;
};

type ProductVideoProps = {
  data?: ProductVideoData | null;
  className?: string;
  /** Set on the hero video so its poster can be preloaded as the LCP image. */
  priority?: boolean;
};

// 16/9 video with the site's standard click-to-play thumbnail, plus the
// template's duration chip and caption. VideoModal handles provider detection
// and the maxres -> mqdefault poster fallback, so this only adds the chrome.
export const ProductVideo = ({
  data,
  className,
  priority,
}: ProductVideoProps) => {
  if (!data?.url) return null;

  return (
    <figure className={cn("m-0", className)}>
      <div
        data-tina-field={tinaField(data, "url")}
        className="relative overflow-hidden rounded-card border-0.75 border-hairline"
      >
        <VideoModal url={data.url} priority={priority} roundedEdges={false} />

        {data.duration && (
          <span
            data-tina-field={tinaField(data, "duration")}
            className="pointer-events-none absolute bottom-4 right-4 rounded-control bg-black/70 px-2 py-1 font-mono text-sm text-white"
          >
            {data.duration}
          </span>
        )}
      </div>

      {data.caption && (
        <figcaption
          data-tina-field={tinaField(data, "caption")}
          className="mt-4 text-sm text-muted-foreground"
        >
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
};
