import { NextResponse } from "next/server";
import { cache } from "react";
import * as BoxIcons from "react-icons/bi";
export async function GET() {
  const data: IconData[] = getIconData();
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export type IconData = {
  displayName: string;
  url: string;
};
const getIconData = cache((): IconData[] => {
  return Object.keys(BoxIcons).map((icon) => {
    return {
      displayName: icon,
      url: `/icons/${icon}`,
    };
  });
});
