import { ErrorPage } from "@/components/util/error/error";

export default function FourOhFour() {
  return (
    <>
      <ErrorPage
        code="404"
        title="PAGE NOT FOUND!"
        tipText={
          <>Sorry, we couldn&apos;t find the page you were looking for...</>
        }
      />
    </>
  );
}
