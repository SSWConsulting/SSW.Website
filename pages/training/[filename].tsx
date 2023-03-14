
import { useTina } from "tinacms/dist/react";

import { HiMail } from "react-icons/hi";
import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { SEO } from "../../components/util/seo";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Section } from "../../components/util/section";
import { ClientLogos } from "../../components/blocks";
import { Container } from "../../components/util/container";
import HorizontalList, { HorizontalListItemProps } from "../../components/util/horizontalList";
import TrainingInformation from "../../components/trainingInformation";
import VideoCards, { VideoCardProps } from "../../components/util/videoCards";
import TrainingHeader from "../../components/training/trainingHeader";

export default function TrainingPage(
    props: AsyncReturnType<typeof getStaticProps>["props"]
) {
    const { data } = useTina({
        data: props.data,
        query: props.query,
        variables: props.variables,
    });

    const horizontalListProps =
        data.training.horizontalListItems?.listItems?.map<HorizontalListItemProps>((m) => ({
            icon: m.icon,
            title: m.title,
            content: m.content,
        })) || [];

    const videoCardProps =
        data.training.videos?.videoCards?.map<VideoCardProps>((m) => ({
            title: m.title,
            link: m.link,
        })) || [];

    return (
        <>
            <SEO seo={data.training.seo} />
            <Layout>

                <TrainingHeader data={data.training.trainingHeader} />

                <Section color="white" className="pb-12">
                    <Container className={"flex-1 pt-0 text-center"}>
                        <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-24">
                            {
                                data.training.trainingInformation?.informationColumns?.map((data) =>
                                    <TrainingInformation body={data.body} header={data.header} />

                                )
                            }
                        </div>
                    </Container>
                </Section>

                <Section color="lightgray" className="pb-12">
                    <Container className={"flex flex-1 flex-col items-center pt-0 text-center"}>
                        <HorizontalList header={data.training.horizontalListItems?.header} listItemProps={horizontalListProps} />
                    </Container>
                </Section>

                <VideoCards cardProps={videoCardProps} channelLink={data.training.videos?.channelLink} defaultChannelLink={data.global.youtubeChannelLink} />

                <Section color="white" className="">
                    <Container className={"flex-1 pt-0"}>
                        <div className="mx-auto flex max-w-9xl flex-col items-center">
                            <TestimonialRow testimonialsQueryResult={props.testimonialResult} />
                        </div>
                    </Container>
                </Section>

                <Section color="lightgray">
                    <Container className={"flex-1 pt-0"}>
                        <div className="flex flex-col items-center pb-15 text-center">
                            <h1>Trusted by more than <span className="text-sswRed">1400+</span> clients in the world</h1>
                            <p className="max-w-3xl text-lg font-light text-gray-500">Our software developers & consultants have delivered the best in the business to more than 1,400 clients in 15 countries. Read more</p>
                        </div>
                        <ClientLogos />
                    </Container>
                </Section>

                <Section color="darkgray">
                    <Container className={"flex flex-1 flex-col items-center pt-15 text-center"}>
                        <p className="text-3xl font-light text-white">Subscribe to get notified about <span className="text-sswRed">SSW training programs</span></p>
                        <p className="text-base text-gray-500">Get the most popular courses from our developers</p>

                        <div className="flex flex-col items-center pt-8 pb-12 md:flex-row">
                            <input type="text" className="mr-5 w-96 bg-gray-800 px-5 py-3 text-white" placeholder="Enter your email" />
                            <button className="mt-5 flex w-36 items-center bg-sswRed px-5 py-3 text-white md:mt-0">
                                <HiMail color="white" />
                                <span className="ml-2">Subscribe</span>
                            </button>
                        </div>
                    </Container>
                </Section>
            </Layout>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const tinaProps = await client.queries.trainingContentQuery({
        relativePath: `${params.filename}.mdx`,
    });

    const testimonials = await client.queries.allTestimonialsQuery();

    return {
        props: {
            data: tinaProps.data,
            query: tinaProps.query,
            variables: tinaProps.variables,
            testimonialResult: testimonials,
            env: {
                GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
            },
        },
        revalidate: 10
    };
};

export const getStaticPaths = async () => {
    const pagesListData = await client.queries.trainingConnection();
    return {
        paths: pagesListData.data.trainingConnection.edges.map((page) => ({
            params: { filename: page.node._sys.filename },
        })),
        fallback: false,
    };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
    T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
