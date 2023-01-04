import React, { FC } from "react";

import { NextSeo, NextSeoProps } from "next-seo";
import { NEXT_SEO_DEFAULT } from '../../next-seo.config';

interface SEOProps{
    seo?: Partial<NextSeoProps>;
}

export const SEO: FC<SEOProps> = ({seo}) => {
    const seoProps = {
        ...NEXT_SEO_DEFAULT,
        ...seo,
    };
    return (
        <NextSeo {...seoProps } />
    );
}