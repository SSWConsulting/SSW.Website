import { InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // const { data } = useTina({
  //   data: props.data,
  //   query: props.query,
  //   variables: props.variables,
  // });

  useEffect(() => {
    fetch(`/api/get-upcoming-events?top=${5}`)
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <>
      {/* <SEO seo={data.events.seo} /> */}
      <Layout>
        <Section color="white">
          <Container>
            <h1>Test</h1>
          </Container>
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
