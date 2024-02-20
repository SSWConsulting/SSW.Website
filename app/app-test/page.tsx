import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { ServerHere } from "./ServerHere";
import { TinaWrapper } from "./Wrapper";

export default async function Page() {
  const tinaProps = await client.queries.contentQuery({
    relativePath: "home.mdx",
  });

  return (
    <TinaWrapper
      data={tinaProps.data}
      variables={tinaProps.variables}
      query={tinaProps.query}
    >
      <div>
        <ServerHere />
        <TinaMarkdown content={tinaProps.data.page._body} />
      </div>
    </TinaWrapper>
  );
}
