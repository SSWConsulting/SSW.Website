import React from "react";
import classNames from "classnames";
import { sectionColors } from "./constants/styles";

export const Section = ({
	children,
	color = "",
	className = "",
	style = {},
}) => {
	const sectionColorCss = sectionColors[color] || sectionColors.default;

	return (
		<section
			className={classNames(
				"body-font relative flex flex-1 overflow-hidden transition duration-150 ease-out",
				sectionColorCss,
				className
			)}
			style={style}
		>
			{children}
		</section>
	);
};
