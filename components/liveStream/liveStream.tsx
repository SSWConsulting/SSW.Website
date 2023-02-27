import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { FC, useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMeetup,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip/dist/react-tooltip.umd"; // Workaround for render issue. See https://github.com/ReactTooltip/react-tooltip/issues/933
import layoutData from "../../content/global/index.json";
import { LiveStreamWidgetInfo, SpeakerInfo } from "../../services";
import ReactPlayer from "../reactPlayer/reactPlayer";
import styles from "./liveStream.module.css";
import { LiveStreamProps } from "./useLiveStreamProps";

export const LiveStream: FC<LiveStreamProps> = ({ isLive, event }) => {
  const eventDescriptionCollapseId = "eventDescription";
  const socialMediaTypes: {
    [key: string]: { icon: IconType; bgClass: string };
  } = {
    meetup: { icon: FaMeetup, bgClass: "bg-social-meetup" },
    facebook: { icon: FaFacebookF, bgClass: "bg-social-facebook" },
    linkedin: { icon: FaLinkedinIn, bgClass: "bg-social-linkedin" },
    twitter: { icon: FaTwitter, bgClass: "bg-social-twitter" },
    youtube: { icon: FaYoutube, bgClass: "bg-social-youtube" },
    instagram: {
      icon: FaInstagram,
      bgClass: "bg-gradient-tr-social-instagram",
    },
    github: { icon: FaGithub, bgClass: "bg-social-github" },
  };

  const [widgetInfo, setWidgetInfo] = useState<LiveStreamWidgetInfo>();
  const [speakersInfo, setSpeakersInfo] = useState<SpeakerInfo[]>([]);
  const [youtubeUrls, setYoutubeUrls] = useState<{
    videoUrl?: string;
    chatUrl?: string;
    liveStreamUrl?: string;
  }>({});
  const [collapseMap, setCollapseMap] = useState<{ [key: string]: boolean }>({
    [eventDescriptionCollapseId]: true,
  });
  const [eventDescriptionCollapsable, setEventDescriptionCollapsable] =
    useState<boolean>();

  const router = useRouter();

  const videoPlayer = () => (
    <ReactPlayer
      url={youtubeUrls.videoUrl}
      width="100%"
      height="100%"
      controls={true}
    />
  );

  const socialMediaIcon = (key: string) => {
    const link = layoutData.socials.find((s) => s.type === key)?.url;
    const bgClass = socialMediaTypes[key].bgClass;
    const MediaType = socialMediaTypes[key].icon;

    return (
      <a
        className={classNames(styles["social-media-icon"], bgClass)}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MediaType className="text-3xl" color="white" />
      </a>
    );
  };

  const collapsableWidgetRefCallback = (e: HTMLDivElement) => {
    !!e &&
      !!e.clientHeight &&
      (e.style.maxHeight = `${document.body.offsetHeight}px`);
  };

  const collapsableEventDescriptionRefCallback = (e: HTMLDivElement) => {
    if (e) {
      const collapsable = e.scrollHeight > e.clientHeight;

      if (eventDescriptionCollapsable == undefined) {
        setEventDescriptionCollapsable(collapsable);
      }
    }
  };

  useEffect(() => {
    const fetchLiveStreamInfo = async () => {
      if (!isLive && !router.query.liveStream) {
        return;
      }

      const widgetInfoRes = await axios.get<LiveStreamWidgetInfo>(
        "/api/get-livestream-widget",
        {
          params: { eventId: event.Id },
        }
      );

      if (widgetInfoRes.status === 200 && widgetInfoRes.data) {
        setWidgetInfo(widgetInfoRes.data);

        setYoutubeUrls({
          videoUrl: `https://www.youtube.com/embed/${widgetInfoRes.data.YouTubeId}?rel=0&autoplay=1`,
          chatUrl: `https://www.youtube.com/live_chat?v=${widgetInfoRes.data.YouTubeId}&embed_domain=${window.location.hostname}`,
          liveStreamUrl: `https://www.youtube.com/watch?v=${widgetInfoRes.data.YouTubeId}`,
        });

        const ids: string[] = [];
        const emails: string[] = [];

        if (widgetInfoRes.data.ExternalPresentersId?.results?.length) {
          ids.push(...widgetInfoRes.data.ExternalPresentersId.results);
        }

        if (widgetInfoRes.data.InternalPresenters?.results?.length) {
          emails.push(
            ...widgetInfoRes.data.InternalPresenters.results.map((i) => i.EMail)
          );
        }

        const speakersInfo: SpeakerInfo[] = [];

        if (ids.length || emails.length) {
          const idsParam = ids
            .map(id => `ids=${id}`)
            .join("&");
          const emailsParam = emails
            .map(email => `emails=${email}`)
            .join("&");

          const remoteSpeakersInfoRes = await axios.get<SpeakerInfo[]>(
            `/api/get-speakers?${idsParam}&${emailsParam}`
          );

          if (
            remoteSpeakersInfoRes.status === 200 &&
            remoteSpeakersInfoRes.data.length
          ) {
            speakersInfo.push(...remoteSpeakersInfoRes.data);
          }
        } else {
          speakersInfo.push({
            Title: widgetInfoRes.data.Presenter,
            PresenterProfileLink: widgetInfoRes.data.PresenterProfileUrl.Url,
          });
        }
        setSpeakersInfo(speakersInfo);
      }
    };

    fetchLiveStreamInfo();
  }, [isLive, event]);

  if (!widgetInfo) {
    return <></>;
  }

  return (
    <>
      <Script src="https://apis.google.com/js/platform.js" />
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Image
            src="/images/logos/SSW_NUG_Live.png"
            width="239"
            height="95"
            alt="NETUG LIVE"
            className="object-contain"
          />
        </div>
        <div className="col-span-3 flex items-center justify-end">
          <span className="pr-2">Subscribe to SSW TV</span>
          <div
            className="g-ytsubscribe"
            data-channelid={widgetInfo.ChannelId}
            data-layout="default"
            data-count="default"
          ></div>
        </div>
      </div>

      <a
        className="cursor-pointer"
        onClick={() =>
          setCollapseMap({
            collapsableWidget: !collapseMap["collapsableWidget"],
          })
        }
      >
        <hr
          className={classNames(styles["hr-arrow"], "my-6", {
            [styles["hr-arrow-collapse"]]: collapseMap["collapsableWidget"],
            [styles["hr-arrow-expand"]]: !collapseMap["collapsableWidget"],
          })}
        />
      </a>

      <div
        id="collapsableWidget"
        ref={collapsableWidgetRefCallback}
        className={classNames(
          {
            "!max-h-0": collapseMap["collapsableWidget"],
          },
          "transition-all"
        )}
      >
        <div className="mb-4 grid grid-cols-3 gap-8">
          <div id="thumbnailAnchor" className="col-span-3 md:col-span-2">
            <div className={styles["video-player-wrapper"]}>
              <div className="absolute top-0 h-full w-full">
                {videoPlayer()}
              </div>
            </div>
          </div>
          {/* custom fixed width and height to have best looking and fixed size for different screens */}
          <div
            className={styles["video-thumbnail-wrapper"]}
            data-aos="slide-left"
            data-aos-duration={500}
            data-aos-anchor="#thumbnailAnchor"
            data-aos-anchor-placement="bottom-top"
          >
            {videoPlayer()}
          </div>
          <div className={styles["live-chat-wrapper"]}>
            <iframe width="100%" height="100%" src={youtubeUrls.chatUrl} />
          </div>
          <div className="col-span-3 block sm:hidden">
            <a
              href={youtubeUrls.liveStreamUrl}
              className="flex h-12 items-center justify-center bg-sswRed text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on Youtube
            </a>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <div className="text-center md:text-start">
            <p>Download the SSW Rewards app</p>
            <a
              className="mr-2 inline-block"
              href={layoutData.apps.sswRewards.link.appStore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                id="appStoreBadge"
                src="/images/badges/App_Store_Badge_US.svg"
                alt="Download on the App Store"
                width="120"
                height="40"
              />
              <Tooltip
                anchorSelect="#appStoreBadge"
                place="bottom"
                className="z-99 p-1"
              >
                <Image
                  src="/images/badges/QRcode_App_Store.svg"
                  width="100"
                  height="100"
                  alt="SSW Reward App QR Code"
                />
              </Tooltip>
            </a>
            <a
              className="inline-block"
              href={layoutData.apps.sswRewards.link.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                id="googlePlayBadge"
                src="/images/badges/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width="135"
                height="40"
              />
              <Tooltip
                anchorSelect="#googlePlayBadge"
                place="bottom"
                className="z-99 p-1"
              >
                <Image
                  src="/images/badges/QRcode_Google_Play.svg"
                  width="100"
                  height="100"
                  alt="SSW Reward App QR Code"
                />
              </Tooltip>
            </a>
          </div>
          <div className="text-center md:text-start">
            <p>How did we do?</p>
            <div className="flex">
              {/* TODO: Update link after the page is implemented */}
              <a
                href="https://www.ssw.com.au/ssw/NETUG/EvaluationSurvey.aspx"
                target="_blank"
                className="mr-2 flex h-11 w-full items-center justify-center rounded-md bg-sswRed text-white !no-underline hover:!text-gray-125 md:w-72"
              >
                Take the Survey
              </a>
              <div className="pt-3">
                <Image
                  src="/images/icons/external.gif"
                  alt="You are now leaving SSW"
                  width="15"
                  height="11"
                  data-tooltip-id="external"
                  data-tooltip-content="You are now leaving SSW"
                  data-tooltip-place="bottom"
                />
                <Tooltip id="external" className="z-99" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <div className="bg-gray-75 py-2 px-4">
            <div>
              <h3 className="mb-3 text-xl font-bold">About the Talk</h3>
              <div
                id={eventDescriptionCollapseId}
                ref={collapsableEventDescriptionRefCallback}
                className={classNames(
                  styles["event-description-wrapper"],
                  { "max-h-70": collapseMap[eventDescriptionCollapseId] },
                  { "max-h-screen": !collapseMap[eventDescriptionCollapseId] },
                  {
                    "overflow-hidden": collapseMap[eventDescriptionCollapseId],
                  }
                )}
                dangerouslySetInnerHTML={{
                  __html: widgetInfo.EventDescription,
                }}
              ></div>
              {eventDescriptionCollapsable && (
                <div
                  className={classNames({
                    [styles["collapse-cover"]]:
                      collapseMap[eventDescriptionCollapseId],
                  })}
                >
                  <a
                    className="float-right mt-4 cursor-pointer border-b-1 border-dotted border-gray-450 !no-underline"
                    onClick={() =>
                      setCollapseMap({
                        [eventDescriptionCollapseId]:
                          !collapseMap[eventDescriptionCollapseId],
                      })
                    }
                  >
                    {collapseMap[eventDescriptionCollapseId]
                      ? "More >"
                      : "< Less"}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-17">
              <h4 className="font-bold">Follow us on:</h4>
              <div className="flex gap-x-4">
                {socialMediaIcon("meetup")}
                {socialMediaIcon("facebook")}
                {socialMediaIcon("linkedin")}
                {socialMediaIcon("twitter")}
                {socialMediaIcon("youtube")}
                {socialMediaIcon("instagram")}
                {socialMediaIcon("github")}
              </div>
            </div>

            <div className="mt-17">
              <h3 className="mb-3 font-bold">
                Get notified about news & future events
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <input
                  className="col-span-3 appearance-none rounded border-1 border-gray-300 py-2 px-3 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
                {/* TODO: Implement subscribe function */}
                <a
                  href="#"
                  className="col-span-3 flex h-11 items-center justify-center rounded-md bg-sswRed align-middle leading-4 text-white !no-underline hover:!text-gray-125 md:col-span-1"
                >
                  <FaEnvelope className="mr-2" />
                  Subscribe
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-75 py-2 px-4">
            <h3 className="mb-3 text-xl font-bold">About the Speaker</h3>
            {!!speakersInfo.length &&
              speakersInfo.map((speakerInfo, index) => (
                <div key={index} className="mb-8 grid grid-cols-6 gap-x-8">
                  <div className="col-span-1">
                    {!!speakerInfo.PresenterProfileImage && (
                      <Image
                        src={speakerInfo.PresenterProfileImage?.Url}
                        alt={speakerInfo.Title}
                        width={200}
                        height={200}
                      />
                    )}
                  </div>
                  <div className="col-span-5">
                    <p className="mb-3 font-bold">{speakerInfo.Title}</p>
                    <p
                      className={styles["speaker-description-wrapper"]}
                      dangerouslySetInnerHTML={{
                        __html: speakerInfo.PresenterShortDescription,
                      }}
                    />
                    {!!speakerInfo.PresenterProfileLink && (
                      <a
                        className="float-right border-b-1 border-dotted border-gray-450 !no-underline"
                        href={speakerInfo.PresenterProfileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {speakerInfo.Title}'s profile&gt;
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
