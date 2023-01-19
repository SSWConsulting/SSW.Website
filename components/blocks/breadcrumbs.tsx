import React from 'react';
import type { Template } from 'tinacms';
import Image from 'next/image';
import NextBreadcrumbs from 'nextjs-breadcrumbs';

export const Breadcrumbs = (props) => {
  return (
    <div className="mb-5">
      <NextBreadcrumbs 
        replaceCharacterList={[
            {from: "consulting", to: "Services"},
            {from: props.path, to: `${props.title} | ${props.suffix}`},
        ]}
        listClassName="pl-0"
        inactiveItemClassName="breadcrumb_item"
        activeItemClassName="breadcrumb_item"
        rootLabel={"Home"}
      />
    </div>
  );
}
