import React from "react";

import { NextSeo, NextSeoProps } from "next-seo";
import { NEXT_SEO_DEFAULT } from '../../next-seo.config';

export const SEO = (seo?: Partial<NextSeoProps>) => {
    const seoProps = {
        ...NEXT_SEO_DEFAULT,
        ...seo,
    };
    return (
        <NextSeo {...seoProps } />
    );
}