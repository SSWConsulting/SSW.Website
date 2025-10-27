interface PhishingBannerProps {
  enabled: boolean;
  message: string;
}

export const PhishingBanner = ({ enabled, message }: PhishingBannerProps) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto px-4 py-2">
        <p className="text-center text-xs text-sswBlack md:text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};
