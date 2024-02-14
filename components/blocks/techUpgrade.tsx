import { UtilityButton } from "../button/utilityButton";
import { Container } from "../util/container";

export const TechUpgrade = () => {
  return (
    <Container size="custom" className="my-20 flex flex-col text-center">
      <h1 className="mt-0 pb-5 pt-0">
        Ready for a <span className="text-sswRed">tech upgrade</span>?
      </h1>
      <p className="text-lg">Learn about our modern tech solutions</p>
      <UtilityButton
        buttonText={"Discover More"}
        link="/consulting/are-you-stuck"
      />{" "}
    </Container>
  );
};
