import dynamic from "next/dynamic";
import layoutData from "../../content/global/index.json";

const Image = dynamic(() => import("next/image"));

const clientsData = layoutData.clients.clientsList;

export const ClientLogos = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {clientsData.length &&
        clientsData.map((client) => (
          <Image
            key={client.clientName}
            src={client.imageUrl}
            alt={client.clientName + " logo"}
            height={113}
            width={200}
            // commented out to test whether this is breaking images on the homepage see #2368
            //sizes="20vw"
            className="max-w-full rounded-lg"
          />
        ))}
    </div>
  );
};
