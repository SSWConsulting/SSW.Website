"use client";

import { useQuery } from "@tanstack/react-query";
import Consulting, { OldConsultingPage } from "./consulting";

const ConsultingPageFallback = ({
  tinaProps,
  props,
}: {
  tinaProps: OldConsultingPage;
  props: object;
}) => {
  const { data, error } = useQuery({
    queryKey: ["consulting-page-fallback"],
    queryFn: () =>
      fetch("/api/consulting-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: tinaProps.data,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      }),
  });

  if (data) {
    return <Consulting tinaProps={tinaProps} props={{ ...props, ...data }} />;
  }
};

export default ConsultingPageFallback;
