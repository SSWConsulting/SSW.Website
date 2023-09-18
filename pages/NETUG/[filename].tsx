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
import badgesList from "../../content/technologyBadges/default.json";
import { TicketForm } from "../../components/usergroup/ticketForm";

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
              <GoogleMapsWrapper
                embedHeight="150px"
                embedWidth="100%"
                embedUrl={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.2926044583883!2d151.2144539883753!3d-33.83056394807196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae97d5dce3c1%3A0xae8cb5f05af0e28d!2sSSW%20Sydney%20-%20Enterprise%20Software%20Development!5e0!3m2!1sen!2sau!4v1695000313184!5m2!1sen!2sau" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}
              />
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-semibold text-sswRed">Agenda</h2>
              <div>
                {agendaStub.map((item, index) => (
                  <div
                    className="my-4 flex flex-row rounded-sm bg-gray-50 p-2"
                    key={index}
                  >
                    <span className="border-r-1 px-4 text-lg">{item.time}</span>
                    <span className="px-4 text-lg">{item.text}</span>
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

        <section className="bg-gray-900 ">
          <Container className="py-12">
            <div className="flex flex-row justify-between">
              <div className="text-white">
                <h3>I'm Sold... What's Next?</h3>
                <span>RSVP to the event and receive NETUG updates!</span>
                <ul className="list-disc">
                  <li>Learn latest Microsoft tech</li>
                  <li>Build contacts</li>
                  <li>Socialize</li>
                  <li>Free pizza and drinks</li>
                </ul>
              </div>
              <TicketForm />
            </div>
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
