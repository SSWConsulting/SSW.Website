import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
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
						url: p.externalUrl || p.page.id.replace("content/", "").replace(".mdx", ""),
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
				<h1 className="pt-0">Consulting Services</h1>
				<div className="flex">
					<div className="shrink-0 pr-6">
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
					return (
						<li
							key={tag}
							className={classNames(
								"cursor-pointer ease-in-out",
								isSelected ? "text-sswRed" : ""
							)}
							onClick={() => setSelectedTag(tag)}
						>
							<div className="inline-block h-3.5 w-6">
								{isSelected && <BsArrowRightCircle />}
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
	return (
		<>
			<h2 className="mt-0">{category.name}</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{category.pages
					.filter((page) => page.tags.includes(selectedTag))
					.map((page) => (
						<div
							key={page.title}
							className="relative flex items-center bg-white px-5 py-4 hover:bg-gray-50"
						>
							<div className="shrink-0">
								{page.logo && (
									<Image
										className="pr-4"
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
									<h3 className="mt-0 text-sswRed">{page.title}</h3>
									<p className="text-sm text-black">{page.description}</p>
								</Link>
							</div>
						</div>
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
