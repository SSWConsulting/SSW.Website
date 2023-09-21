import { InferGetStaticPropsType } from "next";
import {
  GoogleMapsWrapper,
  JoinAsPresenter,
  JoinGithub,
  LatestTech,
  Organizer,
} from "../../components/blocks";
import { Layout } from "../../components/layout";
import { UserGroupHeader } from "../../components/usergroup/header";
import { Container } from "../../components/util/container";
import badges from "../../content/technologyBadges/default.json";
import { TicketForm } from "../../components/usergroup/ticketForm";
import {
  LuGraduationCap,
  LuMessagesSquare,
  LuPizza,
  LuSmile,
} from "react-icons/lu";
import { SponsorCard } from "../../components/usergroup/sponsorCard";
import VideoCards, { VideoCard } from "../../components/util/videoCards";
import { FacebookPageEmbed } from "../../components/embeds/facebookPageEmbed";
import { TwitterFeedEmbed } from "../../components/embeds/twitterFeedEmbed";
import { SocialButton } from "../../components/usergroup/socialButton";
import client from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// const agendaStub: { time: string; label: string }[] = [
//   {
//     time: "6:30 PM",
//     label: "Kick off & Live Stream",
//   },
//   {
//     time: "6:35 PM",
//     label: "Monthly Tech News",
//   },
//   {
//     time: "7:00 PM",
//     label: "Presentation",
//   },
//   {
//     time: "8:30 PM",
//     label: "Q&A and Pizza",
//   },
// ];

const videoCardStub = [
  {
    link: "https://www.youtube.com/watch?v=QYTa5aHdhh0",
    title: "Launch your development career into space",
  },
];

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <Layout>
        <UserGroupHeader
          className="font-helvetica"
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

        <Container className="font-helvetica">
          <section className="grid-cols-3 gap-10 md:grid">
            <div className="col-span-2">
              <h2 className="text-4xl font-semibold text-sswRed">
                About the event
              </h2>
              <div className="text-lg">
                <TinaMarkdown content={data.userGroupPage.aboutContent} />
              </div>
            </div>
            <div className="col-span-1">
              <JoinGithub data={data.userGroupPage.joinGithub} />
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">
                When & Where
              </h2>
              <div className="text-lg">
                <TinaMarkdown
                  content={data.userGroupPage.whenAndWhere?.content}
                />
              </div>
              {data.userGroupPage.whenAndWhere?.googleMapsEmbedUrl && (
                <GoogleMapsWrapper
                  embedHeight="150px"
                  embedWidth="100%"
                  embedUrl={data.userGroupPage.whenAndWhere.googleMapsEmbedUrl}
                />
              )}
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">Agenda</h2>
              <div>
                {data.userGroupPage.agenda.map((item, index) => (
                  <div
                    className="my-4 flex flex-row rounded-sm bg-gray-50 p-2"
                    key={index}
                  >
                    <span className="border-r-1 px-4 text-lg">{item.time}</span>
                    <span className="px-4 text-lg">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">Organiser</h2>
              <Organizer
                data={{
                  profileImg: "/images/people/Adam-Cogan.jpg",
                  name: "Adam Cogan",
                  profileLink: "https://ssw.com.au/people/adam-cogan/",
                  position: "Chief Architect at SSW",
                }}
              />
            </div>

            <div className="col-span-2">
              <LatestTech data={{ badges }} />
            </div>

            <div className="col-span-1">
              <JoinAsPresenter
                data={{
                  img: "/images/people/ulysses.png",
                  link: "https://google.com",
                }}
              />
            </div>
          </section>
        </Container>

        <section className="bg-gray-900 ">
          <Container className="py-12">
            <div className="flex-row justify-between md:flex">
              <div className="text-white">
                <div className="pb-8">
                  <h3 className="text-4xl font-medium">
                    I'm Sold... What's Next?
                  </h3>
                  <span className="text-base font-normal text-gray-50">
                    RSVP to the event and receive NETUG updates!
                  </span>
                </div>
                <ul>
                  <li className="py-3 font-semibold">
                    <LuGraduationCap size={40} className="mr-5 inline" />
                    Learn latest Microsoft tech
                  </li>
                  <li className="py-3 font-semibold">
                    <LuMessagesSquare size={40} className="mr-5 inline" />
                    Build contacts
                  </li>
                  <li className="py-3 font-semibold">
                    <LuSmile size={40} className="mr-5 inline" />
                    Socialize
                  </li>
                  <li className="py-3 font-semibold">
                    <LuPizza size={40} className="mr-5 inline" />
                    Free pizza and drinks
                  </li>
                </ul>
                <SponsorCard className="my-4" />
              </div>
              <TicketForm />
            </div>
          </Container>
        </section>

        <section className="!font-helvetica">
          <VideoCards
            cardProps={videoCardStub}
            channelLink="https://www.youtube.com/@SSWTV"
            defaultChannelLink="https://www.youtube.com/@SSWTV"
            theme="light"
          />
          <Container>
            <div>
              <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
                {videoCardStub.map((video, index) => (
                  <VideoCard {...video} key={index} theme="light" />
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col items-center">
              <h2 className="mb-12 font-helvetica text-4xl font-semibold text-sswRed">
                Community
              </h2>
              <div className="w-full grid-cols-3 gap-6 md:grid">
                <div className="col-span-1 h-96">
                  <TwitterFeedEmbed height={384} username="SSW_TV" />
                </div>
                <div className="col-span-1">
                  <FacebookPageEmbed username="SSW.page" height={384} />
                </div>
                <div className="col-span-1">
                  <SocialButton
                    url="https://google.com"
                    platform="github"
                    label="Join GitHub Discussion"
                    className="mb-4"
                  />
                  <SocialButton
                    url="https://google.com"
                    platform="facebook"
                    label="Join Facebook Group"
                    className="mb-4"
                  />
                  <SocialButton
                    url="https://google.com"
                    platform="linkedin"
                    label="Join LinkedIn Group"
                    className="mb-4"
                  />
                  <SocialButton
                    url="https://google.com"
                    platform="meetup"
                    label="Join Meetup Group"
                    className="mb-4"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.userGroupPageContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonials = await client.queries.testimonalsQuery({
    categories: "User-Group",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      filename: params.filename,
      testimonials,
    },
  };
};

export const getStaticPaths = async () => {
  const userGroupPages = await client.queries.userGroupPageConnection();

  const paths = userGroupPages.data.userGroupPageConnection.edges.map(
    (page) => ({
      params: { filename: page.node._sys.filename },
    })
  );

  return {
    paths,
    fallback: true,
  };
};
