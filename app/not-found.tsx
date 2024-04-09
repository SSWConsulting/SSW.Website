import { ErrorText } from "@/components/util/error/error-text";

export default function FourOhFour() {
  return (
    <>
      <ErrorText
        title="PAGE NOT FOUND!"
        tipText={
          <>Sorry, we couldn&apos;t find the page you were looking for...</>
        }
      />
    </>
  );
}
