import { ErrorPage } from "@/components/util/error-page";
import { ErrorProps } from "next/error";

export default function Error({ statusCode }: ErrorProps) {
  return <ErrorPage code={statusCode.toString()} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
