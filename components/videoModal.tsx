import ReactPlayer from "./reactPlayer/reactPlayer";
import { useState } from "react";
import Popup from "./popup/popup";

export const VideoModal = ({ children = null, url }) => {
    const [show, setShow] = useState(false)

    const toggleModal = () => setShow(!show);

    return (
        <div>
            <Popup isVisible={show} onClose={toggleModal} className="sm:max-w-7xl">
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
            <div onClick={toggleModal} className="hover:cursor-pointer">
                <div className="relative mx-auto aspect-video">
                    <ReactPlayer
                        light
                        className="pointer-events-none absolute top-0 left-0"
                        url={url || ""}
                        width={"100%"}
                        height={"100%"}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};
