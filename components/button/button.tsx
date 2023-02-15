import classNames from "classnames";
import styles from "./button.module.css";

const Button = ({ children, ripple, ...props }) => {
  const buttonClassName = classNames(
    ripple && styles["ripple-button"],
    props["className"]
  );

  return (
    <>
      <button type="button" {...props} className={buttonClassName}>
        {children}
        {ripple && <div className={styles["ripple-button-anim"]} />}
      </button>
    </>
  );
};

export default Button;
