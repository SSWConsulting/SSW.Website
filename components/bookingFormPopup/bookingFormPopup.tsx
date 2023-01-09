import Modal from "react-responsive-modal";
import { BookingForm } from "../bookingForm/bookingForm";
import "react-responsive-modal/styles.css";
import styles from "./bookingFormPopup.module.css";

const BookingFormPopup = ({ isVisible, showBookingForm, isShareForm }) => {
  return (
    <div>
      <Modal
        open={isVisible}
        onClose={showBookingForm}
        styles={{
          modal: {
            maxWidth: "unset",
            width: "600px",
            background: "white",
          },
        }}
        showCloseIcon={false}
        classNames={{
          modalAnimationIn: styles.formEnterModalAnimation,
          modalAnimationOut: styles.formLeaveModalAnimation,
        }}
        animationDuration={700}
      >
        <div>
          <BookingForm />
        </div>
      </Modal>
    </div>
  );
};

export default BookingFormPopup;
