// import client from "../.tina/__generated__/client";
import { Layout } from "../components/layout";

const LivePage = () => {
  return (
    <Layout className="bg-gray-75">
      <div className="!max-w-full !bg-white">
        <span className="text-sswRed">
          <h2>Upcoming session Details</h2>
        </span>
      </div>
    </Layout>
  );
};

// export const getStaticProps = async ({ params }) => {
//   const tinaProps = await client.queries.consultingContentQuery({
//     relativePath: `${params.filename}.mdx`,
//   });

//   const categories =
//     tinaProps.data.consulting?.testimonialCategories?.map(
//       (category) => category.testimonialCategory.name
//     ) || [];

//   const testimonialsResult = await getTestimonialsByCategories(categories);

//   const seo = tinaProps.data.consulting.seo;
//   if (seo && !seo.canonical) {
//     seo.canonical = `${tinaProps.data.global.header.url}consulting/${params.filename}`;
//   }

//   const technologyCardNames =
//     tinaProps.data.consulting.technologies?.technologyCards?.reduce<string[]>(
//       (pre, cur) => {
//         !!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
//         return pre;
//       },
//       []
//     ) || [];
//   const technologyCardsProps = await client.queries.technologyCardContentQuery({
//     cardNames: technologyCardNames,
//   });

//   const marketingSection = await client.queries.marketing({
//     relativePath: "/why-choose-ssw.mdx",
//   });

//   return {
//     props: {
//       data: tinaProps.data,
//       query: tinaProps.query,
//       variables: tinaProps.variables,
//       testimonialsResult,
//       technologyCards: technologyCardsProps,
//       marketingData: marketingSection.data,
//       env: {
//         GOOGLE_RECAPTCHA_SITE_KEY:
//           process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
//       },
//       seo,
//     },
//   };
// };

export default LivePage;
