import Image from "next/image";
import { CustomLink } from "../../customLink";

export const TechnologyLinks = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-1">
      <CustomLink
        href="https://tina.io"
        className="unstyled flex min-h-6 items-center gap-1 p-1 text-gray-300 underline-offset-2 hover:text-[#FF8A65] hover:underline"
      >
        <Image
          src="/images/logos/tina-llama-orange.png"
          alt=""
          height={16}
          width={16}
        />
        <span className="uppercase tracking-wider">Powered by TinaCMS</span>
      </CustomLink>
      <CustomLink
        href="/consulting/azure"
        className="unstyled flex min-h-6 items-center gap-1 p-1 text-gray-300 underline-offset-2 hover:text-[#66b3ff] hover:underline"
      >
        <Image src="/images/logos/azure.png" alt="" height={16} width={16} />
        <span className="uppercase tracking-wider">
          Built on Microsoft Azure
        </span>
      </CustomLink>
    </div>
  );
};
