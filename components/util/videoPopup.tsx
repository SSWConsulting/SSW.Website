import React from "react";
import ReactPlayer from "react-player";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const VideoPopup = ({ url, openPopup, onCloseModal }) => {
  return (
    <Modal
        open={openPopup}
        onClose={onCloseModal}
        styles={{
            modal: {
            maxWidth: "unset",
            width: "64%",
            padding: "unset",
            background: "#000",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.7)",
            borderRadius: "4px",
            },
            closeButton: {},
        }}
        center
        classNames={{
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
        }}
        animationDuration={500}
        >
        <ReactPlayer
            //TODO: make url a prop
            url={url}
            width="100%"
            padding="unset"
            height="calc(100vh - 100px)"
            playing
            controls
        />
    </Modal>
  );
};

export default VideoPopup;
