import Image from "next/image";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { ImArrowUpRight2 } from "react-icons/im";

const TrainingHeader = ({ data }) => {
    return (
        <Section
            className="border-b-8 border-sswRed bg-white bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${data?.heroBackground})` }}
        >
            <Container className={"flex-1 pt-0"}>
                <div className="px-6 pb-24 sm:pb-32 lg:flex lg:px-8">
                    <div className="mx-auto max-w-2xl pt-8 lg:mx-0 lg:max-w-3xl">
                        <Image
                            src="/images/internshipLogo.png"
                            alt="SSW Internship Program logo"
                            width={250}
                            height={30}
                        />
                        <div className="mt-10 max-w-2xl text-4xl font-black text-white sm:text-6xl">
                            <h1 dangerouslySetInnerHTML={{ __html: data?.tagline }}></h1>
                        </div>
                        <p className="max-w-lg text-sm leading-8 text-gray-300">
                            {data?.secondaryTagline}
                        </p>
                        <div className="mt-10">
                            <button
                                className="flex items-center gap-2 bg-sswRed px-5 py-2.5 text-sm font-normal text-white shadow-sm"
                            >
                                Apply Now
                                <ImArrowUpRight2 />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
            <Image
                className="absolute bottom-0 right-0 hidden lg:block"
                src={data?.person}
                alt="person"
                width={900}
                height={30}
            />
        </Section>
    );
}

export const trainingHeaderSchema = {
    type: "object",
    label: "Training Header",
    name: "trainingHeader",
    fields: [
        {
            type: "string",
            label: "Tagline",
            name: "tagline",
            required: true,
        },
        {
            type: "string",
            label: "Secondary Tagline",
            name: "secondaryTagline",
            required: true,
        },
        {
            type: "image",
            label: "Hero Background",
            name: "heroBackground",
            required: true,
        },
        {
            type: "image",
            label: "Person",
            name: "person",
            required: true,
        },
    ],
};

export default TrainingHeader;
