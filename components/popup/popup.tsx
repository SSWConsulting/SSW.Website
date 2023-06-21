import classNames from "classnames";
import Modal from "react-responsive-modal";
import styles from "./popup.module.css";

const Popup = ({ isVisible, onClose, children, className = "" }) => {
  return (
    <div>
      <Modal
        open={isVisible}
        onClose={onClose}
        showCloseIcon={false}
        classNames={{
          modalAnimationIn: styles.formEnterModalAnimation,
          modalAnimationOut: styles.formLeaveModalAnimation,
          overlay: "bg-black/50",
          modal: classNames([
            "sm:max-w-2xl sm:m-5 sm:p-5",
            "w-full mx-0",
            "shadow-none bg-black/0",
            className,
          ]),
        }}
        animationDuration={700}
        center
      >
        {children}
      </Modal>
    </div>
  );
};

export default Popup;
