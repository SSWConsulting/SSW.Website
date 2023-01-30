import Modal from "react-responsive-modal";
import { BookingForm } from "../bookingForm/bookingForm";
import styles from "./formPopup.module.css";

const FormPopup = ({ isVisible, showBookingForm, formChildren }) => {
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
        {formChildren}
      </Modal>
    </div>
  );
};

export default FormPopup;
