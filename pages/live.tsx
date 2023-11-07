import { authorizationUrl } from "../services/server/google-auth";

export default function LivePage() {
  return (
    <>
      <div>Hello World</div>
      <a href={authorizationUrl}>Authorize with Google </a>
    </>
  );
}
