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
          modal: "w-[600px] bg-black/0 max-w-none"
        }}
        animationDuration={700}
      >
        {children}
      </Modal>
    </div>
  );
};

export default Popup;
