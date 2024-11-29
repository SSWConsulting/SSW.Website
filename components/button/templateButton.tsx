import RippleButton from "./rippleButtonV2";

export const Button = ({ data }) => {
  return <RippleButton className="bg-sswRed">{data.buttonText}</RippleButton>;
};
