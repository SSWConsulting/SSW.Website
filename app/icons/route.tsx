import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";
import * as BoxIcons from "react-icons/bi";
export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page"));
  if (isNaN(page)) {
    return new NextResponse("Please provide a page number", { status: 400 });
  }

  const data: IconQueryResponse = getIconData(page);
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type IconData = {
  displayName: string;
  url: string;
};
export type IconQueryResponse = {
  data: IconData[];
  hasNextPage: boolean;
};

const getIconData = cache((page: number): IconQueryResponse => {
  const icons = Object.keys(BoxIcons);
  const data = Object.keys(BoxIcons)
    .slice(page * 50, (page + 1) * 50)
    .map((icon) => {
      return {
        displayName: icon,
        url: `/icons/${icon}`,
      };
    });
  const hasNextPage = icons.length > data.length;
  return {
    data,
    hasNextPage,
  };
});
