import type { NumberField } from "tinacms";

import React from "react";
import { wrapFieldsWithMeta } from "tinacms";
import { AiFillStar } from "react-icons/ai";
import classNames from "classnames";

export const Rating = ({ className, rating }) => {
	if (rating < 0) {
		return <></>;
	}

	return (
		<div className={classNames("flex items-center", className)}>
			{Array.from(Array(5).keys()).map((idx) => (
				<AiFillStar
					key={idx}
					className={classNames(
						rating > idx ? "text-amber-500" : "text-gray-200",
						"h-8 w-8 flex-shrink-0"
					)}
					aria-hidden="true"
				/>
			))}
		</div>
	);
};

export const ratingSchema: NumberField = {
	type: "number",
	label: "Rating",
	name: "rating",
	// As per https://tina.io/docs/extending-tina/custom-field-components/#custom-component-example
	ui: {
		parse: (val) => Number(val),

		// wrapping our component in wrapFieldsWithMeta renders our label & description.
		component: wrapFieldsWithMeta(({ input }) => {
			return (
				<div>
					<input
						name="rating"
						id="rating"
						type="range"
						min="-1"
						max="5"
						step="1"
						// This will pass along props.input.onChange to set our form values as this input changes.
						{...input}
					/>
					<br />
					Value: {input.value}
				</div>
			);
		}),
	},
};
