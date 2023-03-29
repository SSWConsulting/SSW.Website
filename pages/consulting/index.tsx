import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { MdLiveHelp } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";

import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";

const allServices = "All SSW Services";

export default function OfficeIndex(
	props: AsyncReturnType<typeof getStaticProps>["props"]
) {
	const [selectedTag, setSelectedTag] = useState(allServices);

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	const categories = data.consultingIndexConnection.edges
		.map((edge) => edge.node.categories)
		.flat(1)
		.filter((c) => c.pages && c.pages.length > 0)
		.map((c) => {
			return {
				name: c.category.name,
				pages: c.pages.map((p) => {
					return {
						url:
							p.externalUrl ||
							p.page.id.replace("content/", "").replace(".mdx", ""),
						title: p.title,
						description: p.description,
						logo: p.logo,
						tags: [allServices, ...p.tags.map((t) => t.tag.name)],
					};
				}),
			};
		});

	const tags = [
		...new Set(
			categories
				.map((c) => c.pages?.map((p) => p.tags).flat())
				.flat()
				.filter((x) => !!x)
		),
	];

	return (
		<Layout>
			{/* TODO: SEO */}
			<Container className="flex-1 pt-2">
				<Breadcrumbs path={"/consulting"} suffix="" title={"Services"} />
				<h1 className="pt-0 text-3xl">Consulting Services</h1>
				<div className="flex flex-col md:flex-row">
					<div className="shrink-0 pr-20">
						<TagNav
							tags={tags}
							selectedTag={selectedTag}
							setSelectedTag={setSelectedTag}
						/>
					</div>
					<div>
						{categories.map((category) => (
							<Category
								key={category.name}
								category={category}
								selectedTag={selectedTag}
							/>
						))}
					</div>
				</div>
			</Container>
		</Layout>
	);
}

const TagNav = ({ tags, selectedTag, setSelectedTag }) => {
	return (
		<>
			<h3 className="mb-4 text-sswRed">
				<MdLiveHelp className="mr-2 inline-block" />I am looking for...
			</h3>
			<ul className="list-none">
				{tags.map((tag) => {
					const isSelected = tag === selectedTag;
					const [hovered, setHovered] = useState(false);
					return (
						<li
							key={tag}
							className={classNames(
								"cursor-pointer p-1 ease-in-out",
								"duration-500 hover:bg-gray-100 hover:ease-in-out",
								isSelected ? "text-sswRed" : ""
							)}
							onClick={() => setSelectedTag(tag)}
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
						>
							<div
								className={classNames(
									"inline-block h-3.5 w-6 text-sswRed",
									!hovered && !isSelected && "-translate-x-2",
									hovered && "translate-x-0 duration-300 ease-in"
								)}
							>
								{(isSelected || hovered) && <BsArrowRightCircle />}
							</div>
							<span className="truncate">{tag}</span>
						</li>
					);
				})}
			</ul>
		</>
	);
};

const Category = ({ category, selectedTag }) => {
	const pages = category.pages.map((page) => {
		return {
			...page,
			isVisible: page.tags.includes(selectedTag),
		};
	});
	const categoryVisible = pages.some((p) => p.isVisible);

	return (
		<>
			<Transition
				show={categoryVisible}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<hr className="my-5 border-gray-100" />
				<h2 className="mt-0 text-sswRed">{category.name}</h2>
			</Transition>
			<div className="flex flex-row flex-wrap">
				{pages.map((page) => (
					<Transition
						key={page.title}
						className="relative flex w-full origin-center bg-white p-3 hover:bg-gray-50 md:w-1/2"
						appear={true}
						show={page.isVisible}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="opacity-0 scale-0 w-0"
						enterTo="opacity-100 scale-100"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-0 w-0"
					>
						<div className="shrink-0">
							{page.logo && (
								<Image
									className="mr-4 aspect-square h-14 w-14 border-1 border-gray-100 md:h-28 md:w-28"
									height={115}
									width={115}
									src={page.logo}
									alt={`${page.title} logo`}
								/>
							)}
						</div>
						<div className="min-w-0 flex-1">
							<Link href={page.url} className="unstyled">
								<span className="absolute inset-0" aria-hidden="true" />
								<h3 className="mt-0 mb-2 text-lg text-sswRed">{page.title}</h3>
								<p className="text-sm text-black">{page.description}</p>
							</Link>
						</div>
					</Transition>
				))}
			</div>
		</>
	);
};

export const getStaticProps = async () => {
	const tinaProps = await client.queries.consultingIndexConnection();

	return {
		props: {
			...tinaProps,
		},
	};
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
	T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
