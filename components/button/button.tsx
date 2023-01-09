import classnames from "classnames";
import styles from "./button.module.css";

const Button = ({ children, ...props }) => {
  return (
    <>
      <button
        type="button"
        className={classnames(styles.button, styles.hoverable)}
        {...props}
      >
        {children}
        <div className={styles.anim} />
      </button>
    </>
  );
};

export default Button;
