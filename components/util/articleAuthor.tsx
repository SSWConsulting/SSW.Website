export const articleAuthorSchema = {
  type: "object",
  label: "Article Author",
  name: "articleAuthor",
  fields: [
    {
      type: "string",
      label: "Author Name",
      name: "authorName",
    },
    {
      type: "string",
      label: "Author Position",
      name: "authorPosition",
    },
    {
      type: "image",
      label: "Author Image",
      name: "authorImage",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "articles",
    },
  ],
};
