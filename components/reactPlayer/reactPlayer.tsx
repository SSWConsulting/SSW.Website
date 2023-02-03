import dynamic from "next/dynamic";
import type { ReactPlayerProps } from "react-player/types/lib";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
}) as unknown as React.FC<ReactPlayerProps>;

export default ReactPlayer;
