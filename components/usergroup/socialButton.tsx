import { SiFacebook, SiLinkedin, SiMeetup, SiGithub } from "react-icons/si";
import classNames from "classnames";

const platforms = {
  facebook: {
    icon: <SiFacebook className="text-white" size={40} />,
    color: "#4479DE",
  },
  github: {
    icon: <SiGithub className="text-white" size={40} />,
    color: "#212121",
  },
  linkedin: {
    icon: <SiLinkedin className="text-white" size={40} />,
    color: "#326C9C",
  },
  meetup: {
    icon: <SiMeetup className="text-white" size={40} />,
    color: "#E35063",
  },
} as const;

type Platform = keyof typeof platforms;

type SocialButtonProps = {
  className?: string;
  url: string;
  platform: Platform;
  label?: string;
};

export const SocialButton = ({
  className,
  url,
  platform,
  label,
}: SocialButtonProps) => {
  return (
    <a
      href={url}
      className={classNames("flex items-center !no-underline", className)}
    >
      <div
        style={{ backgroundColor: platforms[platform].color }}
        className="inline-flex w-full items-center rounded-lg"
      >
        <span className="m-4">{platforms[platform].icon}</span>
        <span className="font-helvetica font-bold text-white">{label}</span>
      </div>
    </a>
  );
};
