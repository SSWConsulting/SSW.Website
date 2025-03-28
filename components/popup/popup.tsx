import classNames from "classnames";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import styles from "./popup.module.css";

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  showCloseIcon?: boolean;
  onClose: () => void;
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
        animationDuration={700}
        center
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default Popup;
