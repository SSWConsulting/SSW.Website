import { InferGetStaticPropsType } from "next";
import {
  JoinAsPresenter,
  JoinGithub,
  LatestTech,
  Organizer,
} from "../../components/blocks";
import { Layout } from "../../components/layout";
import { UserGroupHeader } from "../../components/usergroup/header";
import { Container } from "../../components/util/container";
import badgesList from "../../content/technologyBadges/default.json";

const agendaStub: { time: string; text: string }[] = [
  {
    time: "6:30 PM",
    text: "Kick off & Live Stream",
  },
  {
    time: "6:35 PM",
    text: "Monthly Tech News",
  },
  {
    time: "7:00 PM",
    text: "Presentation",
  },
  {
    time: "8:30 PM",
    text: "Q&A and Pizza",
  },
];

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props);
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
          <section className="grid-cols-3 gap-8 md:grid">
            <div className="col-span-2">
              <h2 className="text-4xl font-semibold text-sswRed">
                About the event
              </h2>
              <p className="text-lg">
                Every month SSW hosts the Sydney .NET User Group, where
                developers come together to learn about the latest technologies
                from local and internationally renowned experts. Topics focus on
                .NET and other Microsoft technologies (Azure, DevOps,
                SharePoint, Power Platform, and more), full stack development
                (Angular, React, Blazor), and mobile apps with .NET MAUI (was
                Xamarin), as well as exciting opportunities to learn about the
                latest industry trends and even tips on presenting from world
                class speakers.
              </p>
            </div>
            <div className="col-span-1">
              <JoinGithub
                data={{
                  title: "Sydney .NET User Group GitHub Discussions",
                  link: "https://google.com",
                }}
              />
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">
                When & Where
              </h2>
              <p className="text-lg">
                We meet on the 3rd Wednesday of every month from 6:30 pm AEST.
              </p>
              <p className="text-lg">
                <a href="https://sswchapel.com.au/sydney/">SSW Chapel</a>
              </p>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">Agenda</h2>
              <div>
                {agendaStub.map((item, index) => (
                  <div className="flex justify-between" key={index}>
                    <span className="text-lg">{item.time}</span>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">Organiser</h2>
              <Organizer
                data={{
                  image: "/images/people/matt-g-tall.png",
                  name: "Adam Cogan",
                  profileLink: "https://ssw.com.au/people/adam-cogan/",
                  position: "Chief Architect at SSW",
                }}
              />
            </div>

            <div className="col-span-2">
              <LatestTech data={{ badges: { badgesList } }} />
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

        <section className="bg-gray-900 text-white">
          <Container>
            <h3>I'm Sold... What's Next?</h3>
            <span>RSVP to the event and receive NETUG updates!</span>
            <ul className="list-disc">
              <li>Learn latest Microsoft tech</li>
              <li>Build contacts</li>
              <li>Socialize</li>
              <li>Free pizza and drinks</li>
            </ul>
          </Container>
        </section>

        <section>
          <h1>Hello</h1>
        </section>
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
