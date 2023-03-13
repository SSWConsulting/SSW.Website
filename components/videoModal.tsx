import ReactPlayer from "./reactPlayer/reactPlayer";
import { useState } from "react";
import Popup from "./popup/popup";

export const VideoModal = ({ url }) => {
    const [show, setShow] = useState(false)

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    return (
        <div>
            <Popup isVisible={show} onClose={hideModal} className="sm:max-w-7xl">
                <div className="relative mx-auto aspect-video h-full w-full">
                    <ReactPlayer
                        playing={show}
                        className="absolute top-0 left-0"
                        url={url || ""}
                        width={"100%"}
                        height={"100%"}
                    />
                </div>
            </Popup>
            <div className="aspect-video" onClick={showModal}>
                <ReactPlayer
                    light
                    className="pointer-events-none absolute top-0 left-0"
                    url={url || ""}
                    width={"100%"}
                    height={"100%"}
                />
            </div>
        </div>
    );
};
