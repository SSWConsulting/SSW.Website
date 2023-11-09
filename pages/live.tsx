// import client from "../.tina/__generated__/client";
import { InferGetStaticPropsType } from "next";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../.tina/__generated__/client";
import { UtilityButton } from "../components/blocks";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

const LivePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout>
      <section>
        <Container>
          <span className="text-sswBlack">
            <TinaMarkdown
              components={componentRenderer}
              content={data.live.title}
            />
          </span>
        </Container>
      </section>
      <section>
        <Container>
          <span className="text-sswRed">
            <h2>{data.live.section1}</h2>
          </span>
          <div className="flex justify-center">
            <UtilityButton
              size="small"
              uncentered={false}
              link="https://www.youtube.com/channel/UCBFgwtV9lIIhvoNh0xoQ7Pg"
              buttonText={
                <>
                  Visit SSW TV Channel on Youtube
                  <BsArrowRightCircle className="ml-1 inline" />
                </>
              }
              noAnimate
            />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <span className="text-sswRed">
            <h2>{data.live.section2}</h2>
          </span>
        </Container>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.liveContentQuery({
    relativePath: "index.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export default LivePage;
