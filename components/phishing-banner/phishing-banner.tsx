import { CustomLink } from "@/components/customLink";

interface PhishingBannerProps {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkUrl?: string;
}

export const PhishingBanner = ({
  enabled,
  message,
  linkText,
  linkUrl,
}: PhishingBannerProps) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto px-4 py-2">
        <p className="text-center text-sm text-sswBlack md:text-base">
          {message}
          {linkText && linkUrl && (
            <>
              {" "}
              <CustomLink
                href={linkUrl}
                className="underline decoration-1 underline-offset-2 hover:text-gray-700"
              >
                {linkText}
              </CustomLink>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
