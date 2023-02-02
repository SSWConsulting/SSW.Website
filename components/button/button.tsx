import classNames from "classnames";

const Button = ({ children, ripple, ...props }) => {
  const buttonClassName = classNames(
    {
      "ripple-button": !!ripple,
    },
    props["className"]
  );

  return (
    <>
      <button type="button" {...props} className={buttonClassName}>
        {children}
        {ripple && <div className="ripple-button-anim" />}
      </button>
    </>
  );
};

export default Button;
