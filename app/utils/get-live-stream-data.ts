import { getEvents } from "@/services/server/events";
import { cache } from "react";

export const getLiveStreamData = cache(async () => {
  const isoTime = new Date().toISOString();

  const odataFilter = `$filter=fields/Enabled ne false \
  and fields/EndDateTime ge '${isoTime}'\
  and fields/CalendarType eq 'User Groups'\
  &$orderby=fields/StartDateTime asc\
  &$top=1`;
  const res = await getEvents(odataFilter);

  if (!res?.length) {
    return;
  }

  return res[0];
});
