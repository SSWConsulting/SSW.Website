import classNames from "classnames";
import Modal from "react-responsive-modal";
import styles from "./popup.module.css";

const Popup = ({ isVisible, showBookingForm, children }) => {
  return (
    <div>
      <Modal
        open={isVisible}
        onClose={showBookingForm}
        showCloseIcon={false}
        classNames={{
          modalAnimationIn: styles.formEnterModalAnimation,
          modalAnimationOut: styles.formLeaveModalAnimation,
          modal: classNames([
            "sm:max-w-2xl sm:m-5 sm:p-5",
            "w-full mx-0",
            "bg-black/0",
          ]),
        }}
        animationDuration={700}
      >
        {children}
      </Modal>
    </div>
  );
};

export default Popup;
