import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SuccessToast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SuccessToast;
