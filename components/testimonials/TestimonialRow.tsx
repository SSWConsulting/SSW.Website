import { useEffect, useState } from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import { Rating } from "../util/consulting/rating";

export const TestimonialRow = ({ testimonialsQueryResult }) => {
	const testimonialsData =
		testimonialsQueryResult.data.testimonialsConnection.Testimonials.map(
			(t) => t.Testimonial
		);

	const [randomTestimonials, setRandomTestimonials] = useState([]);
	useEffect(() => {
		const testimonials = testimonialsData
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);
		setRandomTestimonials(testimonials);
	}, []);

	return (
		<Container size="custom">
			<div className="mt-17 grid gap-12 md:grid-cols-3">
				{getTestimonialCards(randomTestimonials)}
			</div>
		</Container>
	);
};

const getTestimonialCards = (data) => {
	return data?.map((testimonial, i) => (
		<div
			className="flex flex-col rounded border-b-4 border-b-sswRed bg-white p-10 text-center text-xl drop-shadow sm:h-96 md:h-full"
			key={i}
			data-aos="flip-right"
		>
			<div className="mb-10">
				<div className="mb-5 flex flex-col items-center">
					<Image
						alt={`Picture of ${testimonial?.name} as an avatar`}
						src={testimonial?.avatar ?? ""}
						height={80}
						width={80}
						className="rounded-full"
					/>
					<Rating className="mt-2" rating={testimonial?.rating} />
				</div>
				<p>
					{testimonial?.name},{" "}
					<span className="font-semibold">{testimonial?.company}</span>
				</p>
			</div>
			<div className="text-md font-light text-gray-400">
				<TinaMarkdown content={testimonial?.body} />
			</div>
		</div>
	));
};
