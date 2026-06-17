import classNames from "classnames";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import styles from "./popup.module.css";

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  showCloseIcon?: boolean;
  onClose: () => void;
  /** Inline styles for the modal box (the library's stylesheet can beat Tailwind classes). */
  modalStyle?: React.CSSProperties;
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div>
      <Modal
        open={props.isVisible}
        onClose={props.onClose}
        showCloseIcon={!!props.showCloseIcon}
        classNames={{
          closeButton: styles.closeButton,
          modalAnimationIn: styles.formEnterModalAnimation,
          modalAnimationOut: styles.formLeaveModalAnimation,
          overlay: "bg-black/50",

          modal: classNames([
            "sm:max-w-2xl w-modal",
            "w-full mx-0",
            "shadow-none bg-black/0",
            props.className,
          ]),
        }}
        styles={props.modalStyle ? { modal: props.modalStyle } : undefined}
        animationDuration={700}
        center
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default Popup;
