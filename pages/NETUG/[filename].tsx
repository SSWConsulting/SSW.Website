import { InferGetStaticPropsType } from "next";
import { Layout } from "../../components/layout";
import { UserGroupHeader } from "../../components/usergroup/header";

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props);
  return (
    <>
      <Layout>
        <UserGroupHeader
          date={new Date()}
          title="Unleashing the Power of Microservices with Dapr & Azure Container"
          presenter={{
            name: "Matt Goldman",
            url: "https://ssw.com.au/people/matt-goldman/",
            image: "/images/people/matt-g-tall.png",
          }}
          trailerUrl="https://www.youtube.com/watch?v=FNMtmBJAZ_M"
          registerUrl="https://www.meetup.com/en-AU/sydney-net-user-group/"
        />
      </Layout>
    </>
  );
}

export const getStaticProps = ({ params }) => {
  return {
    props: { filename: params.filename },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { filename: "sydney" } }],
    fallback: true,
  };
};
