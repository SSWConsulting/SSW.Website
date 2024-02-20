import client from "../../.tina/__generated__/client";

export const ServerHere = async () => {
  const data = await client.queries.contentQuery({
    relativePath: "home.mdx",
  });

  return (
    <div>
      <p>wrapper here</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
