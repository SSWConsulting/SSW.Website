import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessToast = (props?) => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={props?.autoClose ?? 5000}
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
